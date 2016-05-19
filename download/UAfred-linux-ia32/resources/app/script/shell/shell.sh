#!/bin/bash
# File Name: shell.sh
# Author: zhenyangze
# mail: zhenyangze@gmail.com
# Created Time: 2016年05月19日 星期四 16时24分43秒

if [[ -z $1 ]];then
    exit
fi
commandStr=$*
commandStr=${commandStr//\"/\\\"}
commandStr=${commandStr//\'/\\\'}
echo '{"Name":"> /bin/bash","Icon":"../../script/shell/shell-icon.png","Exec":"'$commandStr'","Comment":"'$commandStr'"}';
