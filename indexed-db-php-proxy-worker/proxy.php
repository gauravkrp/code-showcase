<?php

	$url = $_REQUEST["url"];
  $method = $_REQUEST["method"];
	$body = null;
	if(!empty($_REQUEST["body"]))	{
		$body = $_REQUEST["body"];
	}

	// temporarily override CURLs user agent with the user's own
	ini_set("user_agent", $_SERVER['HTTP_USER_AGENT']);

	// enable access from all domains
	enable_cors();

	// calling actual api via curl
	curl($url, $method, $body);

	// make curl request and echo the results
	function curl($url, $method = 'GET', $body = null) {
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Allow  api to send response
		if($method === 'POST') {
			curl_setopt($ch, CURLOPT_POST, 1); // we are doing a POST request
		}
		if(!empty($body)) {
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
		}

		// curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
		// curl_setopt($ch, CURLOPT_HEADER, false);
		// curl_setopt($ch, CURLOPT_SSLVERSION, 3);

		$result = curl_exec($ch);
		$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
		$response = json_decode($result, true);
		$response['httpCode'] = $httpCode;
    echo json_encode($response);
	}

	function enable_cors() {
		// Allow from any origin
		if (isset($_SERVER['HTTP_ORIGIN'])) {
			header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
			header('Access-Control-Allow-Credentials: true');
			header('Access-Control-Max-Age: 86400');	// cache for 1 day
		} else {
			header("Access-Control-Allow-Origin: *");
			header('Access-Control-Allow-Credentials: true');
			header('Access-Control-Max-Age: 86400');	// cache for 1 day
		}

		// Access-Control headers are received during OPTIONS requests
		if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

			if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
				header("Access-Control-Allow-Methods: GET, POST, OPTIONS");		 

			if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
				header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

			exit(0);
		}
	}
