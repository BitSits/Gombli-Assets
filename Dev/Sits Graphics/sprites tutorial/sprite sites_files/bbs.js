
	// Requires ng.js to be included in the page.
	function CheckBBSSearch()
	{
		var this_selection = GetSelectValue("bbs_search", "kind");
		var this_length = 1;

		if(this_selection == 'b')
		{
			this_length = 4;
		}

		if(GetTextValue("bbsterms").length < this_length)
		{
			var this_message = "Your search terms must be at least " + this_length + " character";
			if(this_length != 1)
			{
				this_message = this_message + "s";
			}
			this_message = this_message + " in length.";

			alert(this_message);
			document.getElementById("bbsterms").focus();
			return;
		}

		var the_location = "/bbs/search/";
		if(GetSelectValue("bbs_search", "kind") == "b")
		{
			the_location += "topic"
		} else
		{
			the_location += "author";
		}
		the_location = the_location + "/" + GetTextValue("bbsterms");

		window.location.href = the_location;
	}

	function DoForumNavbar(forum_id, qualifier, span)
	{
		var new_location = "/bbs/forum/" + forum_id + "/" + GetSelectValue("mainform", "navbar" + qualifier) + "/" + span;
		window.location.href = new_location;
	}

	function DoForumSpan(forum_id, page, qualifier)
	{
		var new_location = "/bbs/forum/" + forum_id + "/" + page + "/" + GetSelectValue('mainform', 'span' + qualifier);
		window.location.href = new_location;
	}

	function ForumJump(which)
	{
		var new_location = GetSelectValue("mainform", "forums" + which);
		if(new_location != -1)
		{
			window.location.href = "/bbs/forum/" + new_location;
		}
	}

	function DoTopicNavbar(thread_id, qualifier)
	{
		window.location.href = "/bbs/topic/" + thread_id + "/" + GetSelectValue("mainform", "page" + qualifier);
	}

	function LookForReferrer(x)
	{
		var this_page, this_span;
		var ref = document.referrer.toLowerCase();
		if((ref.indexOf("newgrounds.com") != -1) && (ref.indexOf("forum.php") != -1))
		{
			var the_href = x.href;
			if(ref.indexOf("page=") != -1)
			{
				this_page = ref.substring(ref.indexOf("page=")+5);
				the_href = the_href + "&page=" + this_page;
			}
			if(ref.indexOf("span=") != -1)
			{
				this_span = ref.substring(ref.indexOf("span=")+5);
				the_href = the_href + "&span=" + this_span;
			}
			window.location.href = the_href;
			return(false);
		}
		return(true);
	}

	function OpenBBSTellFriendWin(topic, url)
	{
		window.open('/tellfriend.php3?title=1&topic=' + escape(topic) + '&url=' + url, 'tfwin', GetHeightWidth(350, 450) + ',location=0,menubar=0,resizable=0,scrollbars=1,status=0,titlebar=0,toolbar=0,hotkeys=0');
	}

	function OpenGoldExplainWin()
	{
		window.open('/gold/explaingold.html', 'explwin', GetHeightWidth(350, 400) + ',location=0,menubar=0,resizable=0,scrollbars=1,status=0,titlebar=0,toolbar=0,hotkeys=0');
	}

	function OpenAuraExplainWin()
	{
		window.open('/gold/explain_aura.html', 'explwin', GetHeightWidth(350, 400) + ',location=0,menubar=0,resizable=0,scrollbars=1,status=0,titlebar=0,toolbar=0,hotkeys=0');
	}

	var xmouse, ymouse, angrystuff, xoffset = 30, yoffset = 30, defaultyoffset = 30, faryoffset = -10000, angrytime = null, is_ie, windowwidth, windowheight, modstuff;
	is_ie = (navigator.userAgent.indexOf("MSIE") > 0);

	function InitAngry()
	{
		angrystuff = document.getElementById('angry').style;
		angrystuff.visibility = "visible";
		document.onmousemove = GetMousePositionAbs;
		yoffset = faryoffset;
	}

	function ShowAngry()
	{
		var flash_writer = new FlashWriter("/bbs/assets/angry_face.swf", 600, 600);
		flash_writer.SetTransparent(true);
	
		document.getElementById('angry').innerHTML = flash_writer.ToString();
		angrystuff.display = "";
		yoffset = defaultyoffset;
	}

	function ImAngry()
	{
		angrytime = window.setTimeout('ShowAngry();', 2000);
	}

	function RecallAngry()
	{
		if(angrytime)
		{
			window.clearTimeout(angrytime);
		}
	}

	function HideAngry()
	{
		// BAD BAD BAD
		// document.getElementById('angry').innerHTML = ".";
		angrystuff.display = "none";
		yoffset=faryoffset;
	}

	function GetMousePositionAbs(e)
	{
		if(document.getElementById)
		{
			if(is_ie)
			{
				xmouse = document.documentElement.scrollLeft;
				ymouse = document.documentElement.scrollTop;
			} else
			{
				xmouse = window.pageXOffset;
				ymouse = window.pageYOffset;
			}
		} else
		{
			return;
		}

		if(window.innerWidth)
		{
			windowwidth = window.innerWidth;
			windowheight = window.innerHeight;
		} else
		{
			windowwidth = document.documentElement.clientWidth;
			windowheight = document.documentElement.clientHeight;
		}

		angrystuff.left = parseInt((windowwidth-600)/2) + "px";
		angrystuff.top = parseInt(ymouse+((windowheight-600)/2)) + "px";
	}

	function InitModPop()
	{
		modstuff = document.getElementById('modholder').style;
		modstuff.visibility = "visible";
		document.onmousemove = GetMousePosition;
		yoffset = faryoffset;
	}

	function GetBan(duration, msg, mod)
	{
		var ourcontent = '<div id="modpop">';
		ourcontent = ourcontent + '<strong>Ends:</strong><p>' + duration + '</p><br clear="left" />';
		ourcontent = ourcontent + '<strong>Reason for Ban:</strong><p>' + msg + '</p><br clear="left" />';
		ourcontent = ourcontent + '<strong>Administered By:</strong><p>' + mod + '</p><br clear="left" />';
		ourcontent = ourcontent + '</div>';

		document.getElementById('modholder').innerHTML = ourcontent;
		modstuff.display = '';
		yoffset = defaultyoffset;
	}

	function GetBR(last, duration, msg, mod)
	{
		var ourcontent = '<div id="modpop">';
		ourcontent = ourcontent + '<strong>Last Ban Ended:</strong><p>' + last + '</p><br clear="left" />';
		ourcontent = ourcontent + '<strong>Duration:</strong><p>' + duration + '</p><br clear="left" />';
		ourcontent = ourcontent + '<strong>Reason for Past Ban:</strong><p>' + msg + '</p><br clear="left" />';
		ourcontent = ourcontent + '<strong>Administered By:</strong><p>' + mod + '</p><br clear="left" />';
		ourcontent = ourcontent + '</div>';

		document.getElementById('modholder').innerHTML = ourcontent;
		modstuff.display = '';
		yoffset = defaultyoffset;
	}

	function HideModStuff()
	{
		document.getElementById('modholder').innerHTML = '&nbsp;';
		modstuff.display = "none";
		yoffset=faryoffset;
	}

	function GetMousePosition(e)
	{
		if(document.getElementById)
		{
			if(is_ie)
			{
				xmouse = document.documentElement.scrollLeft+window.event.clientX;
				ymouse = document.documentElement.scrollTop+window.event.clientY;
			} else
			{
				xmouse = e.pageX;
				ymouse = e.pageY;
			}
		} else
		{
			return;
		}

		modstuff.left = parseInt(xmouse+xoffset) + "px";
		modstuff.top = parseInt(ymouse-yoffset) + "px";
	}

	function ScrollToOnline()
	{
		new Effect.ScrollTo("whoisonline");
	}