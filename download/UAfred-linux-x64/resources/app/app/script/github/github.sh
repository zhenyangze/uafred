#!/bin/bash
echo '{"Name":"'$1'","Icon":"../../script/github/github-icon.png","Exec":"xdg-open http://github.com/search?q='$1'","Comment":"github搜索 '$1'"}'
