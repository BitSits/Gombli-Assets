/************ don't modify below this line *********
 ************  Version: OnExit 7.2 [Updated 5/14/08]*
 ****** Copyright 2001-2008 ForeseeResults, Inc****/
var popupURL = "//www.foreseeresults.com/survey/display";	
var FSRImgURL= "//www.foreseeresults.com/survey/FSRImg"; 	
var CSURL= "//www.foreseeresults.com/survey/processCPP"; 	
var OTCImgURL = "//controller.foreseeresults.com/fsrSurvey/OTCImg";
var fullURL="";
var winOptions = "toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=1,height=1,top=4000,left=4000";
var ckAlreadyShown = triggerParms["ascookie"];
var ckLoyaltyCount = triggerParms["lfcookie"];
var surveyPresentedBy = "normal";
var persistentExpires = new Date();
persistentExpires.setTime(persistentExpires.getTime() + (triggerParms["rw"]*60*1000));
var detect = navigator.userAgent.toLowerCase();
var version= navigator.appVersion.toLowerCase();
var fsr_aol= ((detect.indexOf("aol") >=0) || (detect.indexOf("america online browser") >=0)) ? 1 : 0;
var fsr_opera = (detect.indexOf("opera") >=0) ? 1 : 0;
var fsr_mac= (navigator.platform.indexOf("Win32") < 0) ? 1 : 0;
var fsr_NS = ((detect.indexOf("netscape") >=0) || (detect.indexOf("firefox") >=0)) ? 1 : 0;
var fsr_NS8=(detect.indexOf("netscape/8") >=0) ? 1 : 0;	
var fsr_NS70=(detect.indexOf("netscape") >= 0 && detect.indexOf("7.0") >= 0) ? 1 : 0;
var fsr_NS62=(detect.indexOf("netscape") >= 0 && detect.indexOf("6.2") >= 0) ? 1 : 0;
var fsr_safari=(detect.indexOf("safari") >=0) ? 1 : 0;
var fsr_safari_2_x=(fsr_mac && detect.indexOf("safari") >=0 && detect.indexOf("412") >= 0) ? 1 : 0;
var fsr_ie=(detect.indexOf("msie")>=0 && version.indexOf("win") != -1) ? 1 :0;
var fsr_sp2=(navigator.appMinorVersion && navigator.appMinorVersion.toLowerCase().indexOf('sp2') != -1) ? 1 : 0
if (fsr_ie && fsr_sp2) triggerParms["sMode"] = 0;
var flash_version= 4;
var canFlashPlay=0;
var PROCESS_RSID=1;	
var PROCESS_CPP=2;	
if (fsr_ie && triggerParms["flashDetect"] == 1) {
document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
document.write('on error resume next \n');
document.write('canFlashPlay = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & flash_version)))\n');
document.write('</SCR' + 'IPT\> \n');
}
function cppUrlPatch(s) {
var translated = "";
var i; 
var found = 0;
for(i = 0; (found = s.indexOf(':', found)) != -1; ) {
translated += s.substring(i, found) + "|";
i = found + 1;
found++;
}
translated += s.substring(i, s.length);
return translated;
}
function ForeCStdGetCookie (name) {
var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
while (i < clen) {
var j = i + alen;
if (document.cookie.substring(i, j) == arg) {
return ForeCStdGetCookieVal (j);
}
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) {
break;
}
}
return null;
}
function ForeCStdSetCookie (name, value) {
var argv = ForeCStdSetCookie.arguments;
var argc = ForeCStdSetCookie.arguments.length;
var expires = (argc > 2) ? argv[2] : null;
var path = (argc > 3) ? argv[3] : null;
var domain = (argc > 4) ? argv[4] : null;
var secure = (argc > 5) ? argv[5] : false;
document.cookie = name + "=" + escape (value) +
((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
((path == null) ? "" : ("; path=" + path)) +
((domain == null) ? "" : ("; domain=" + domain)) +
((secure == true) ? "; secure" : "");
}
function ForeCStdGetCookieVal(offset) {
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1) {
endstr = document.cookie.length;
}
return unescape(document.cookie.substring(offset, endstr));
}
function fsrOnUnload(){
if (triggerParms["oeMode"] == 1) {
if (ForeCStdGetCookie('currentURL') != null ||
ForeCStdGetCookie('currentURL') != 'blank') {ForeCStdSetCookie('previousURL',ForeCStdGetCookie('currentURL'), null,'/',triggerParms['domain']);}
ForeCStdSetCookie('currentURL', 'blank', null,'/',triggerParms['domain']);
}
}
function fsrOnUnloadTracker(){
if(triggerParms["dhtmlWinRep"] == 0) {
ForeCStdSetCookie(triggerParms["scout_chk"], "ScoutClosed", null,"/",triggerParms["domain"]);
}
}
function specialEscape(str) {
var translated = "";
var i; 
var found = 0;
for(i = 0; (found = str.indexOf('+', found)) != -1; ) {
translated += str.substring(i, found) + "%2B";
i = found + 1;
found++;
}
translated += str.substring(i, str.length);
return translated;
}
function setFSRSurveyCookie() {
if(triggerParms["npc"] == 1) {
ForeCStdSetCookie(ckAlreadyShown, 'true',null,"/",triggerParms["domain"]);
} else {
ForeCStdSetCookie(ckAlreadyShown, 'true', persistentExpires,"/",triggerParms["domain"]);
}
}
function setVisualSciencesId(theURL) {
var VisualSciencesId = ForeCStdGetCookie("v1st");
if(VisualSciencesId != null && VisualSciencesId != "")
{
triggerParms["cpp_4"] = "VisualSciencesId:" + escape(VisualSciencesId);	
}
}
function setOmnitureId(theURL) {
var OmnitureId = ForeCStdGetCookie("s_foreSeeId");
if(OmnitureId != null && OmnitureId != "")
{
triggerParms["cpp_0"] = "OmnitureId:" + escape(OmnitureId);	
}
}
function checkFlashParms(tagName){
tagName = tagName.toLowerCase();
for(key in flashTagList) {
if(tagName.indexOf(flashTagList[key]) != -1) {
return true;
}
}
return false;
}
function fsr_detectFlash(){
if (fsr_ie){
var obj = document.all.tags("OBJECT");
for (var e=0; e<obj.length;e++){
for (var d=0; d<obj[e].attributes.length;d++){
if ((obj[e].attributes[d].name).toLowerCase() == "classid") {
if (checkFlashParms(obj[e].attributes[d].value)){
return true;
}
else {
return false;
}
}
}
}
}					    
else{
for (var e=0; e<document.embeds.length;e++){
if (checkFlashParms(document.embeds[e].src)) {
return true;
}
}
}
return false;
}
function isValidFlash(){
if (triggerParms["flashDetect"]==1){
if (fsr_detectFlash()){
var fsr_opera75 = (detect.indexOf("opera 7.54u1") >=0) ? 1 : 0;
if (fsr_NS)
flash_version=7;	
if (fsr_mac)
flash_version=8;	
var plugin=(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"]?navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin:0);
if (plugin && parseInt(plugin.description.substring(plugin.description.indexOf(".")-1))>=flash_version) 
{ canFlashPlay=1; }
if ((plugin ==0 || plugin==null) && !canFlashPlay){
triggerParms["displayMode"]=1;		
}
else {
if ((fsr_NS && canFlashPlay) || (!fsr_opera75 && canFlashPlay)){
if (triggerParms["displayMode"] != 2){
return true;		
}
}
triggerParms["displayMode"]=2;		
}
}
}
if (triggerParms["displayMode"] >0){
triggerParms["dhtmlDelay"]= 1000;	
return true;
}
return false;
}
function loadWait(){
document.write("<B>Survey is loading. Please wait...</B>");
}
function oePoll() {
var randNum = Math.random()*100;
var stickyCounter = ForeCStdGetCookie(ckLoyaltyCount); 
var alreadyShown = ForeCStdGetCookie(ckAlreadyShown); 
var pageCount;
if (stickyCounter == null) {
pageCount = 1;
ForeCStdSetCookie(ckLoyaltyCount, pageCount, null,'/',triggerParms["domain"]);
stickyCounter = ForeCStdGetCookie(ckLoyaltyCount);
}
if (stickyCounter != null) {
pageCount = stickyCounter;
if(arguments.length == 1 || pageCount >= triggerParms["dLF"]) {
if(alreadyShown == null) {				
if(randNum <= triggerParms["spE"]) {
var winOptions = "toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=1,height=1,top=4000,left=4000";
fsrSetFullURL();
fullURL += fsrGetCPP();
setFSRSurveyCookie();
if (triggerParms["sMode"] != 1 || !fsr_NS8) { loadWait();}
var myPopUp = window.open(fullURL, "_self",winOptions);
if(myPopUp == null || myPopUp.closed) {return false;}
if (triggerParms["olpu"] == 0) myPopUp.blur();
else myPopUp.focus();
return true;
}				
}
}	
pageCount++;
ForeCStdSetCookie(ckLoyaltyCount, pageCount, null,'/',triggerParms["domain"]);		
}
return false;
}
var runningscout=null;
var scoutTracker=null;
var trackerFromClick = false;
function openTrackerWin(){
var sl = (screen.width-triggerParms["trackerWidth"])/2;
var st = (screen.height-triggerParms["trackerHeight"])/2;
var winOpts = "top=" + st + ",left=" + sl + ",width=" + triggerParms["trackerWidth"] + ",height=" + triggerParms["trackerHeight"] + ",resizable=1,toolbar=0,location=0,statusbar=0,menubar=0";
if (triggerParms["sMode"] == 1) { winOpts += ",scrollbars=0";}
else {winOpts += ",scrollbars=1";}
var rNum = 0.0;
if(arguments.length == 1) {rNum = arguments[0];}		
scoutTracker = ForeCStdGetCookie(triggerParms["scout_chk"]);	
if (scoutTracker == null) {
if(rNum > triggerParms["spL"]) {return 1;}
if (triggerParms["displayMode"] == 3 && arguments[0] >0) {return 0;}
runningscout = window.open(triggerParms["trackerURL"]+"?surveypresented="+surveyPresentedBy, "SurveyWindowInformative", winOpts);
} else {
var midVal="";
if (typeof(triggerParms["mid"]) == "undefined") midVal = triggerParms["sid"];
if (typeof(triggerParms["sid"]) == "undefined") midVal = triggerParms["mid"];
if ((ForeCStdGetCookie(ckAlreadyShown) != null) || scoutTracker == 'ScoutClosed' || scoutTracker == midVal){return 1;}
runningscout = window.open(triggerParms["trackerURL"]+"?surveypresented="+surveyPresentedBy, "SurveyWindowInformative", winOpts);
if(rNum>triggerParms["spL"] && runningscout != null && !runningscout.closed) {
ForeCStdSetCookie(triggerParms["scout_chk"], 'ScoutClosed', null,"/",triggerParms["domain"]);
runningscout.close();
return 1;
}
}	
if((trackerFromClick == true || arguments.length == 0) && runningscout != null && !runningscout.closed) {
runningscout.blur();
}
if (triggerParms["sMode"] == 1) {fsrSendReq(PROCESS_RSID);}	
return 0;
}
function showDHTMLWin(){
if((runningscout != null && !runningscout.closed && fsr_aol==false) || scoutTracker != null){return;}
surveyPresentedBy = "dhtml";
if(document.all) {
document.all.FSRInviteWin.style.visibility = 'visible';
}			
else if(document.getElementById) {
document.getElementById("FSRInviteWin").style.visibility = 'visible';
}	
/**Robotreplay event code**/
RR.recordEvent("di", RR.getPosition('FSRInviteWin'));
}
var dcQString="";
var OTCImg;
var FSRImg;
var surveyProcessCont = 1;
var newDt;
var currTime;	
function oeImgProc() {
if(triggerParms["compliant508"] == 1) { showDHTMLWin(); }
else {setTimeout("showDHTMLWin();", triggerParms["dhtmlDelay"],"JavaScript");}
}
function fsrShowSurvey(){
if(dcQString == "") { oeImgProc(); }
else {
newDt   = new Date();
currTime= newDt.getTime(); 
FSRImg = new Image();
FSRImg.onerror = imgErrorProc;
FSRImg.onload = imgOnloadProc;
FSRImg.src = FSRImgURL + "?" + dcQString + "&uid="+ currTime;	
}
}
function imgOnloadProc() {
if(surveyProcessCont == 1 && FSRImg.width == 3) { oeImgProc(); }
return true;
}
function imgErrorProc() {
surveyProcessCont = 0;
return true;
}
function otcOnloadProc() {
if(surveyProcessCont == 1 && OTCImg.width == 3) { fsrShowSurvey(); }
else { surveyProcessCont = 0; }
return true;
}
function otcErrorProc() {
fsrShowSurvey();
return true;
}
function isOnExcludeList(){
try {
hParent = window.opener;
var parentURLPath="";
if (hParent != null ){parentURLPath = hParent.location.href;} 
else {
parentURLPath = window.parent.location.href;}
if(excludeList.length == 0) {
return true;
}
for(wlKey in excludeList) {
if (parentURLPath.indexOf(excludeList[wlKey]) != -1) {
//closeTrackerWin();
return true;
}
}
return false;
} catch (e) {return true;}
}

function openFSRTracker() {	
if (arguments.length>0 && arguments[0] == '1')
{
if (triggerParms["oeMode"] == 1) fsrAttachEvent(window, "unload", function() {fsrOnUnload();}, false);		
var alreadyShown = ForeCStdGetCookie(ckAlreadyShown);
var excludeBrowserFlag = fsr_safari_2_x || fsr_NS62 || fsr_opera;
if(excludeBrowserFlag || triggerParms["displayMode"] == 0 || alreadyShown!=null || !fsrIsCookieEnabled() || isOnExcludeList()) {return;}
if(arguments.length == 2 && arguments[1] == true) {trackerFromClick = true;}
else {trackerFromClick = false;}
if (triggerParms["sid"] != null && triggerParms["mid"] == null && triggerParms["patternType"] != null && (triggerParms["patternType"].toUpperCase()).indexOf("URL") != -1) {
triggerParms["sMode"] = 0;
if (triggerParms["oeMode"] == 0) {
ForeCStdSetCookie("currentURL", window.location.href , null,"/",triggerParms["domain"]);
}
}
var rNum = Math.random()*100;
var scoutFlag = openTrackerWin(rNum);
if (fsr_aol) {
try{ 
runningscout.focus();
scoutFlag=1;
} catch (e){scoutFlag=0;}
}
if(arguments.length == 1 && !fsr_NS70 && (scoutFlag==null || scoutFlag == 0) && isValidFlash() && triggerParms["displayMode"] != 2) {
if(document.getElementById || document.all) {
if (fsr_NS8) triggerParms["dhtmlHeight"] = triggerParms["dhtmlHeight"] + 15;
document.write("<div id=\"FSRInviteWin\" style=\"position:absolute; left:" + triggerParms["dhtmlLeft"]+"px; top:"+ triggerParms["dhtmlTop"]
+ "px; z-index:"+triggerParms["dhtmlIndex"]+"; border:0; visibility:hidden;\">"
+ "<iframe id=\"cframe\" src="+"\""+ triggerParms["dhtmlURL"]+"\" FrameBorder=0 Scrolling=NO width="+triggerParms["dhtmlWidth"]+" height="+triggerParms["dhtmlHeight"]+"></iframe></div>");
if ((triggerParms["midexp"] ) != null) {
dcQString = "ndc=1&midexp=" + triggerParms["midexp"] + "&mid=" + specialEscape(escape(triggerParms["mid"]));
if(triggerParms["dcUniqueId"]!=null) { dcQString += "&dcUniqueId=" + specialEscape(escape(triggerParms["dcUniqueId"])); }						
}
surveyProcessCont = 1;
var newDt   = new Date();
var currTime= newDt.getTime(); 
OTCImg = new Image();
OTCImg.onerror = otcErrorProc;
OTCImg.onload = otcOnloadProc;
OTCImg.src = OTCImgURL + "?protocol=" + window.location.protocol + "&uid="+ currTime;	
}
}
}
}
function FSRInviteAct(actFlag) {
if(document.all) {document.all.FSRInviteWin.style.visibility = 'hidden';}	
else if(document.getElementById) {document.getElementById("FSRInviteWin").style.visibility = 'hidden';}
if(actFlag == '1') {
openTrackerWin();
/**Robotreplay hide event code**/
RR.recordEvent("di", "0");
if (RR.hasRR())	robotreplay.Capture.setPageFocusStatus(false, true);
/**tell robotreplay to begin transmitting**/	
RR.setOKTransmit();
}
else if(triggerParms["dhtmlWinRep"] == 0) {
ForeCStdSetCookie(triggerParms["scout_chk"], "ScoutClosed", persistentExpires,"/",triggerParms["domain"]);
/**Robotreplay hide event code**/
RR.recordEvent("di", "0");
if (RR.hasRR())	robotreplay.Capture.setPageFocusStatus(false, true);
/**tell robotreplay to stop recording**/
RR.cancelRecord();
}
}
function getURLParameters(paramName) {
var sURL = window.document.URL.toString();		
if (sURL.indexOf("?") > 0)
{
var arrParams = sURL.split("?");			
var arrURLParams = arrParams[1].split("&");		
for (var i=0;i<arrURLParams.length;i++)
{
var sParam =  arrURLParams[i].split("=");
if (paramName.toLowerCase()==sParam[0].toLowerCase()){
return unescape(sParam[1]);
}
}
}
else
{
return "";
}
}
function closeTrackerWin() {
var scoutTracker = ForeCStdGetCookie(triggerParms["scout_chk"]);
if (scoutTracker!=null) {
var trackerWin = window.open(triggerParms["trackerURL"],"SurveyWindowInformative");
if (trackerWin != null && !trackerWin.closed) {trackerWin.close();}
}
}
function fsrIsCookieEnabled() {
var cookieEnabled=(navigator.cookieEnabled)? true : false;
if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 
document.cookie="testcookie";
cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false;
}
return cookieEnabled;
}
function fsrSetFilter() {
fullURL += "&sid=" + triggerParms["sid"];
if (triggerParms["patternType"] != null && (triggerParms["patternType"].toUpperCase()).indexOf("URL") != -1) {
var parentURL = "";
if (ForeCStdGetCookie('currentURL') != null && ForeCStdGetCookie('currentURL') != 'blank')
parentURL = ForeCStdGetCookie('currentURL');
else if (ForeCStdGetCookie('previousURL') != null)
parentURL = ForeCStdGetCookie('previousURL');
fullURL += "&pattern="+ escape(parentURL);
}
else if (triggerParms["patternType"] != null && (triggerParms["patternType"].toUpperCase()).indexOf("CK=") != -1) {
var pos = triggerParms["patternType"].indexOf("=");
var cookieValue = ForeCStdGetCookie(triggerParms["patternType"].substring(pos+1));
fullURL += "&pattern="+ escape(cookieValue);
}
else if (triggerParms["patternType"] != null && (triggerParms["patternType"].toUpperCase()) != null && triggerParms["patternType"].length >0) {
fullURL += "&pattern="+ escape(triggerParms["patternType"]);
}	
}
function fsrSetFullURL() {
fullURL = popupURL + "?" + "width=" + triggerParms["width"] + "&height=" + triggerParms["height"] +
"&cid=" + specialEscape(escape(triggerParms["cid"]));
if (triggerParms["mid"] != null) 
fullURL += "&mid=" + specialEscape(escape(triggerParms["mid"]));
if (triggerParms["omb"] != null) {
fullURL += "&omb=" + escape(triggerParms["omb"]);
}
if ((triggerParms["cmetrics"] ) != null) {
fullURL += "&cmetrics=" + escape(triggerParms["cmetrics"]);
}
if (triggerParms["olpu"] == 1) {
fullURL += "&olpu=1";
}
if ((triggerParms["dcUniqueId"]) != null) {
fullURL += "&dcUniqueId=" + escape(triggerParms["dcUniqueId"]);
}
if ((triggerParms["midexp"] ) != null) {
fullURL += "&ndc=1&fsexp=5256000&midexp=" + triggerParms["midexp"];
}
if (triggerParms["sMode"] != null) {
fullURL += "&sMode="+ triggerParms["sMode"];
}
if (triggerParms["sid"] != null && triggerParms["mid"] == null) {fsrSetFilter();}
}
function getCPPString(){
var cppString="";
for(paramKey in triggerParms) {
if(paramKey.substring(0,3) == "cpp"){
cppString += "&" + paramKey + "=" + escape(triggerParms[paramKey]);
}
}
return cppString;
}
function fsrGetCPP(){
var pageCount = ForeCStdGetCookie(ckLoyaltyCount);
try {
if (triggerParms["cpp_1"] == null || typeof(triggerParms["cpp_1"]) == 'undefined') {	
if (triggerParms["userURL"] == 1) {
if (triggerParms["oeMode"] == 0){
triggerParms["cpp_1"] = "userURL:"+ cppUrlPatch (window.opener.location.href);
}
else {
if (ForeCStdGetCookie('previousURL') != null && arguments.length == 0 && triggerParms["nLF"] == null)
triggerParms["cpp_1"] = "userURL:"+ cppUrlPatch (ForeCStdGetCookie('previousURL'));
else {
if (ForeCStdGetCookie("currentURL") == 'blank') triggerParms["cpp_1"] = "userURL:"+ cppUrlPatch (ForeCStdGetCookie('previousURL'));
else triggerParms["cpp_1"] = "userURL:"+ cppUrlPatch (ForeCStdGetCookie('currentURL'));
}
}
}
}
} catch(e){triggerParms["cpp_1"] = "userURL:"+ cppUrlPatch (window.location.href);}
if (pageCount == null) {pageCount = 1;}
if (triggerParms["capturePageView"] == 1) {
triggerParms["cpp_2"] = "PageView:"+ pageCount; 
}
var sMode=triggerParms["sMode"];
if (triggerParms["sMode"] == null) {sMode=0};
triggerParms["cpp_3"] = "Browser:OE_Mode"+ triggerParms["oeMode"] +";Survey_Mode"+ sMode +";" + cppUrlPatch (detect) + ";" + triggerParms["captureTriggerVersion"] + ";" + getURLParameters('surveypresented');
var counter=4;
if (triggerParms["visualScienceId"] == 1) {
counter=5;
setVisualSciencesId(fullURL);
}
if (triggerParms["omnitureId"] == 1) {
setOmnitureId(fullURL);
}
for(paramKey in triggerParms) {
if(paramKey.substring(0,5) == "oecpp"){
var value = triggerParms[paramKey];
var session = ForeCStdGetCookie(value);
if (session != null) {
triggerParms["cpp_"+ counter] = value.substring(8,value.length) + ":" + cppUrlPatch (session);
counter++;	
}
}
}	
return getCPPString();
}
function fsrShowIFrameSurvey() {
fsrSendReq(PROCESS_CPP);
setFSRSurveyCookie();
document.getElementById("trackerWin").style.visibility = "hidden";
document.getElementById("FSRSurveyWin").style.visibility = "visible";
sizeWindow(triggerParms["width"],triggerParms["height"]);	
return true;
}
function sizeWindow(w,h) {
window.moveTo(self.screen.width/2 - w/2,self.screen.height/2 - h/2);
window.resizeTo(w,h);
}
var fsrTrackerImg = new Image();
function fsrSendReq(actId) {
var midVal= (triggerParms["mid"] == null) ? triggerParms["sid"] : specialEscape(escape(triggerParms["mid"]));
if (actId==PROCESS_RSID) {
CSURL += "?actionId="+ actId +"&mid="+ midVal;
}
else if (actId==PROCESS_CPP) {
CSURL += "?actionId="+ actId +"&mid="+ midVal + fsrGetCPP();
}	
fsrTrackerImg.onerror = fsrOnImgError;
fsrTrackerImg.onload = fsrOnImgLoad;
newDt   = new Date();
currTime= newDt.getTime(); 
fsrTrackerImg.src = CSURL + "&uid="+ currTime;
}
function fsrOnImgLoad(){
if(fsrTrackerImg.width >= 5) { window.close();}
}
function fsrOnImgError() {
}
function fsrAttachEvent(obj, evt, fnc, useCapture){
if (fnc == null || obj == null) return true;
if (obj.addEventListener && document.addEventListener) {
obj.addEventListener(evt,fnc,useCapture);	
return true;
}
else if (obj.attachEvent) {
return obj.attachEvent("on"+evt,fnc);	
}
else {
if (!obj.myEvents) obj.myEvents={};
if (!obj.myEvents[evt]) obj.myEvents[evt]=[];
var evts = obj.myEvents[evt];
evts[evts.length]=fnc;
obj['on'+evt]=function(){ fsrFireEvent(obj,evt) };
}
} 
function fsrFireEvent(obj,evt){
if (!obj || !obj.myEvents || !obj.myEvents[evt]) return;
var evts = obj.myEvents[evt];
for (var i=0,len=evts.length;i<len;i++) evts[i]();
}
/**RobotReplay CPP**/
triggerParms["oecpp_replay_id"]="Foresee_replay_id";
RR = {
      hasRR: function() {
				if (typeof robotreplay != "undefined")
	                  return true;
	            return false;
      },
      setOKTransmit: function() {
	            if (this.hasRR()) {
	                  var replay_id = robotreplay.Session.rr_group_session_id;
	                  robotreplay.Log.setOKTransmit();
	                  ForeCStdSetCookie(triggerParms["oecpp_replay_id"], replay_id, null, "/", triggerParms["domain"]);
	            }
      },
      recordEvent: function(eventName, eventValue) {
	            if (this.hasRR())
	                  robotreplay.Log.push(eventName, eventValue);
      },
      cancelRecord: function() {
	            if (this.hasRR())
	                  robotreplay.Log.cancelRecord();           
      },
      getPosition: function(elid) {
	            if (this.hasRR())
	                  return robotreplay.Dom.getAbsoluteCoords(document.getElementById(elid));
	            else
	                  return {position:false}
      }
};

