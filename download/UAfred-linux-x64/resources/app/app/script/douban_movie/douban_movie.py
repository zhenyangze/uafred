#!/usr/bin/python2.7
# encoding=utf-8

# http://api.douban.com/v2/movie/search?q=
# https://api.douban.com/v2/movie/subject/

import re
import urllib2
import json
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

keyword = ' '.join(sys.argv[1:])
keyword = re.sub(' ', '+', keyword)
if len(keyword) == 0:
	exit()

domain = 'http://api.douban.com/v2/movie/search?q='
url = domain + keyword +'&apikey=0b7cfa4c8c8a14a72276eee5a59e3df5'
response = urllib2.Request(url)
browser = "Mozilla/5.0 (Windows NT 6.1; WOW64)"
response.add_header('User-Agent', browser)
response = urllib2.urlopen(response)
page_raw = response.read()
# id_list = re.findall('<a href=".*?subject/(\d+)', get_page_raw)
page = json.loads(page_raw)

if page['total'] == []:
	exit()

for movie in page['subjects'][0:5]:
	title = movie['title']
	original_title = movie['original_title']
	year = movie['year']
	rating = str(float(movie['rating']['average']))
	subtype = movie['subtype']
	casts = movie['casts']
	icon = movie['images']['small']
	alt = movie['alt']
	comment = '【年份】: ' + year + ' ' + '【评分】: ' + rating + ' ' + '【主演】: '
	for actor in casts:
		comment += actor['name'] + ' '
	print '{"Name":"' + title + ' / ' + original_title + '","Icon":"' + icon + '","Exec":"xdg-open ' + alt + '","Comment":"' + comment + '"}'
