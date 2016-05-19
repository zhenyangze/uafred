#!/bin/bash
# File Name: calc.sh
# Author: zhenyangze
# mail: zhenyangze@gmail.com
# Created Time: 2016年05月19日 星期四 15时36分44秒

if [[ -z $1 ]];then
    exit
fi

if [[ $1 = "?" ]];then
    echo '{"Name":"基本运算","Exec":"","Icon":"../../script/calc/icon.png","Comment":"calc 1+1+2*3+9/3"}';
    echo '{"Name":"浮点运算","Exec":"","Icon":"../../script/calc/icon.png","Comment":"calc scale=2;5/3"}';
    echo '{"Name":"进制运算","Exec":"","Icon":"../../script/calc/icon.png","Comment":"calc ibase=2;110*101;obase=10"}';
    exit;
fi

result=$(echo "$1" | bc)
if [[ $? -eq 0 ]];then
    echo '{"Name":"'$result'","Exec":"","Icon":"../../script/calc/icon.png","Comment":"'$1'"}'
fi 
