
var statwait = 4000;
	function searchDialog()
	{
		$.getJSON("/myusac/mypage/ajax/ajax.tools.php","t=interaction&f=searchdialog",function(data)
		{
			if(data.error == 0)
			{
				$('#genericDialog').html(data.message);
				$('#genericDialog').dialog({title:"Search for Riders"});
			}
		});
	}
	function racerSearch()
	{
		var term = $('#txtRiderSearch').val();
		$.getJSON("/myusac/mypage/ajax/ajax.tools.php","t=interaction&f=search&term="+term,function(data)
		{
			if(data.error == 0)
			{
				$('#searchResults').html(data.message);
			}
		});
	}
	function riderActivity()
	{
		
		$.getJSON("/myusac/mypage/ajax/ajax.tools.php","t=interaction&f=activity",function(data)
		{
			$('#raceractivity').html(data.message);
		});
	}
	function followList()
	{
		$.getJSON("/myusac/mypage/ajax/ajax.tools.php","t=interaction&f=followlist",function(data)
		{
			$('#following_list').html(data.message);
		});
	}
	function followingList()
	{
		$.getJSON("/myusac/mypage/ajax/ajax.tools.php","t=interaction&f=followinglist",function(data)
		{
			$('#following_list').html(data.message);
		});
	}
	function followRider(c)
	{
		$.getJSON("/myusac/mypage/ajax/ajax.tools.php","t=interaction&f=follow&c="+c,function(data)
		{
			$('#genericDialog').html(data.message + "<center><button onclick=\"$('#genericDialog').dialog('close');\">Close</button></center>");
			followList();
		});
	}
	function saveActivity()
	{
		var activity = $('#taMyActivity').val();
		$.getJSON("/myusac/mypage/ajax/ajax.tools.php","t=interaction&f=saveactivity&activity="+activity,function(data)
		{
			if(data.error == 0)
			{
				//Show the status in an overlay
				displayStat("personalactivity","<span class='message'>"+data.message+"</span>",'show');
				setTimeout("displayStat('personalactivity','','hide')",statwait);
				$('#taMyActivity').val("");
				$('#dvRemaining').html("");
			}
			else
			{
				alert(data.message);
			}
		});
	}
	function unFollow(i)
	{
		$.getJSON("/myusac/mypage/ajax/ajax.tools.php","t=interaction&f=unfollow&c="+i,function(data)
		{
			$('#genericDialog').html(data.message + "<center><button onclick=\"$('#genericDialog').dialog('close');\">Close</button></center>");
			followList();
		});
	}
	function blockFollower(i)
	{
		alert("Blocking a follower will only hide your timeline from within their rider interaction tool.\n If you would rather hide it from everyone, choose \"Hide Timeline\" \n from within the Timeline tools configuration tab.");
		$.getJSON("/myusac/mypage/ajax/ajax.tools.php","t=interaction&f=block&c="+i,function(data)
		{
			if(data.error == 0)
			{
				$('#follower_list').html(data.message);
			}
			else
			{
				alert(data.message);
			}
		});
	}
	function thumbsUp(i,t,c)
	{
		$.getJSON("/myusac/mypage/ajax/ajax.tools.php","t=interaction&f=thumbsup&type="+t+"&c="+i+"&owner="+c,function(data)
		{
			//$('#thumbs_up_'+i).attr("src","/images/thumbsup_complete.png");
			if(data.message > 1)
			{
				$('#tu_'+i).html(data.message + " likes");
			}
			else
			{
				$('#tu_'+i).html(data.message + " like");
			}
		});
	}
	$(document).ready(function(){
		riderActivity();
		$('#taMyActivity').click(function(){
			var text = $(this).val();
			if(text == "Add your own message to your timeline."){
				$(this).val("");
			}
		});
		$('#taMyActivity').keypress(function(e) {
    		var tval = $('#taMyActivity').val(),
        	tlength = tval.length,
        	set = 140,
        	remain = parseInt(set - tlength);
    		$('#dvRemaining').text(remain + " Characters remaining");
    		if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
        		$('#taMyActivity').val((tval).substring(0, tlength - 1))
    		}
		})
	});
