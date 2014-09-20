atv.show = {};
atv.init.show = function(){
	// Mouseovers
	$("table tbody tr").each(function(){
		$(this).find("td:first").mouseover(function(){
			var popElm = $(this).find(".popup");
			var offset = $(this).offset();
			if(popElm.length > 0){
				$("#popup").html(popElm.clone()).show();
				Cufon.replace('#popup .title');
			}
		}).mousemove(function(e){
			$("#popup").css({'left':(e.pageX+20),'top':(e.pageY-($("#popup").height()+5))});
		}).mouseout(function(){
			$("#popup").hide().empty();
		});
	 });

	// User Library & Home Functions
	if(atv.user.signedin){
		$("#content .masthead a.addtohome").click(function(){
			if($(this).hasClass("save")){
				atv.user.addPod($(this).attr("rel"));
				$(this).removeClass("save").addClass("remove");
			} else {
				atv.user.removePod($(this).attr("rel"));
				$(this).removeClass("remove").addClass("save");
			}
			return false;
		});

		$(".list table td a.library").click(function(){
			if($(this).hasClass("save")){
				atv.user.addEpisode($(this).attr("rel"));
				$(this).removeClass("save").addClass("remove");
			} else {
				atv.user.removeEpisode($(this).attr("rel"));
				$(this).removeClass("remove").addClass("save");
			}
			return false;
		});
	} else {
		$("#content .masthead a.addtohome").rejectClick("<h3>Please Sign In</h3> Save shows to your Adobe TV home page by signing in.");
		$(".list table td a.library").rejectClick("<h3>Please Sign In</h3> Save episodes to My Library by signing in.");
	}
};