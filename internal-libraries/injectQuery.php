<?php require '../../dbCon/conPool.php'; ?>
<?php
	
	$storeDateTime = strval($_GET['storeDateTime']);
	$dbTableName = strval($_GET['dbTableName']);	
	$tableCols = array();	
	$rowNum = 0;

	$sql = "SHOW COLUMNS FROM " . $dbTableName;
	$result = mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result)){
		$tableCols[$rowNum] = $row['Field'];
		$rowNum++;
	}
	
?>

<?php
	
	$success;
	$duplicate;
	$error;
	
	$dataString = $_SERVER['QUERY_STRING'];
	
	$dataString = urldecode($dataString);

	$dataStringExplode = explode("&",$dataString);
	
	$paramVal = array();
	$param = 0;

	for($k=0; $k<count($dataStringExplode)-2; $k++){
		$paramName = explode("=",$dataStringExplode[$k]);
		$paramVal[$param] = $paramName[1];
		$param++;
	}

	date_default_timezone_set('Asia/Calcutta');
	$date = date("d/m/Y");
	$time = date("h:i a");

	$ip = $_SERVER['REMOTE_ADDR'];

?>



<?php
	
	$tableColNames = implode(",",$tableCols);
	$tableColValues = implode('", "', $paramVal);
	
	if($storeDateTime == "true"){
		$sql = "INSERT INTO " . $dbTableName . " (" . $tableColNames . ") VALUES (\"" . $tableColValues . "\",
		\"$date\", \"$time\", \"$ip\")";	
	}
	else{
		$sql = "INSERT INTO " . $dbTableName . " (" . $tableColNames . ") VALUES (\"" . $tableColValues . "\")";
	}

	if ($conn->query($sql) === TRUE) {
		$success = "Yes";
		$duplicate = "No";
		$error = "NoError";
	}
	else{
		
		$errorType = $sql . "<br>" . $conn->error;
		
		if(strpos($errorType, 'Duplicate') == true){
			$duplicate = "Yes";
			$success = "No";
			$error = "NoError";
		}
		else{
			$error = "SQL error";	
			$duplicate = "No";
			$success = "No";
			$error = "Error";
		}
			
	}
		
?>

<?php

	echo json_encode(
    	array(
        	"success" => $success,
        	"duplicate" => $duplicate,
			"error" => $error
    	)
	);

?>