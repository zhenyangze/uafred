制作插件
----
* 你可以用任何你顺手或者想练手的程序写代码，只要保证配置文件正确及最终返回值为符合格式的json串即可
* 记得参考已写好的demo
* 百无禁忌

**以Demo为例**

1. 在`app/script/` 新建目录，目录名称为：`Demo`
2. 在`Demo`目录中新建文件`config.json`,文件内容如下：
  ```javascript
{
    "demo":{                        //搜索关键词
        "name":"demo",              //展示名称
        "icon":"./demo.png",        //图标，路径相对于当前Demo目录
        "comment":"demo comments" , //介绍 
        "path":"./demo.sh"          //可执行文件路径，相对于当前Demo目录
    }
}
```

3. 编写对应的`demo.sh`，保证文件执行的最终结果返回的格式如下即可。
  ```javascript
{
  "Name": "",       //名称
  "Comment": "",    //介绍
  "Exec": "",       //执行命令
  "Icon": ""        //图标路径，相对于`项目`目录.例如github的脚本路径为`app/script/github/github.sh`, 则图标路径为`../../script/github/github-icon.png`
}
````
可以返回一条或多条数据。
