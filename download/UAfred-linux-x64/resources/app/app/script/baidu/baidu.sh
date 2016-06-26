#!/bin/bash
echo '{"Name":"'$1'","Icon":"../../script/baidu/baidu-icon.png","Exec":"xdg-open http://www.baidu.com/s?wd='$1'","Comment":"百度搜索 '$1'"}'
