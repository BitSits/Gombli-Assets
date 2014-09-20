function getElementsByClassName(classname,node){var a=[];var re=new RegExp('(^| )'+classname+'( |$)');var els=node.getElementsByTagName("*");for(var i=0,j=els.length;i<j;i++)
if(re.test(els[i].className))a.push(els[i]);return a;}
function widont(str){return str.replace(/([^\s])\s+([^\s]+)\s*$/,'$1&nbsp;$2');}
function prepareTools(){if(!document.getElementById('widgets'))return;if(getElementsByClassName('tabs',document.getElementById('widgets')).length==0)return;var tabUnits=getElementsByClassName('tabs',document.getElementById('widgets'));for(var x=0;x<tabUnits.length;x++){var tabs=getElementsByClassName('tab',tabUnits[x]);for(var y=0;y<tabs.length;y++){if(tabs[y].getAttribute('uclick')){tabs[y].getElementsByTagName('h4')[0].onclick=function(){toggleTabs(this.parentNode);var i=new Image();i.src='http://clk.about.com?zi='+this.parentNode.getAttribute('uclick')+'&sdn='+gs+'&tt='+zTt+'&bts='+zBTS;};}else{tabs[y].getElementsByTagName('h4')[0].onclick=function(){toggleTabs(this.parentNode);};}
tabs[y].getElementsByTagName('h4')[0].className="t"+y;(y==0)?tabs[y].className='tab current':tabs[y].className='tab under';}}}
function toggleTabs(show){var parent=show.parentNode;var tabs=getElementsByClassName('tab',parent);for(var x=0;x<tabs.length;x++){var y=tabs[x];y.className='tab under';}
show.className='tab current';}
function zTglc(obj,c){
	if(obj.className) {
		if(obj.className==c) {
			obj.className='';
		} else {
			if(obj.className.match(' '+c)) {
				obj.className=obj.className.replace(' '+c,'');
			} else {
				obj.className=obj.className+' '+c;
			}
		}
	} else {
		obj.className=c;
	}
}
function zCi(){var input=document.body.getElementsByTagName("input");for(var i=0;i<input.length;i++){if(input[i].type=='text'&&input[i].value!=''){if(!input[i].getAttribute('autoclear'))continue;input[i].v=input[i].value;input[i].onfocus=function(){if(this.value==this.v){this.value='';}}
input[i].onblur=function(){if(this.value==''){this.value=this.v;}}}}}

var validationFunctions=new Object();
	validationFunctions["required"]=isReq;
	validationFunctions["pattern"]=isPat;
	validationFunctions["numeric"]=isNum;
	validationFunctions["email"]=isEmail;
	validationFunctions["match"]=isMatch;
	validationFunctions["minmax"]=isMinMax;
	
var errorMessages=new Object();
	errorMessages["required"]="This field is required.";
	errorMessages["pattern"]="This field is required.";
	errorMessages["numeric"]="Please enter only numbers into this field.";
	errorMessages["email"]="Please enter a valid email address.";
	errorMessages["match"]="This field must match its counterpart.";
	errorMessages["minmax"]="Please answer within the specified range of characters.";

function isReq(formField){
	switch(formField.type){
		case'file':
		case'hidden':
		case'text':
		case'textarea':
		case'select-one':
			if(formField.value) return true;
			return false;
		case'radio':
			var radios=formField.form[formField.name];
			for(var i=0;i<radios.length;i++){if(radios[i].checked)return true;}
			return false;
		case'checkbox':
			return formField.checked;
	}
}

function isPat(formField,pattern){
	var pattern=pattern||formField.getAttribute('pattern');
	var regExp=new RegExp("^"+pattern+"$","");
	var correct=regExp.test(formField.value);
	if(!correct&&formField.getAttribute('patternDesc'))correct=formField.getAttribute('patternDesc');
	return correct;
}

function isNum(formField){return isPat(formField,"\\d+");}

function isEmail(formField){return isPat(formField,"[\\d\\w._%+-]+@[\\d\\w.-]+\\.[\\w]{2,4}");}

function isMatch(formField){
	var twin = formField.getAttribute("twin");	
	var p = formField.parentNode;
	while(p.nodeName!='FORM'){
		var p = p.parentNode;
	}
	var x = p.elements;
	for(var i=0;i<x.length;i++){
		if(x[i].name==twin){
			if(x[i].value==formField.value){
				return true;
			} else {
				return false;
			}
			break;
		}
	}
}

function isMinMax(formField){
	var range = formField.getAttribute("range");
	range = range.split(",");
	errorMessages["minmax"]="Your entry must be between "+range[0]+" and "+range[1]+" characters.";
	return isPat(formField,"(.|\n|\r|\t){"+range[0]+","+range[1]+"}");
}

function createCounter(elem){
	var range = elem.getAttribute("range");
	range = range.split(",");
	var y = document.createTextNode(range[1]+'-character limit');
	var max = document.createElement('p');
	max.id = elem.id+"_max";
	max.className = "maxinfo alert";
	max.appendChild(y);
	elem.parentNode.insertBefore(max,elem.nextSibling);
	if(range[0]>1){
		var x = document.createTextNode(range[0]+'-character minimum');
		var min = document.createElement('p');
		min.id = elem.id+"_min";
		min.className = "mininfo alert";
		min.appendChild(x);
		elem.parentNode.insertBefore(min,elem.nextSibling);
	}
	
	elem.onkeypress = elem.onchange = function(){
		var range = this.getAttribute("range");
		range = range.split(",");
		if(this.value.length<range[1]){
			gEI(elem.id+"_max").innerHTML=(range[1]-this.value.length)+" characters left";
		}else{
			gEI(elem.id+"_max").innerHTML="You have reached the character limit";
			this.value=this.value.substring(0,range[1]);
		}
	};
}

var W3CDOM=document.createElement&&document.getElementsByTagName;

function validateForms(){
	if(!W3CDOM) return;
	var forms=document.forms;
	for(var i=0;i<forms.length;i++){
		if(!forms[i].onsubmit) forms[i].onsubmit = function(){return validate(this)};
	}
}

function validate(form){
	var t = form || this;
	var els=t.elements;
	var validForm=true;
	for(var i=0;i<els.length;i++){
		els[i].className=els[i].className.replace(/invalid/,'');
		var req=els[i].getAttribute('validate');
		if(!req || els[i].getAttribute('disabled')) continue;
		var OK=validationFunctions[req](els[i]);
		if(OK!=true){
			els[i].className+=' invalid';
			validForm=false;
			message=(els[i].getAttribute('alert'))?els[i].getAttribute('alert'):errorMessages[req];
			form.focus();
			break;
		}
	}
	if(!validForm){alert(message);}
	return validForm;
}


function HttpRequest(url,method,formData){
if(method==null){method='GET';}
var pageRequest=false;
if(window.XMLHttpRequest)
pageRequest=new XMLHttpRequest()
else if(window.ActiveXObject){try{pageRequest=new ActiveXObject("Msxml2.XMLHTTP")}
catch(e){try{pageRequest=new ActiveXObject("Microsoft.XMLHTTP")}
catch(e){}}}
else
return false
if(pageRequest){
	pageRequest.open('GET',url,false);
	if(method=="POST"){pageRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');}
	pageRequest.send(formData);
	return pageRequest;
}}

var zIfw=self.innerWidth?self.innerWidth:(document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:(document.body?document.body.clientWidth:0));var thin=(zIfw<850)?1:0;

function check_modal(){
	var a = gEI('abc').getElementsByTagName('a');
	for(var i=0;i < a.length;i++) {
		if(a[i].target == "modal"){
			if(navigator.appName == "Microsoft Internet Explorer"){
				a[i].link = a[i].href;
				a[i].onclick = function(){
					zpu(0,this.link,404,300,"modal");
				}
				a[i].href = "javascript:void(0)";
			} else {
				a[i].onclick = function(){
					return prep_modal(this.href);
				}
			}
		}
	}
	return;
}

function createOverlay(className){
	var o=document.createElement('div');
	o.id='oL';
	if(className) o.className=className;
	o.style.height=window.document.body.scrollHeight+"px";
	document.body.appendChild(o);
	return o;
}

function prep_modal(url,olc){
	var i = document.createElement('iframe');
	i.src = url;
	i.scrolling = "no";
	i.frameborder = "0";
	i.className = i.name = i.id = "modf";
	i.style.visibility = "hidden";
	i.onload = function(){
		i.style.height = i.contentWindow.document.body.scrollHeight + "px";
		i.style.left = ((zIfw/2)-((i.clientWidth+2)/2))+"px";
		i.style.top = ((zIfh/2)-((i.clientHeight+2)/2))+"px";
		i.style.visibility = "visible";
	}
	document.body.appendChild(i);
	o = createOverlay(olc);
	o.onclick = function(){hide_modal(i)};
	return false;
}

function hide_modal(i){
	if(!i) i = gEI('modf');
	if(!i) return;
	document.body.removeChild(gEI("oL"));
	document.body.removeChild(i);
}
	
function do_logout(A,P){
	var i = document.createElement('iframe');
	i.src = A;
	i.scrolling = "no";
	i.frameborder = "0";
	i.style.display = "none";
	document.body.appendChild(i);
	change_login_state('0',P);
	return false;
}

function change_login_state(x,product){
	if(!gEI('lis')) return;
	if(!x){x = 1;}
	var label = gEI('lis').getElementsByTagName('label')[0];
	var info = gEI('m_login');
	var name = gEI('m_name');
	var mail = gEI('m_mail');
	if(readCookie('LK')){
		var c = readCookie('LK');
		var z = c.split('&');
		minfo = new Array();
		for(var i=0;i < z.length;i++) {
			var y = z[i].split('=');
			minfo[y[0]] = y[1];
		}
		if(x==1){
			label.innerHTML = 'Membername';
			info.innerHTML = '(If you\'re not <span>'+minfo['CN']+'</span>, <a href="http://membership.about.com/memreg?action=logoff&successurl='+window.location+'&surlanchor=%23lis&cob='+gs+'&product='+product+'" onclick="return do_logout(this.href,\''+product+'\');">click here</a>)';
			name.value = minfo['CN'];
			name.className = 'logged_in';
			name.readOnly = true;
			if(mail){mail.value = minfo['mail'];mail.className = 'logged_in';}
		}
	}
	if(x==0){
		label.innerHTML = 'Guest Name<em title="Required field">*</em>';
		info.innerHTML = '<a href="http://betahome.about.com/gi/pages/login.htm" onclick="return prep_modal(this.href);">Login with Membername</a> or <a href="http://login.about.com/registration.htm?successurl='+window.location+'&surlanchor=%23lis&cob='+gs+'&product='+product+'">Register</a>';
		name.value = name.className = '';
		name.readOnly = false;
		if(mail){mail.value = mail.className = '';}
	}
	return;	
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function splitList(obj,n){
	if(obj.nodeName != 'OL' && obj.nodeName != 'UL'){return;}
	if(!n){n=2;}
	var div = document.createElement('div');
	if(obj.id) div.id=obj.id;
	if(obj.className) div.className=obj.className;
	var lists=new Array();
	var li = obj.getElementsByTagName('li');
	var x = Math.ceil(li.length/n);
	for(var a=0;a<n;a++){
		var y = document.createElement(obj.nodeName);
		y.className = obj.className;
		if(obj.nodeName=='OL'){y.start=(a*x)+1}
		zTglc(y,'col'+(a+1));
		for(var b=0;b<x;b++){
			if(obj.getElementsByTagName('li')[(a*x)+b]){
				var z = obj.getElementsByTagName('li')[(a*x)+b].cloneNode(true);
				y.appendChild(z);
			}
		}
		lists.push(y);
	}
	for(var c=0;c<lists.length;c++){
		div.appendChild(lists[c]);
	}
	obj.parentNode.appendChild(div);
	obj.parentNode.removeChild(obj);
}

function browseInit(){var obj=gEI('browse');if(!obj||!gEI('fp'))return;gEI('abw').insertBefore(obj,gEI('fp'));obj.className='';var list=gEI('clist');if(!list) return;list.className='hide';splitList(list.getElementsByTagName('ul')[0]);var ctrl=gEI('cctrl');var cntnr=gEI('cats');function tglCats(){zTglc(cntnr,'on');zTglc(list,'hide');if(!gEI('oL')){var o=createOverlay();o.onclick=tglCats;}else{gEI('abw').removeChild(gEI('oL'));}}
ctrl.onclick=tglCats;}

function drawer(args){
	//kill the script if a target wasn't specified
	if(!args['element']) return;
	//default values of arguments
	var dargs = {
		'element'	:	null,
		'uclick'	:	null,
		'open'		:	0,
		'moveTime'	:	500,
		'moveFreq'	:	100,
		'minHeight'	:	null,
		'maxHeight'	:	null
	}
	//overwrite default values if they're set in the constructor
	for(var index in dargs) {
		if(typeof args[index] == "undefined") args[index] = dargs[index];
	}
	var self = this; //solves loss-of-scope problem
	this.ele=args['element'];
	this.ele.className+=this.ele.className?' slider':'slider';
	this.uclick = args['uclick'];
	this.moveTime=args['moveTime'];
	this.moveFreq=args['moveFreq'];
	this.moving=false;
	this.timerID=0;
	this.startTime=0;
	this.minHeight=this.currHeight=args['minHeight'] || this.ele.clientHeight;
	this.maxHeight=args['maxHeight'] || this.ele.scrollHeight;
	this.interval=(this.maxHeight-this.minHeight)/(this.moveTime/this.moveFreq);
	//alert(this.minHeight+' '+this.maxHeight+' '+this.interval);
	this.dir=args['open'];
	this.token=false;
	if(this.dir==1){
		this.ele.className+=this.ele.className?' expand':'expand';
		this.currHeight=this.maxHeight;
		this.ele.style.height=this.currHeight+"px";
	}
	var elements = this.ele.getElementsByTagName("*");
	for(var i=0;i<elements.length;i++){
		//apply the slide function (& drop a pixel if uclick is set) to any elements inside the target with a 'rel="control"' attribute
		if(elements[i].getAttribute('rel')=='control'){
			elements[i].onclick=function() {
				if(self.uclick){var i=new Image();i.src='http://clk.about.com?zi='+self.uclick+'&sdn='+gs+'&cdn='+ch+'&tt=19&zTi=1';}
				return self.execute();
			}
			elements[i].style.cursor="pointer";
		}
	}
	this.slide=function() {
		if(self.dir==1) {
			self.currHeight+=self.interval;
		} else {
			self.currHeight-=self.interval;	
		}
		self.ele.style.height=self.currHeight+"px";
		var elapsed=(new Date()).getTime() - self.startTime;
		if(elapsed>=self.moveTime) {
			clearInterval(self.timerID);
			//alert(self.ele.style.height);
			self.currHeight=(self.dir==1)?self.maxHeight:self.minHeight;
			self.ele.style.height=self.currHeight+"px";
			self.moving=false;
			if(self.dir==0){
				var x=self.ele.className.match(' expand')?' expand':'expand';
				self.ele.className=self.ele.className.replace(x,'');
			}
		}
		return;
	}
	this.execute=function(){
		//only execute if an animation is not in progress
		if(!this.moving) {
			if(this.ele.style.height==this.maxHeight+"px") {
				this.dir=0;
			} else {
				this.dir=1;
				//apply a class to the target for unique styling
				this.ele.className+=this.ele.className?' expand':'expand';
			} 
			this.startTime=(new Date()).getTime();
			this.moving=true;
			var self = this;
			this.timerID=setInterval(self.slide,this.moveFreq);
		}
		return false;
	}
}

function formData2QueryString(docForm) {

  var submitContent = '';
  var formElem;
  var lastElemName = '';
  
  for (i = 0; i < docForm.elements.length; i++) {
    
    formElem = docForm.elements[i];
    switch (formElem.type) {
      // Text fields, hidden form elements
      case 'text':
      case 'hidden':
      case 'password':
      case 'textarea':
      case 'select-one':
        submitContent += escape(formElem.name) + '=' + escape(formElem.value) + '&'
        break;
        
      // Radio buttons
      case 'radio':
        if (formElem.checked) {
          submitContent += escape(formElem.name) + '=' + escape(formElem.value) + '&'
        }
        break;
        
      // Checkboxes
      case 'checkbox':
        if (formElem.checked) {
          // Continuing multiple, same-name checkboxes
          if (formElem.name == lastElemName) {
            // Strip of end ampersand if there is one
            if (submitContent.lastIndexOf('&') == submitContent.length-1) {
              submitContent = submitContent.substr(0, submitContent.length - 1);
            }
            // Append value as comma-delimited string
            submitContent += ',' + escape(formElem.value);
          }
          else {
            submitContent += escape(formElem.name) + '=' + escape(formElem.value);
          }
          submitContent += '&';
          lastElemName = formElem.name;
        }
        break;
        
    }
  }
  // Remove trailing separator
  submitContent = submitContent.substr(0, submitContent.length - 1);
  return submitContent;
}

function jsi(src){
  var scriptElem = document.createElement('script');
  scriptElem.setAttribute('src',src);
  scriptElem.setAttribute('type','text/javascript');
  document.getElementsByTagName('head')[0].appendChild(scriptElem);
}

function addEventSimple(obj,evt,fn){
	if(obj.addEventListener){
		obj.addEventListener(evt,fn,false);
	} else if(obj.attachEvent){
		obj.attachEvent('on'+evt,fn);
	}
}

// TEMPORARY: Moves Sub-cats from top of Cat page to bottom
//function zImsc(){
//	if(zIlinks.length==1) return;
//	var cgScL = gEI('cgScL');
//	if(cgScL.getElementsByTagName('a').length==0) return;
//	var cgAr = gEI('cgAr');
//	var c = document.getElementsByTagName('h1')[0].innerHTML;
//	cgAr.appendChild(cgScL);
//	cgScL.innerHTML = '<p>Browse More: '+c+'</p>'+cgScL.innerHTML;
//	cgScL.className = 'alt';
//	cgAr.className = 'alt';
//	gEI('cgSc').className = 'alt';
//}
