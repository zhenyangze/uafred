#!/usr/bin/php
<?php

if (empty($argv[1])) {
    exit;
}
$url = $argv[1];
$fileContent = curlGet($url);
if (!strstr($fileContent, 'maincontent')) {
    exit;
}
$fileContent = iconv("GBK", "UTF-8//IGNORE", $fileContent);
$body = stristr($fileContent, '<div id="maincontent"');
$body = str_ireplace(stristr($body, '<div id="sidebar'), '', $body);
$css = '<link rel="stylesheet" type="text/css" href="../../script/w3c/css/c5.css" />';
$js = '<script>var a=document.getElementsByTagName("a");for(i in a) {a[i].href="javascript:;"};</script>';
$result = [
    "PageType" => "single",
    'Name' => '',
    'Comment' => $css . $body . $js,
    'Exec' => '',
    'Icon' => '../../script/api/w3c.png'
];
echo json_encode($result) . "\n";

function curlGet($url) {  
	$ch = curl_init();  
	curl_setopt($ch, CURLOPT_URL, $url);  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);   
	curl_setopt($ch, CURLOPT_HEADER, true);  
	//函数中加入下面这条语句  
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);          
	return curl_exec($ch);  
}  
