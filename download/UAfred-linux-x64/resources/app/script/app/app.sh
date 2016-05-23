#!/bin/bash
# File Name: app.sh
# Author: zhenyangze
# mail: zhenyangze@gmail.com

APP_PATH='/usr/share/applications'
if [[ -z $1 ]];then
    exit
fi
KEYWORD=$1
NUM=0
for i in $(ls $APP_PATH);do
    FILE_PATH=$APP_PATH/$i
    COUNT=$(cat $FILE_PATH | grep -E 'Name|Comment|Keywords' | grep -i $KEYWORD | wc -l)
    if [[ $COUNT -gt 0 ]];then
        Name=$(cat $FILE_PATH | grep 'Name=' | head -1 | sed -n 's/Name=//p') 
        Name_ZH=$(cat $FILE_PATH | grep 'Name\[zh_CN\]=' | head -1 | sed -n 's/Name\[zh_CN\]=//p') 
        if [[ ! -z $Name_ZH ]];then
            Name=$Name_ZH
        fi
        Comment=$(cat $FILE_PATH | grep 'Comment=' | head -1 | sed -n 's/Comment=//p') 
        Comment_ZH=$(cat $FILE_PATH | grep 'Comment\[zh_CN\]=' | head -1 | sed -n 's/Comment\[zh_CN\]=//p') 
        if [[ ! -z $Comment_ZH ]];then
            Comment=$Comment_ZH
        fi
        Exec=$(cat $FILE_PATH | grep 'Exec=' | head -1 | sed -n 's/Exec=//p' | cut -d ' ' -f 1) 
        Icon=$(cat $FILE_PATH | grep 'Icon=' | head -1 | sed -n 's/Icon=//p') 
        REAL_ICON=$(tree -fin /usr/share/icons/hicolor | grep '\/'$Icon | head -1 | awk '{print $1}')
        if [[ ! -f $REAL_ICON ]];then
            REAL_ICON=''
        fi
        RESULT='{"Key":"'$KEYWORD'","Name": "'$Name'","Comment":"'$Comment'","Exec":"'$Exec'","Icon":"'$REAL_ICON'"}'
        echo $RESULT
        NUM=`expr $NUM + 1`
        if [[ $NUM -gt 50 ]];then
            exit
        fi
    fi
done
