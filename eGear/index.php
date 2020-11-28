<?php header("Access-Control-Allow-Origin: *"); if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else ob_start(); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
	<!-- Meta Tags, Open Graph Tags & Viewport -->
	<?php
		$urlDIR = "../";
		
		if(isset($_GET['uID'])) {
			if(empty($_GET['uID'])) {
				$pgTitle = "Study MBBS Abroad colleges by Education World";
				include '../metaHome.php';
			}
			else {
				$pg = "Study MBBS in ";
				$collIDTemp = $_GET["uID"];
				$collName = str_replace("-", " ", $collIDTemp);
				$collName = ucwords($collName);
				$pgTitle = $pg . $collName;
				include 'metaCollege.php';
			}
		}
		else {
			$pgTitle = "Study MBBS Abroad colleges by Education World";
			include '../metaHome.php';
		}
		
		include '../metaCommon.php';
		include '../gtm.php';
				
		// Style/Script Imports
		include 'pgImport.php'; // page specific
		include '../cmnImport.php'; // common
	?>	
</head>
<body id="collegesBody" class="pageScroll of-x-h">
	<?php include_once("../analyticsTrack.php") ?>
	<div id="collegesPageView container-fluid ">
    	
    	<?php		
			include '../section/menu.php';
			include '../section/menuXS.php';		
			try{
				if(isset($_GET['uID'])) {
					if(empty($_GET['uID'])) {
						$uID = "";
						$uName = "";
						include 'section/cover.php';
					}
					else {
						$uID = $_GET["uID"];
						$uNameTemp = str_replace("-", " ", $uID);
						$uName = ucwords($uNameTemp);
						
						include 'section/jsonOut.php';
						include 'section/intro.php';
						include 'section/admission.php';
						include 'section/course.php';
						include 'section/location.php';
						include 'section/colleges.php';
					}
				}				
				else {
					$uID = "";
					$uName = "";
					include 'section/cover.php';		
				}
			}
		
			catch(Exception $e){
				$collegeName = "";
			}			
			include '../section/footer.php';
	
			include '../section/downBrocModal.php';
			include '../section/applyNow.php';
		
		?>        
    </div>
    <?php include '../cmnScripts.php';?>
</body>
<script type="text/javascript" >
	var urlDIR = '<?php echo $urlDIR; ?>';
	var collegeID = '<?php echo $uID; ?>';
	var collName = '<?php echo $uName; ?>';
</script>
<script type="text/javascript" src="../scripts/common/core.js" async></script>
<script type="text/javascript" src="../scripts/colleges/core.js" async></script>
</html>