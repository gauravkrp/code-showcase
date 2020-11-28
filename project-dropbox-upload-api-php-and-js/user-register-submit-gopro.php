<?php
include('config.php');
if(isset($_POST['register'])){	
	$invoicefilename="";
	$idprofname="";

	$reference_no= 'REF'.rand(10000,99999);
	
	$firstname=mysqli_real_escape_string($conn,$_POST['first_name']);
	$lastname=mysqli_real_escape_string($conn,$_POST['lastname']);
	$mobileno=mysqli_real_escape_string($conn,$_POST['mobile_no']);
	$email=mysqli_real_escape_string($conn,$_POST['email']);

	$idproof=mysqli_real_escape_string($conn,$_POST['idproof']);

	if ($idproof=='Others') {
		$idproof=mysqli_real_escape_string($conn,$_POST['otheridproof']);
	}
		
	$idprooffile=$_FILES['proof_file']['name'];

	$address1=mysqli_real_escape_string($conn,$_POST['address1']);
	$address2=mysqli_real_escape_string($conn,$_POST['address2']);
	$state=mysqli_real_escape_string($conn,$_POST['state']);
	$city=mysqli_real_escape_string($conn,$_POST['city']);
	$pincode=mysqli_real_escape_string($conn,$_POST['pincode']);
	$landmark=@mysqli_real_escape_string($conn,$_POST['landmark']);

	$producttype=mysqli_real_escape_string($conn,$_POST['product_type']);
	$serialno=strtoupper(mysqli_real_escape_string($conn,$_POST['serial_number']));

	$sellername=mysqli_real_escape_string($conn,$_POST['seller_name']);
	$seller_info=mysqli_real_escape_string($conn,$_POST['seller_name1']);
	
	$sellername = $sellername;
	$invoicedate=mysqli_real_escape_string($conn,$_POST['invoice_date']);
	$invoicefile=$_FILES['invoicefile']['name'];
	$indate=date('Y-m-d',strtotime($invoicedate));
	
	$customerprofession=mysqli_real_escape_string($conn,$_POST['customerprofession']);

	$formAgreement=mysqli_real_escape_string($conn,$_POST['formAgreement']);
	if (isset($formAgreement)) {
		$formAgreement=1;
	}
	$formNewsletter=mysqli_real_escape_string($conn,$_POST['formNewsletter']);
	if (isset($formNewsletter)) {
		$formNewsletter=1;
	}

	$status="New";	
	
	$error=array();
	if($firstname==""){
		$error[]="Please enter first name.";
	}
	if($lastname==""){
		$error[]="Please enter last name.";
	}

	if($_FILES['proof_file']['name']!=""){
		$idprooffile = $_FILES['proof_file']['name'];
		$ext = pathinfo($idprooffile, PATHINFO_EXTENSION);
		$idprofname=$reference_no."-".str_replace(' ','_',$idproof).".".$ext;
		$idprooffilepath="upload/idproof/".$idprofname;
		$filename=$_FILES['proof_file']['tmp_name'];
		move_uploaded_file($filename,$idprooffilepath);
	}
	if($_FILES['invoicefile']['name']!=""){
		$invoicefile = $_FILES['invoicefile']['name'];
		$ext = pathinfo($invoicefile, PATHINFO_EXTENSION);
		$invoicefilename=$reference_no."-invoice.".$ext;
		$invoicefilepath1="upload/invoice/".$invoicefilename;
		$filename1=$_FILES['invoicefile']['tmp_name'];
		move_uploaded_file($filename1,$invoicefilepath1);
	}

	$i=1;
	$message="";
	if(!empty($error)){
		foreach($error as $err){
			$message=$message."(".$i.")".$err;
			$i++;			
		}
		$_SESSION['error']=$message;

		//$_SESSION['record']=$_POST;
		header("location:register.php");
		exit();
	} else {

		$ACCESS_TOKEN = 'ACCESS TOKEN HERE';

		// Uploading ID Prrof to Dropzone
		$fp = fopen($idprooffilepath, 'rb');
		$size = filesize($idprooffilepath);

		$cheaders = array('Authorization: Bearer '.$ACCESS_TOKEN,
			'Content-Type: application/octet-stream',
			'Dropbox-API-Arg: {"path":"/'.$idprooffilepath.'", "mode":"add"}');

		$ch = curl_init('https://content.dropboxapi.com/2/files/upload');
		curl_setopt($ch, CURLOPT_HTTPHEADER, $cheaders);
		curl_setopt($ch, CURLOPT_PUT, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
		curl_setopt($ch, CURLOPT_INFILE, $fp);
		curl_setopt($ch, CURLOPT_INFILESIZE, $size);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);

		// echo '<pre>'.$response.'</pre>';
		curl_close($ch);
		fclose($fp);

		// Uploading Invoice to Dropzone
		$fp = fopen($invoicefilepath1, 'rb');
		$size = filesize($invoicefilepath1);

		$cheaders = array('Authorization: Bearer '.$ACCESS_TOKEN,
			'Content-Type: application/octet-stream',
			'Dropbox-API-Arg: {"path":"/'.$invoicefilepath1.'", "mode":"add"}');

		$ch = curl_init('https://content.dropboxapi.com/2/files/upload');
		curl_setopt($ch, CURLOPT_HTTPHEADER, $cheaders);
		curl_setopt($ch, CURLOPT_PUT, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
		curl_setopt($ch, CURLOPT_INFILE, $fp);
		curl_setopt($ch, CURLOPT_INFILESIZE, $size);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);

		// echo '<pre>'.$response.'</pre>';
		curl_close($ch);
		fclose($fp);		
		
	   	$sql="INSERT INTO `register`(`reference_no`, `first_name`, `last_name`, `mobile_no`, `email`, `id_proof_type`, `id_proof_file`, `address1`, `address2`, `state`, `city`, `pincode`, `landmark`, `product_type`, `serial_number`, `seller_name`,`seller_info`, `invoice_date`, `invoice_file`, `customer_profession`, `t&c`, `newsletter`, `status`, `status_type`) VALUES ('".$reference_no."','".$firstname."','".$lastname."','".$mobileno."','".$email."','".$idproof."','".$idprooffilepath."','".$address1."','".$address2."','".$state."','".$city."','".$pincode."','".$landmark."','".$producttype."','".$serialno."','".$sellername."','".$seller_info."','".$indate."','".$invoicefilepath1."','".$customerprofession."','".$formAgreement."','".$formNewsletter."','".$status."','".$status."')";

	   	// echo $sql;
		$rs=mysqli_query($conn,$sql);
		$id=mysqli_insert_id($conn);

		if($rs){
			$to=$email;
			$name=$firstname;

			$subject="Gopro | Registration Successful for $reference_no";			

	 	    if($producttype == 'Hero7 Black'){
	 	    	ob_start();
				require_once('register-hero7.php');
				$str_user = ob_get_contents();
				ob_end_clean();				
				$body='';				
				$body=$str_user;	
	 	    }else{
				ob_start();
				require_once('register-emailer.php');
				$str_user = ob_get_contents();
				ob_end_clean();				
				$body='';				
				$body=$str_user;	
	 	    }

	 	    include("email.php");
			$emailobj = new sendemail();
		 	$sent = $emailobj->send_email($to,$subject,$body);	 	
	 	    $data = json_decode($sent,true);

			$msg ="Thanks for registering your GoPro serial no $serialno .Your Reference no is $reference_no .You will hear from us shortly regarding your product Extended Warranty.";
			sendSMS($mobileno,$msg);

		    if($data['success']==true){
				$_SESSION['current_user']=$id;
				$_SESSION['message']=true;
				$_SESSION['product']=$producttype;
				header('location:thankyou.php');
				exit;
			}
			else{
				$_SESSION['message']=false;
				$_SESSION['product']=$producttype;
				header('location:thankyou.php');				
				exit;
			}
		}
	}
}
// Send SMS Function
function sendSMS($number,$msg){
	$authKey = "AUTH KEY HERE";
	$curl = curl_init();
	curl_setopt_array($curl, array(
		CURLOPT_URL => "http://api.msg91.com/api/sendhttp.php?sender=GOPROA&route=4&mobiles=$number&authkey=$authKey&encrypt=&country=0&message=$msg",
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "GET",
		CURLOPT_SSL_VERIFYHOST => 0,
		CURLOPT_SSL_VERIFYPEER => 0,
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		return "cURL Error #:" . $err;
	} else {
		return $response;
	}
}
?>