// BECAUSE THIS NEEDS THE URL TO THE DRIGG SITE, I WILL HAVE TO EITHER
//1) GENERATE THIS JS. UPON INSTALLATION or
//2) MAKE IT A DRUPAL CALLBACK BUT IT WOULD THEN BE HITTING THE PHP SERVER FOR NOTHING

//WILL WORK ON THIS FOR THE FINAL RELEASE
var base_url="http://www.designmoo.com/";

//
//I'm also wondering if I can't make this work with a single call to the drupal server
//each of these button.js would add its data to a stack and register a call back on the document.load event
//then that event can get the info from the stack, batch send it to the server and a get an object back for each
//button, then populate each button with its data... ?
if (typeof DRIGG_EVB!="function")
{
  function DRIGG_EVB(counter,divId,fullUrl) {
    frames[divId].location.href=fullUrl+'&destination='+escape(fullUrl); 
  }
} 

if (!window.url_site) 
  var url_site=""; 

if(!window.DRIGG_EVB_i) 
  var DRIGG_EVB_i=0;

DRIGG_EVB_i=DRIGG_EVB_i+1; 
var full_url=base_url+'drigg_external/display_button?url='+url_site;
var div_id='DRIGG_EVB-'+DRIGG_EVB_i;
document.write('<iframe scrolling="no" allowTransparency="true" name="'+div_id+'" id="'+div_id+'" src="'+base_url+'sites/all/modules/drigg/drigg_external/loader.html" frameborder="0" style="border-color:gray;border-style:solid;border-width:0px;" scrolling="0" width="50" height="68"></iframe>');
var callString="DRIGG_EVB("+DRIGG_EVB_i+",'"+div_id+"','"+full_url+"')";
setTimeout(callString,2500*DRIGG_EVB_i);
