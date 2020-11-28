/*eGear JS*/
// function to Redirect to Mobile
function redirectToMobile(locationhref){
	
	var device = detectMobile();
	
	if(device == "XS"){
		window.location.href = locationhref;
	}
	else{
		// do nothing
	}
	
	// function detectMobile() is used to detect whether the request is coming from mobile or not [starts]
	function detectMobile(){
	
		var windowWidth = $(window).width(); //retrieve current window width
		var windowHeight = $(window).height(); //retrieve current window height
	valid
		if(windowWidth <=768){
			return "XS";
		}
		else{
			return "NXS";
		}
	}
	
}

// open the link in a window
function ohref(url, target){
	window.open(url, target);
}

// redirect to a link
function rhref(url){
	window.location.href = url;
}

// scroll to a specified id
function scrollTop(selector, id, timer){
	
	var prefixToSelector;
	
	switch (selector) {
    	case "id":
        prefixToSelector = "#";
        break;
    	case "class":
        prefixToSelector = ".";
        break;
    	default:
        prefixToSelector = "";
	}
	
	if((id.charAt(0) == "#") || (id.charAt(0) == ".")){id = id.substring(1);};
	
	$('html, body').animate ({
		scrollTop: $(prefixToSelector + id).offset().top
	}, timer);
}

// function to read json file
function readJSON(jsonURL, object, objectNames){
	
	if(objectNames == ""){
		
		$.getJSON(jsonURL, function(data) {
			for (var i in data.object) {
				var getJobID = data.object[i].id;
				var getJobType = data.object[i].type;
			}
		});
		
	}
	else{
		
		$.getJSON(jsonURL, function(data) {
			for (var i in data.epilenJobs) {
				var getJobType = data.epilenJobs[i].id;
				var on1 = objectNames[0];
				//alert((data[object][i])[on1]);
			}
		});
		
	}
	
}

// sqlOperate - save the data in database
function sqlOperate(dataStringToValidate, dataStringToOperate, dbTableName, storeDeviceInfo, storeDateTime, root){
	
	var redirectSRC = "";
	
	if(root == "undefined" || root == "null" || root == ""){
		var pathNameArr = window.location.pathname.split("/");
		pathNameCount = pathNameArr.length;
		pathNameCount = pathNameCount - 2;
	
		for(var k=0; k<pathNameCount; k++){
			redirectSRC = redirectSRC + "../";
		}
	}
	else{
		var rootSplit = window.location.href.split('/');
		var rootIndex = jQuery.inArray(root, rootSplit);
		var rootSplitLength = rootSplit.length;
		var rootToMatch = (rootSplitLength-1) - (rootIndex+1);
		for(var k=0; k<rootToMatch; k++){
			redirectSRC = redirectSRC + "../";
		}
	}
	
	var iValidateResult = iValidate(dataStringToValidate, redirectSRC); // returns an array in sequence order of data passed
	
	// validation
	function getValidationStatus(arr){
        var x= arr[0];
        return arr.every(function(item){
            if (item == 100 & x == 100){
				return true;
			}
			else{
				return false;
			}
        });
    }
		
	var validation = getValidationStatus(iValidateResult);
	
	if(validation){
		
		// sql operate
		var fetchDeviceParam = deviceParam(); // fetching all device param in one single data string
		
		if(storeDeviceInfo == true){
			dataStringToOperate = dataStringToOperate + "&" + fetchDeviceParam + "&dbTableName=" + dbTableName + "&storeDateTime=" + storeDateTime;
		}
		else{
			dataStringToOperate = dataStringToOperate + "&dbTableName=" + dbTableName + "&storeDateTime=" + storeDateTime;;
		}
		
		// proceed to ajax call
		var returnCall = ajaxCall(redirectSRC + "eGear/serverOp/injectQuery.php", dataStringToOperate, false);
		var returnCallVal = returnCall.split("&");
			
		return returnCallVal;
		
	}
	else{
		return;
	}
	
}

// input validation
function iValidate(dataString, redirectSrc){
	
	var dataUnit = dataString.split("&");
	
	var vStatus = [];
	
	for(var k = 0; k<dataUnit.length; k++){
		var dataByte = dataUnit[k].split("=");
		vStatus[k] = validate(dataByte[0], dataByte[1]);
	}
	
	return vStatus;
	
	var validateStatus;
	
	function validate(inputName, inputVal){
		
		inputVal = decodeURIComponent(inputVal);
		
		var inputType = $("[name=" + "\'" + inputName + "\'"+ "]").attr("iType");
		var inputRequire = $("[name=" + "\'" + inputName + "\'"+ "]").attr("iRequire");
		var inputParentID = $("[name=" + "\'" + inputName + "\'"+ "]").parent().attr("id");
		
		var inputLength = inputVal.length;
		
		if(inputType == "name" && inputRequire == "true"){
			
			if($.isNumeric(inputVal)){
				validateStatus = -3;
				hintValidation(validateStatus, inputParentID, inputType);
			}
			else{
				if(inputLength == 0){
					validateStatus = 0;
					hintValidation(validateStatus, inputParentID, inputType);
				}
				else if(inputLength <= 2){
					validateStatus = -1;
					hintValidation(validateStatus, inputParentID, inputType);
				}
				else{
					
					var reservedStatus;
					$.ajaxSetup({
						async: false
					});
					$.getJSON(redirectSrc + 'eGear/_master-data/json/reserved_usernames.json', function(data) {
        				for (var i in data.reserved_usernames) {
							if(inputVal == data.reserved_usernames[i]){
								reservedStatus = -1;
								break;
							}
							else{
								reservedStatus = 0;
							}
						}
   					});
					
					if(reservedStatus == -1){
						validateStatus = -3;
						hintValidation(validateStatus, inputParentID, inputType);
					}
					else if(reservedStatus == 0){
						validateStatus = 100;
					}
					
				}
			}
			
		}
		
		if(inputType == "email" && inputRequire == "true"){
			
			if(inputLength == 0){
				validateStatus = 0;
				hintValidation(validateStatus, inputParentID, inputType);
			}
			else if(inputLength <= 3){
				validateStatus = -1;
				hintValidation(validateStatus, inputParentID, inputType);
			}
			else{
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  				var emailValidate = emailReg.test(inputVal);
				
				if(emailValidate == false){
					validateStatus = -2;
					hintValidation(validateStatus, inputParentID, inputType);
				}
				else{
					var disposeStatus;
					$.ajaxSetup({
						async: false
					});
					$.getJSON(redirectSrc + 'eGear/_master-data/json/disposableAddress.json', function(data) {
        				for (var i in data.emailList) {
							if(inputVal.indexOf(data.emailList[i]) >= 0){
								disposeStatus = -1;
								break;
							}
							else{
								disposeStatus = 0;
							}
						}
   					});
					
					if(disposeStatus == -1){
						validateStatus = -2;
						hintValidation(validateStatus, inputParentID, inputType);
					}
					else{
						validateStatus = 100;
					}
					
				}
			}
			
		}
		
		if(inputType == "number" && inputRequire == "true"){
			
			var inputLengthMin = $("[name=" + "\'" + inputName + "\'"+ "]").attr("iLengthMin");
			var inputLengthMax = $("[name=" + "\'" + inputName + "\'"+ "]").attr("iLengthMax");
			
			var isNumericStatus = $.isNumeric($("[name=" + "\'" + inputName + "\'"+ "]").val());
			
			if(inputLength == 0){
				validateStatus = 0;
				hintValidation(validateStatus, inputParentID, inputType);
			}
			else if(isNumericStatus == false){
				validateStatus = -3;
				hintValidation(validateStatus, inputParentID, inputType);
			}
			else if(inputLengthMax >= inputLength <= inputLengthMin){
				validateStatus = 100;
				//hintValidation(validateStatus, inputParentID, inputType);
			}
			else{
				validateStatus = 100;
			}
			
		}
		
		if(inputType == "url" && inputRequire == "true"){
			
			if(inputLength == 0){
				validateStatus = 0;
				hintValidation(validateStatus, inputParentID, inputType);
			}
			else if(inputLength <= 3){
				validateStatus = -1;
				hintValidation(validateStatus, inputParentID, inputType);
			}
			else{
				validateStatus = 100;
			}
			
		}
		
		return validateStatus;
		
	}
	
	function hintValidation(vCode, inputParentID, inputType){
		
		var hintText;
		
		switch(vCode){
			case 0:
			hintText = "Provide your " + inputType;
			break;
			case -1:
			hintText = inputType + " appears to be too short";
			break;
			case -2:
			hintText = "Provide a valid " + inputType;
			case -3:
			hintText = "Seems to be an invalid " + inputType;
			break;
		}
		
		$("#" + inputParentID).addClass("has-warning");
		$("#" + inputParentID + " input").val("");
		$("#" + inputParentID + " input").attr("placeholder", hintText);
		
	}
	
}

// ajax call -- general
function ajaxCall(ajaxURL, dataString, asyncMode){
	
	var success;
	var duplicate;
	var error;
	
	dataString = decodeURIComponent(dataString);
	
	$.ajax({
		url: ajaxURL + "?" + dataString, async: asyncMode,
		success: function(result){
			result = result.trim();
			var obj = JSON.parse(result);
        	success = obj.success;
			duplicate = obj.duplicate;
			error = obj.error;
		}
	});
	
	return success + "&" + duplicate + "&" + error;
	
}

// function to extract first name out of full name
function extractFirstName(fullName){
	var fName = fullName.split(' ').slice(0, -1).join(' ');
	if(fName == ""){
		return fullName;
	}
	else{
		return fName;
	}
}

// function to extract last name out of full name
function extractLastName(fullName){
	var lName = fullName.split(' ').slice(-1).join(' ');
	return lName;
}

// function to fetch all device param at once and add as one single data string
function deviceParam(){
	
	var device = detectDevice();
	var os = detectOS();
	var browser = detectBrowser();
	var browserLang = detectBrowserLang();
	var resolution = detectResolution();
			
	var dataString = "os=" + os + "&device=" + device + "&browser=" + browser + "&browserLang=" + browserLang + 
					"&resolution=" + resolution; 
	return dataString;
	
}

// function to detect device
function detectDevice(){
	
	var windowWidth = $(window).width(); //retrieve current window width
	var windowHeight = $(window).height(); //retrieve current window height
	
	if(windowWidth >= 992 && windowWidth < 1200){
		return "MD Screen";	
	}
	else if(windowWidth >= 768 && windowWidth < 992){
		return "SM Screen"
	}
	else if(windowWidth >= 1200){
		return "LG Screen";
	}
	else{
		return "XS";
	}
}

// detect Operating System
function detectOS(){
	return navigator.platform; // detects operating system
}

// function to Detect Browser
function detectBrowser(){
	
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var fullVersion  = ''+parseFloat(navigator.appVersion); 
	var majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

	// In Opera 15+, the true version is after "OPR/" 
	if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
 		browserName = "Opera";
 		fullVersion = nAgt.substring(verOffset+4);
	}
	
	// In older Opera, the true version is after "Opera" or after "Version"
	else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
 		browserName = "Opera";
 		fullVersion = nAgt.substring(verOffset+6);
 		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   			fullVersion = nAgt.substring(verOffset+8);
	}
	
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
 		browserName = "Microsoft Internet Explorer";
		fullVersion = nAgt.substring(verOffset+5);
	}

	// In Chrome, the true version is after "Chrome" 
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		browserName = "Chrome";
		fullVersion = nAgt.substring(verOffset+7);
	}

	// In Safari, the true version is after "Safari" or after "Version" 
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		browserName = "Safari";
		fullVersion = nAgt.substring(verOffset+7);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   			fullVersion = nAgt.substring(verOffset+8);
		}

	// In Firefox, the true version is after "Firefox" 
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		browserName = "Firefox";
		fullVersion = nAgt.substring(verOffset+8);
	}

	// In most other browsers, "name/version" is at the end of userAgent 
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) {
		browserName = nAgt.substring(nameOffset,verOffset);
		fullVersion = nAgt.substring(verOffset+1);
		if (browserName.toLowerCase()==browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	}

	// trim the fullVersion string at semicolon/space if present
	if ((ix=fullVersion.indexOf(";"))!=-1)
   		fullVersion=fullVersion.substring(0,ix);
	if ((ix=fullVersion.indexOf(" "))!=-1)
   		fullVersion=fullVersion.substring(0,ix);

	majorVersion = parseInt(''+fullVersion,10);
	
	if (isNaN(majorVersion)) {
 		fullVersion  = ''+parseFloat(navigator.appVersion); 
		majorVersion = parseInt(navigator.appVersion,10);
	}
	
	return browserName;
	
}

// function to detect Browser Language
function detectBrowserLang(){
	return navigator.language; // detects browser language
}

// function to detect Screen Resolution
function detectResolution(){
	
	var windowWidth = $(window).width(); //retrieve current window width
	var windowHeight = $(window).height(); //retrieve current window height
	
	return windowWidth + "X" + windowHeight; 
	
}

// function to detect Screen Resolution Width
function detectResolutionWidth(){
	var windowWidth = $(window).width(); //retrieve current window width
	return windowWidth;
}

// function to detect Screen Resolution Height
function detectResolutionHeight(){
	var windowHeight = $(window).height(); //retrieve current window height
	return windowHeight;
}

$(document).ready(function(){
	
	/* text input focus */
	$(':input').focusin(function(){
		$(this).parent().removeClass("has-warning");
		$(this).attr("placeholder", "");
	});
	
	/* radio button select */
	$('div[type="radioBtn"]').find('span[inherit="rb"]').click(function(){
		
		var getID = $(this).closest('div[type="radioBtn"]').attr("id");
		
		$('#' + getID).find('span[inherit="rb"]').removeClass("talent-radioYes");
		$('#' + getID).find('span[inherit="rb"]').addClass("talent-radioNo");
		
		$(this).addClass("talent-radioYes");
		
	});
	
});