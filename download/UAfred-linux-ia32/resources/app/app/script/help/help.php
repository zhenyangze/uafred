#!/usr/bin/php
<?php
$configText = @file_get_contents(dirname(__FILE__) . "/../../config.json");
$configArr = json_decode($configText, true);
foreach((array)$configArr['category'] as $category){
    $showInfo = array(
        'Name' => $category['name'],
        'Icon' => '../../' . $category['icon'],
        'Exec' => '',
        'Comment' => $category['comment']
    );
    echo json_encode($showInfo) . "\n";
}
