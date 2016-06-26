#!/bin/bash
# File Name: cd.sh
# Author: zhenyangze
# mail: zhenyangze@gmail.com
# Created Time: 2016年05月18日 星期三 17时03分24秒

if [[ ! -z $1 ]];then
    searchPath=$(echo $1 | sed  's/\~/'${HOME//\//\\\/}'/g')
else
    searchPath='/'
fi

if [[ ! -d $searchPath ]];then
    dir=${searchPath%/*}
    searchKey=${searchPath##*/}
else
    dir=$searchPath
    searchKey=''
fi

function showResult(){
    realPath=$dir/$1
    realPath=${realPath//\/\//\/}
    echo '{"Name":"'$realPath'","Icon":"../../script/cd/cd.png","Exec":"xdg-open '''$realPath'''","Comment":"","Tab":"cd '$realPath'"}'
}

if [[ ! -z $searchKey ]];then
    for i in $(ls $dir | grep -i $searchKey);do
        showResult $i
    done
else
    for i in $(ls $dir);do
        showResult $i
    done
fi
