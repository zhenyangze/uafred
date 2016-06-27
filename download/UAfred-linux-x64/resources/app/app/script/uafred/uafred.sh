#!/bin/bash
# File Name: uafred.sh
# Author: zhenyangze
# mail: zhenyangze@gmail.com
# Created Time: 2016年06月27日 星期一 10时09分46秒

baseDir=$(dirname $0)
case $1 in
    'exit')
        shift
        source $baseDir/exit.sh $*
        ;;
    *)
        echo '{"Name":"uafred [exit]", "Comment":"UAfred相关命令", "Exec":"", "Icon":"../../script/uafred/uafred.png"}'
        ;;
esac
