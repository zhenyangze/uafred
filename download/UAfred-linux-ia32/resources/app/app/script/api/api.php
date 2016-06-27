#!/usr/bin/php
<?php

require_once __DIR__ . '/lib/phpQuery.php';
array_shift($argv);
if (empty($argv)) {
	exit;
}
$keywords = implode('%20', $argv);
$url = 'http://www.baidu.com/s?wd=' . $keywords . '&ie=utf-8&si=w3school.com.cn&ct=2097152&rsv_srlang=cn&sl_lang=cn&rsv_rq=cn';
$fileContent = file_get_contents($url);
$doc = phpQuery::newDocumentHTML($fileContent);
phpQuery::selectDocument($doc);
foreach (pq('#content_left .result a') as $t) {
	$title = $t->textContent;
	$href = $t -> getAttribute('href');
	if (stristr($href, 'link?url')) {
		$result = [
			'Name' => $title,
			'Comment' => '',
			'Exec' => 'Exec-tab w3c ' . $href,
			'Icon' => '../../script/api/api.png'
		];
		echo json_encode($result) . "\n";
	}
}
