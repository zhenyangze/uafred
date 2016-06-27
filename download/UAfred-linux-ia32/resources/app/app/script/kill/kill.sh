#!/bin/bash
# File Name: kill.sh
# Author: zhenyangze
# mail: zhenyangze@gmail.com
# Created Time: 2016年06月27日 星期一 13时11分10秒

if [ -z $1 ];then
    exit
fi

echo -e '{"Name":"kill '$1'", "Comment":"结束进程", "Exec":"killall -i '$1'", "Icon":"../../script/kill/kill.png"}'
