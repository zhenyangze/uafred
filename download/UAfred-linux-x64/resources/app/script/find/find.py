#!/usr/bin/python2.7
# -*- coding: utf-8 -*-

import sys
import subprocess
import gio
import os
import os.path

reload(sys)
sys.setdefaultencoding('utf-8')

# text command icon subtext
num=0
for i in range(1, len(sys.argv)):
    try:
        '''
        k = os.popen("find "
                     + os.environ['HOME']
                     + " -type f -name \"*"
                     + sys.argv[i]
                     + "*\" 2>/dev/null")
        '''
        k = os.popen("locate "
                     + sys.argv[i]
                     + " 2>/dev/null | grep -v '\/\.'"
                     )
    except:
        sys.exit()
    strs = k.read().splitlines()
    for str in strs:
        num = num + 1
        icon = gio.File(str).query_info("standard::icon").get_icon().to_string()
        try:
            text = str.split('/')[-1]
            command = 'xdg-open \'' + str + '\''
            icon = '/usr/share/icons/Humanity/mimes/48/' + icon.split(' ')[2] + '.svg'
            if not os.path.isfile(icon):
                icon = '../../script/find/find.png'

            subtext = str
        except:
            continue
        print '{"Name":"' + text + '","Icon":"' + icon + '","Exec":"' + command + '","Comment":"' + subtext + '"}'
        if num >= 15:
            sys.exit()
