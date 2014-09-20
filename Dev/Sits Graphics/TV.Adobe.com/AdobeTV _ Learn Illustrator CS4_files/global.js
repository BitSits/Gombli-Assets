// ATV Namespace
atv = {};
$(document).ready(function(){
	// Loop through initalitation object
	for(var i in atv.init){
		atv.init[i]();
	}
});

// Setup Main options
atv.options = {};
atv.options.gateway = "/services/ajax.cfc";

// Setup Init object
atv.init = {};

// Setup Browser Class, Avoid Hacks
atv.init.browser = function(){
	if(jQuery.browser.mozilla){
		if(jQuery.browser.version.substring(0,3) == "1.8"){
			$("body").addClass("firefox2");
		} else {
			$("body").addClass("firefox3")
		}
	}
	if(jQuery.browser.msie){
		$("body").addClass("ie"+parseInt(jQuery.browser.version));
	}
	if(jQuery.browser.safari){
		$("body").addClass("safari");
	}
}

// Setup Main Cufon options
atv.init.cufon = function(){
	Cufon.replace('h1,h2,h3,#header .nav .products .dropdown li a, #header .user .name');
};

// Setup Main Nav
atv.nav = {};
atv.nav.focusDropdown = false;
atv.init.nav = function(){
	// Menu Dropdown

	var dropdown = $("#header .main div.products .dropdown");
	var preSlideHeight = dropdown.height();
	$("#header .main div.products a.products").click(function(){return false;}).parent().hoverIntent({    
		 sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
		 interval: 200, // number = milliseconds for onMouseOver polling interval    
		 timeout: 0, // number = milliseconds delay before onMouseOut
		 over: function(){
				if(!dropdown.hasClass("open")){
					dropdown.css("height","0px").css("top","40px").stop().animate({height:preSlideHeight},200,function(){
						$(this).addClass("open");
					});
				}
		},
		out:function(){
			if(!atv.nav.focusDropdown){
				$("#goproducts").blur();
				if(dropdown.hasClass("open")){
					dropdown.stop().animate({height:0},200,function(){
						$(this).css("height",preSlideHeight).css("top","-1000px").removeClass("open");
					});
				}
			}
		}
	});

	$("#goproducts").change(function(){
		location.href = "/product/"+$(this).val()+"/";
	}).focus(function(){
		atv.nav.focusDropdown = true;
	}).blur(function(){
		//setTimeout("atv.nav.focusDropdown=false;",200);
		setTimeout(function(){atv.nav.focusDropdown=false;},200);
	}).mouseout(function(){
		//setTimeout("atv.nav.focusDropdown=false;",200);
		setTimeout(function(){atv.nav.focusDropdown=false;},200);
	});
};

// Setup Global Forms
atv.init.forms = function(){
	$("input.nocomplete").attr("autocomplete","off");
};

// Setup Global Pods
atv.init.pods = function(){
	$(".pods .pod.list.collapsed a.view").click(function(){
		if($(this).hasClass("open")){
			$(this).removeClass("open").parent().parent().find(".episodes").animate({height: "0px"},500);
		} else {
			$(this).addClass("open").parent().parent().find(".episodes").animate({height: "134px"},500);
		}
		return false;
	});

	// Mouseovers
	$(".pods .pod.list .episodes ul li a").mouseover(function(){
		var popElm = $(this).find(".popup");
		if(popElm.length > 0){
			$("#popup").html(popElm.clone()).show();
			Cufon.replace('#popup .title');
		}
		$(this).mousemove();
	}).mousemove(function(e){
		var popup = $("#popup");
		var contentEdge = $("body").width() - (($("body").width()-$("#content").width())/2);
		if((e.pageX+popup.width()) > (contentEdge - 50)){
			popup.addClass("flip").css({'left':(e.pageX-266),'top':(e.pageY-(popup.height()+5))});
		} else {
			popup.removeClass("flip").css({'left':(e.pageX+20),'top':(e.pageY-(popup.height()+5))});
		}
	}).mouseout(function(){
		$("#popup").hide().empty();
	});

	$("body").append('<div id="popup"></div>');
};

// Setup User
atv.user = {};
// Pods
atv.user.addPod = function(id){
	$.get(atv.options.gateway, {method:'addUserPod', returnformat:'json', id:id, user:atv.user.id}, function(){
		humanMsg.displayMsg('Show added to Adobe TV home page');
	});
};
atv.user.removePod = function(id){
	$.get(atv.options.gateway, {method:'removeUserPod', returnformat:'json', id:id, user:atv.user.id}, function(){
		humanMsg.displayMsg('Show removed from Adobe TV home page');
	});
};
// Episodes
atv.user.addEpisode = function(id){
	$.get(atv.options.gateway, {method:'addEpisode', returnformat:'json', id:id, user:atv.user.id}, function(){
		humanMsg.displayMsg('Episode added to My Library');
	});
};
atv.user.removeEpisode = function(id){
	$.get(atv.options.gateway, {method:'removeEpisode', returnformat:'json', id:id, user:atv.user.id}, function(){
		humanMsg.displayMsg('Episode removed from My Library');
	});
};
atv.init.rejectClickSetup = function(){
	$('<div id="tooltip"></div>').appendTo("body");
};
jQuery.fn.extend({ 
	rejectClick: function(message) {
		return this.each(function() {
			jQuery(this).click(function(){
				location.href = 'https://www.adobe.com/cfusion/entitlement/index.cfm?returnurl='+location.href+'&e=adobetv';
				return false;
			}).mouseover(function(){
				var o = jQuery(this).offset();
				var tip = $("#tooltip").html(message);
				tip.css({
						'top':(Math.floor(o.top)-(tip.height()+30)-5),
						'left':(Math.floor(o.left)+6)
					})
					.show();
			}).mouseout(function(){
				$("#tooltip").hide().empty();
			});
		});
	}
});



/******************************
	Global jQuery Plugins
******************************/
/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

/* HUMANIZED MESSAGES 1.0  http://humanmsg.googlecode.com */
var humanMsg={setup:function(appendTo,logName,msgOpacity){humanMsg.msgID='humanMsg';if(appendTo==undefined)
appendTo='body';humanMsg.msgOpacity=.8;if(msgOpacity!=undefined)
humanMsg.msgOpacity=parseFloat(msgOpacity);jQuery(appendTo).append('<div id="'+humanMsg.msgID+'" class="humanMsg"><p></p></div>')},displayMsg:function(msg){if(msg=='')
return;clearTimeout(humanMsg.t2);jQuery('#'+humanMsg.msgID+' p').html(msg)
jQuery('#'+humanMsg.msgID+'').show().animate({opacity:humanMsg.msgOpacity},200)
humanMsg.t1=setTimeout("humanMsg.bindEvents()",700)
humanMsg.t2=setTimeout("humanMsg.removeMsg()",5000)},bindEvents:function(){jQuery(window).mousemove(humanMsg.removeMsg).click(humanMsg.removeMsg).keypress(humanMsg.removeMsg)},removeMsg:function(){jQuery(window).unbind('mousemove',humanMsg.removeMsg).unbind('click',humanMsg.removeMsg).unbind('keypress',humanMsg.removeMsg)
if(jQuery('#'+humanMsg.msgID).css('opacity')==humanMsg.msgOpacity)
jQuery('#'+humanMsg.msgID).animate({opacity:0},500,function(){jQuery(this).hide()})}};jQuery(document).ready(function(){humanMsg.setup();})

/* jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/ * Copyright 2008 George McGinley Smith  * All rights reserved. */
jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});