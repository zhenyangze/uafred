#!/usr/bin/php
<?php
$queryArr = array_slice($argv, 1);
if (empty($queryArr)){
    exit;
}
$queryStr = implode(' ', $queryArr);
if (preg_match("/^[".chr(0xa1)."-".chr(0xff)."]+$/", $queryStr)) {
    $urlType = 'from=en&to=zh';
} else {
    $urlType = 'from=zh&to=en';
}
$result = file_get_contents('http://fanyi.baidu.com/v2transapi?' . $urlType . '&query=' . urlencode($queryStr));
$resultArr = json_decode($result, true);
foreach((array)$resultArr['trans_result']['data'] as $data){
    $showResult = array(
        'Name' => $data['dst'],
        'Icon' => '../../script/baidu_fanyi/baidu_fanyi.png',
        'Exec' => '',
        'Comment' => $data['src']
    );
    echo json_encode($showResult) . "\n";
}
foreach((array)$resultArr['dict_result']['simple_means']['symbols'][0]['parts'] as $data){
    $showResult = array(
        'Name' => $data['part'],
        'Icon' => '../../script/baidu_fanyi/baidu_fanyi.png',
        'Exec' => '',
        'Comment' => implode(' ', $data['means'])
    );
    if (!empty($data['part'])){
        echo json_encode($showResult) . "\n";
    }
}
foreach((array)$resultArr['dict_result']['collins']['entry'] as $entry){
    foreach((array)$entry['value'] as $value){
        foreach($value['mean_type'] as $mean){
            if (empty($mean['example'][0]['tran'])){
                continue;
            }
            $showResult = array(
                'Name' => $mean['example'][0]['tran'],
                'Icon' => '../../script/baidu_fanyi/baidu_fanyi.png',
                'Exec' => '',
                'Comment' => $mean['example'][0]['ex']
            );
            echo json_encode($showResult) . "\n";
        }
    }
}
