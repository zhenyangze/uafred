#!/bin/bash
url="http://www.baidu.com/s?wd=$*"
url=${url// /%20}
echo '{"Name":"'$*'","Icon":"../../script/baidu/baidu-icon.png","Exec":"xdg-open '$url'","Comment":"百度搜索 '$*'"}'
