#!/bin/bash
# File Name: app.sh
# Author: zhenyangze
# mail: zhenyangze@gmail.com

APP_PATH_ARRAY=('/usr/share/applications' $HOME'/.local/share/applications' $HOME'/.gnome/apps')

if [[ -z $1 ]];then
    exit
fi
KEYWORD=$1
NUM=0

tmpFile=$(ls /tmp/uafred_${KEYWORD}.* 2>/dev/null | head -1)
if [[ ! -z $tmpFile ]];then
    cat $tmpFile
    exit
else
    tmpFile=$(mktemp /tmp/uafred_${KEYWORD}.XXXX)
fi

for APP_PATH in ${APP_PATH_ARRAY[*]};do
    # for i in $(grep -i $KEYWORD $APP_PATH/* | grep -E 'Name|Comment|Keywords' | awk -F':' '{print $1}' | uniq);do
    for i in $(grep -i $KEYWORD $APP_PATH/* | awk -F':'  '$2 ~ /Name|Keywords/ {print $1}' | uniq);do
        FILE_PATH=$i
        Name=$(cat $FILE_PATH | grep '^Name=' | head -1 | sed -n 's/Name=//p') 
        Name_ZH=$(cat $FILE_PATH | grep '^Name\[zh_CN\]=' | head -1 | sed -n 's/Name\[zh_CN\]=//p') 
        if [[ ! -z $Name_ZH ]];then
            Name=$Name_ZH
        fi
        Comment=$(cat $FILE_PATH | grep '^Comment=' | head -1 | sed -n 's/Comment=//p') 
        Comment_ZH=$(cat $FILE_PATH | grep '^Comment\[zh_CN\]=' | head -1 | sed -n 's/Comment\[zh_CN\]=//p') 
        if [[ ! -z $Comment_ZH ]];then
            Comment=$Comment_ZH
        fi
        Exec=$(cat $FILE_PATH | grep '^Exec=' | head -1 | sed -n 's/Exec=//p;s/"//gp' | tail -1 | awk '{gsub(/\%\w+/, "", $0);print $0}') 
        Icon=$(cat $FILE_PATH | grep '^Icon=' | head -1 | sed -n 's/Icon=//p') 
        REAL_ICON=$(tree -fin /usr/share/icons/hicolor | grep '\/'$Icon | head -1 | awk '{print $1}')
        if [[ ! -f $REAL_ICON ]];then
            REAL_ICON=''
        fi
        Exec=$(echo $Exec | grep -o "[^ ]\+\( \+[^ ]\+\)*")
        if [ -n "$Exec" ]; then 
            RESULT='{"Key":"'$KEYWORD'","Name": "'$Name'","Comment":"'$Comment'","Exec":"'$Exec'","Icon":"'$REAL_ICON'"}'
            echo $RESULT
            echo $RESULT >> $tmpFile
            NUM=`expr $NUM + 1`
        fi
        if [[ $NUM -gt 50 ]];then
            exit
        fi
    done
done
