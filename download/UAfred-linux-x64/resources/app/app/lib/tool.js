"use strict";
const path = require('path');
const fs = require('fs');

class ToolLib {

    //config
    reloadConfig(filePath, configInfo){
        let dirList = fs.readdirSync(filePath);
        var _this = this;
        dirList.forEach(function(item){
            let realPath = path.join(filePath, item);
            if(item == configInfo.config && fs.statSync(realPath).isFile()){
                let pluginConfig = require(path.join(filePath ,item));
                //modify path
                for (var i in pluginConfig){
                    pluginConfig[i].path = path.join(filePath, pluginConfig[i].path);
                    let relativePath = path.relative(configInfo.baseDir, filePath);
                    pluginConfig[i].icon = path.join("./", relativePath, pluginConfig[i].icon);
                }
                _this.extend(configInfo.category, pluginConfig);
                //configInfo.category.push(pluginConfig);
            }

            if(fs.statSync(realPath).isDirectory()){
                _this.reloadConfig(realPath, configInfo);
            }

        });
    }

    extend(o,n,override){
        for(let p in n)if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))o[p]=n[p];
    };

}

module.exports = ToolLib;
