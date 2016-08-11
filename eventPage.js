//handling all ajax calls and returning to content scripts

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	//console.log(request);
    // if(request.html != undefined){
    // 	openProfile(request,sendResponse);
    // 	return true;
    // }
    if(request.name == undefined){
    	//run ID search
		getUser(request,sendResponse);
		return true;
    }
    else if(request.number == undefined){
    	//run name search
		getUser(request,sendResponse);
		return true;
    }
    else{
    	sendResponse("ERROR");
    	return true;
    }
});

function racerSearch(request,sendResponse)
{
	$.getJSON("https://www.usacycling.org/myusac/mypage/ajax/ajax.tools.php","t=interaction&f=search&term="+request.name,function(data)
	{
		if(data.error == 0)
		{
			var rsp = buildReturnHTML(request,data.message);
			var user = {name: request.name, number: undefined, html: rsp};
			sendResponse(user);
		}
	});
}

function getUser(request,sendResponse){
	$.getJSON("https://www.usacycling.org/ajax/ajax.rider_profile.php","compid="+request.number,function(data){		
		console.log(data);	
		if(data.error == 0)
		{
			var rsp = buildReturnHTML(data.message);
			var user = {name: undefined, number: request.number, html: rsp};
			sendResponse(user);
		}		
	});
}

function buildReturnHTML(returnData){
	var returnHTML = "<div class='profile_container'>"+returnData+"</div>";
	return returnHTML;
}