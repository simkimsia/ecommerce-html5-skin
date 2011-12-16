<?php
if(isset($_GET['url'])){
	
	$url = $_GET['url'];
}else{
	die("URL is not set");
	exit();
}

$ch = curl_init();
$timeout = 5;
$userAgent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)";



if(isset($_POST) && sizeof($_POST) > 0){
	curl_setopt($ch, CURLOPT_POST      ,1);
	curl_setopt($ch, CURLOPT_POSTFIELDS , $_POST);
}

curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
curl_setopt($ch, CURLOPT_FAILONERROR, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_AUTOREFERER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
$data = curl_exec($ch);
curl_close($ch);
echo $data;
