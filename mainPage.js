//MainPage JS

$(document).ready(function(){
	$("#topnav").append("<li id='member_search'><input type='text' name='search' placeholder='Find Member By ID'><input id='extension_submit' type='submit' value='Search'></li>");

	$("#extension_submit").click(function(){
		closeProfile();
		var user = {name: undefined, number: undefined, html: undefined};

		var enteredText = $(":text").val();
		
		if ($.isNumeric(enteredText)){
			user.number = enteredText;
		}
		else{
			user.name = enteredText;
		}

		chrome.runtime.sendMessage(user, function(response) {
  			var user = {name: response.name, number: response.number, html: response.html};
  			buildUserPopup(user);
		});
	});
});

function buildUserPopup(user){
	//empty gallery
	//insert profile
	$("#gallery #slider").hide();
	$("#gallery #slider-controls").hide();
	$("#next").hide();
	$("#prev").hide();

	$("#gallery").append("<div class='profile_container'></div>");
	$("#gallery").append(user.html);
	$(".profile_container style").remove();
	//$(".profile_container #profile_close").remove();

	if($("#profile_close").length){
		$("#profile_close").html("<div class='close_btn'><button>CLOSE</button></div>");
	}
	else{
		$(".profile_container a").html("<div class='close_btn'><p></p><button>CLOSE</button></div>");
	}

	$(".close_btn").click(function(){
		closeProfile();	
	});

}

function closeProfile(){
	$(".profile_container").remove();
	$("#gallery #slider").show();
	$("#gallery #slider-controls").show();
	$("#next").show();
	$("#prev").show();
}

