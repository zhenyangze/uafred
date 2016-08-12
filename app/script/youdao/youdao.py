#!/usr/bin/python2.7
# encoding=utf-8

# http://fanyi.youdao.com/openapi.do?keyfrom=taohaoge&key=527038574&type=data&doctype=json&version=1.1&q=

import urllib
import urllib2
import json
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

# text command icon subtext

keyword = ' '.join(sys.argv[1:])
keyword = urllib.quote(keyword)
if len(keyword) == 0:
    exit()

domain = 'http://fanyi.youdao.com/openapi.do?'
key = 'keyfrom=taohaoge&key=527038574&type=data&doctype=json&version=1.1'
q = '&q=' + keyword
url = domain + key + q
response = urllib2.Request(url)
browser = "Mozilla/5.0 (Windows NT 6.1; WOW64)"
response.add_header('User-Agent', browser)
response = urllib2.urlopen(response)
get_page = response.read()
get_page = json.loads(get_page)

if get_page['errorCode'] != 0:
    exit()


print '{"Name":"' + ' '.join(get_page['translation']).strip() + '","Icon":"../../script/youdao/youdao.png","Exec":"","Comment":"' + get_page['query'] + '"}'


for i in get_page['web']:
    print '{"Name":"' + ' '.join(i['value']).strip() + '","Icon":"../../script/youdao/youdao.png","Exec":"","Comment":"' + i['key'] + '"}'
