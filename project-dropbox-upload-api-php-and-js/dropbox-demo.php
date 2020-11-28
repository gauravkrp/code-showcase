<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<!-- Meta Tags, Open Graph Tags & Viewport -->
	<title>Dropbox API</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
	integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
	<div>
		<label>Pick file</label><br />
		<input type="file" id="fileUpload" name="fileUpload" /><br />
		<button type="submit">Upload</button>
	</div>
</body>
<script type='text/javascript'>
	$('button').on('click', function(e){
		console.log('clicked');
		//let file = document.getElementById("fileUpload").files[0];
		let file = $('#fileUpload')[0].files[0];
		let fileName = file.name;
		const ACCESS_TOKEN = 'YOUR ACCESS TOKEN HERE';
		console.log('file:', fileName, file)
		$.ajax({
		    url: 'https://content.dropboxapi.com/2/files/upload',
		    type: 'post',
		    data: file,
		    processData: false,
		    contentType: 'application/octet-stream',
		    headers: {
		        "Authorization": "Bearer " + ACCESS_TOKEN,
		        "Dropbox-API-Arg": '{"path": "/' + fileName + '","mode": "add","autorename": false,"mute": false}'
		    },
		    success: function (data) {
		        console.log(data);
		    },
		    error: function (data) {
		        console.error(data);
		    }
		})
	})
	
</script>
</html>