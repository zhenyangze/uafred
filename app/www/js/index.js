md5List = [];
commandList = [];

function sendIpcMsg(channel, args){
    try {
        const ipcRenderer = require('electron').ipcRenderer;
        ipcRenderer.send(channel, args);
    } catch(e){
        console.log(channel, args);
    }
}
function getIpcMsg(channel, callback){
    try {
        const ipcRenderer = require('electron').ipcRenderer; 
        ipcRenderer.on(channel, callback);
    } catch(e){

    } 
}

function changeSize(){
    var width = document.body.offsetWidth;
    var height = document.body.offsetHeight;
    sendIpcMsg('window-resize', {
        'height': height,
        'width': width
    });     
}

function search($keyWordArr){
    $searchArr = {};
    md5List = [];
    commandList = [];
    $searchArr = {
        'category': $keyWordArr.shift(),
        'args': $keyWordArr,
        'startTime': (new Date().getTime() +  Math.random())
    };              
    getIpcMsg('result', function(event, arg){
        //存在多个json组合的情况
        let jsonArr = arg.toString().split("\n");
        console.log(jsonArr);
        let dataObj = {};
        for(let i = 0; i<jsonArr.length; i++){
            try {
                dataObj = $.parseJSON(jsonArr[i]); 
                showResult(jsonArr[i], dataObj);
            } catch(e){
                //提示错误
            }           
        }
    });
    getIpcMsg('result-over', function(event, arg){
        $('.list-group-item').show();
        changeSize();
    });
    $('.list-group').html('');
    changeSize();
    sendIpcMsg('search', $searchArr);
}
//Html编码获取Html转义实体
function htmlEncode(value){
    return $('<div/>').text(value).html();
}
//Html解码获取Html实体
function htmlDecode(value){
    return $('<div/>').html(value).text();
}
function showResult(jsonStr, dataObj){
    var md5Str = $.md5(jsonStr);
    if (md5List.indexOf(md5Str) >=0 ){
        return;
    } else {
        md5List.push(md5Str);
    }
    var index = md5List.indexOf(md5Str);
    var style = '';
    if (dataObj.Icon.length == 0){
        style = 'display:none;'
    }

    var name = dataObj.Name || '';
    name = htmlEncode(name);
    var exec = dataObj.Exec || '';
    commandList.push(exec);
    exec = htmlEncode(exec);
    var comment = dataObj.Comment || '';
    var pageType = dataObj.PageType || '';
    var html = '';
    if (pageType == 'single'){
        $('.list-group').html(comment);
        $('.list-group-item').show();
    } else {
        comment = htmlEncode(comment);
        Html = '<a href="javascript:;" style="display:none;" onclick="clickEvent(' + (index + 1) + ')" class="list-group-item p1-15" attr-index="' + (index+1) + '" attr-commend="'+ exec + '">'
            + '<div class="media">'
            + '<span style="float:right;margin-top:12px;">Alt + ' + (index + 1) + '</span>'
            + '<div class="media-left media-middle" style="' + style + '">'
            + '<img class="media-object" src="' + (dataObj.Icon || '') + '" width="48" height="48" alt="">'
            + '</div>'
            + '<div class="media-body">'
            + '<h4 class="media-heading">' + name + '</h4>'
            + '<p>' + comment + '</p>'
            + '</div>'
            + '</div>'
            + '</a>';
        $(Html).appendTo($('.list-group'));
        if ((index+1) % 4 == 0 && index > 0){
            $('.list-group-item').show();
            changeSize();
        }
    }

}

triggerSearch = function() {
    var keyWordStr = $("#searchName").val();
    var keyArr = keyWordStr.split(' ');
    keyArr = $.grep(keyArr, function(n, i){return n != ''});
    if (keyArr.length == 0){
        return;
    }
    search(keyArr);
}

$("#searchName").bind('input propertychange', function() {
    triggerSearch();
});

function runCommend(index){
    var commend = $('[attr-index=' + index + ']').attr('attr-commend') || '';
    commend = commandList[index-1] || '';
    commend.trim();
    if (commend.length > 1){
        if (commend.indexOf('Exec-tab') == 0) {
            var newCommend = $.trim(commend.replace('Exec-tab', ''));
            //自动填充
            $('.list-group').html('');
            changeSize();
            $("#searchName").val(newCommend);
            triggerSearch();
        } else {
            $('.list-group').html('');
            $("#searchName").val('');
            sendIpcMsg('exec', commend);
        }
    }
}
$("body").keyup(function(e){
    //关闭页面
    if (e.keyCode == 27){
        //首先清空，再退出
        if ($("#searchName").val().length == 0) {
            $('.list-group').html('');
            sendIpcMsg('window-close','')
        } else {
            $('.list-group').html('');
            $("#searchName").val('');
            changeSize();
        }
    } else if(e.keyCode == 13){
        //回车
        runCommend(1);
    } else if(e.altKey && e.keyCode >= 49){
        //alt
        var num = e.keyCode - 48;
        runCommend(num);
    }
});
$("input:text:visible:first").focus();

function clickEvent(index){
    if (index > 0){
        runCommend(index);
    }
}
