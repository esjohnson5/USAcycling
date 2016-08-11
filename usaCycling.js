

$(document).ready(function(){

	$("#mp_toolbar_left").append("<input type='text' name='search' placeholder='Find Member By ID'>");
	$("#mp_toolbar_left").append("<input type='submit' value='Search'>");
	$("#mpWidgetsRightCol").css('width','65%');
	$("#mpWidgetContainer .column").css('float',"right");
	$("#mpOverlay").hide();
	//$("#mem_account").remove();
	$(":submit").click(function(){
		var idNum = $(":text").val();
		console.log(idNum);  
		getUser(idNum);
	});
	getFollowList();
});

function getUser(userId){
	$.getJSON("/ajax/ajax.rider_profile.php","compid="+userId,function(data){			
		if(data.error == 0)
		{
			console.log(data.message);
			$("#mpWidgetsRightCol div").hide();
			$("#mpWidgetsRightCol").append("<div class='profile_container'></div>");
			//$(".profile_container").hide();
			$(".profile_container").html(data.message);
			
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
	});
}

function closeProfile(){
	$(".profile_container").remove();
	$("#mpWidgets div").show();
	$("#mpOverlay").hide();
}

function getFollowList(){
	$.getJSON("/myusac/mypage/ajax/ajax.tools.php","t=interaction&f=followlist",function(data)
	{
		$("#mpWidgetsLeftCol").html("<div class='following_container'></div>");
		$("#mpWidgetsLeftCol").css('width','35%');
		$(".following_container").hide();
		$(".following_container").html(data.message);
		//get text data
		//var stopFollowing = $(".following_container .following a").html();

		chrome.runtime.sendMessage(data.message, function(response) {
  			console.log(response.farewell);
		});
		
		var list = $('<ul></ul>');
		$(".following_container .following").each(function(){
			var userName = $(this).text();
			var item = $('<li></li>');
			item.text(userName);
			list.append(item);
		});
		$(".following_container").empty();
		$(".following_container").append("<div class='user_following'></div>");
		$(".user_following").append(list);

		//delete divs
		//$(".following_container").empty();

		//relace text
		$(".following_container").show();
		$("#mpOverlay style").remove();
		console.log(userFollower);
	});
}

