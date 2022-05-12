<?php
	$ACCESS_TOKEN = 'YOUR ACCESS TOKEN HERE';
	

	$cheaders1 = array(
		'Authorization: Bearer '.$ACCESS_TOKEN,
		'Content-Type: application/json'
	);
	$file2dlData = '{"path": "/upload/idproof/REF97758-PAN_Card.pdf"}';
	$ch1 = curl_init('https://api.dropboxapi.com/2/files/get_temporary_link');
	curl_setopt($ch1, CURLOPT_HTTPHEADER, $cheaders1);
	curl_setopt($ch1, CURLOPT_CUSTOMREQUEST, 'POST');
	curl_setopt($ch1, CURLOPT_POSTFIELDS, $file2dlData);
	curl_setopt($ch1, CURLOPT_RETURNTRANSFER, 1);
	$response1 = curl_exec($ch1);

	$response1 = json_decode($response1);

	echo "<pre>";
	print_r($response1);
	echo $response1->link;
	echo "</pre>";

?>