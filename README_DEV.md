制作插件
----
* 你可以用任何你顺手或者想练手的程序写代码，只要保证配置文件正确及最终返回值为符合格式的json串即可
* 记得参考已写好的demo
* 百无禁忌

**快速入手，以Demo为例**

1. 在`app/script/` 新建目录，目录名称为：`Demo`
2. 在`Demo`目录中新建文件`config.json`,文件内容如下：
  ```javascript
{
    "demo":{                        //搜索关键词
        "name":"demo",              //展示名称
        "icon":"./demo.png",        //图标，路径相对于当前Demo目录
        "comment":"demo comments" , //介绍 
        "path":"./demo.sh"          //可执行文件路径，相对于当前Demo目录，和第三步的文件名称对应
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

**注意事项**
1. 在php文件中，如果返回多个json语句，请使用`\n`分割，如
  ```php
    echo json_encode(array) . "\n";
    echo json_encode(array) . "\n";
  ```
  否则读取结果有问题．

**扩展功能.自动填充**
在搜索框中输入内空后，下面下拉有备选项，如果希望备选内容可以自动填充到输入框中，可以修改脚本的返回值`Exec`
将其内容修改为
```javascript
{
  "Name": "",       //名称
  "Comment": "",    //介绍
  "Exec": "Exec-tab XXXXXXXX",       //执行命令
  "Icon": ""        //图标路径
}
```
上文中的XXXXXX即为你要填充的内容．

**扩展功能.工作流**

待完善

参考插件api功能
