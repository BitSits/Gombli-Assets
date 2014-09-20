/*	
	URLPARSER 
	$Revision: 1.3 $
	@author mok
*/

/*---
	Get Information From URL: 
		adobe.URLParser.workareaName,
		adobe.URLParser.locale,
		adobe.URLParser.siteLevel,
		adobe.URLParser.siteSection,
		adobe.URLParser.productName,
		adobe.URLParser.siteSubSection,
		adobe.URLParser.productSection,
		adobe.URLParser.productSubSection,
		adobe.URLParser.fileName
---*/

adobe.URLParser = (function() {
	
		var pageURL = window.location.toString();
	
		var urlArray = new Array();
		var pathArray = new Array();
		
		urlArray = pageURL.split('//');
		pathArray = urlArray[1].split('/');
		
		/*--- WORKAREA ---*/
		var isWorkarea = (pathArray[1] == "WORKAREA") ? true : false;
		var workareaName = (isWorkarea) ? pathArray[2] : "";
		
		if(isWorkarea) { pathArray.splice(1,2); }
		
		/*--- LOCALE ---*/
		var locale = pathArray[1];
		locale = (locale.length == 2) ? locale : "en_us";
		if(locale == "en_us") {	pathArray.splice(1, 0, locale); }
		
		/*--- SITE LEVEL ---*/
		var siteLevel = pathArray[2];
		
		/*--- SITE SECTION or PRODUCT ---*/
		var siteSection = pathArray[3];	
		var productName = (siteLevel == "products") ? product = pathArray[3] : "";
		
		/*--- SITE SUBSECTION or PRODUCT SECTION ---*/
		var siteSubSection = pathArray[4];
		var productSection = (siteLevel == "products") ? product = pathArray[4] : "";
		
		/*--- SUB DIRECTORIES ---*/
		var productSubSection = (siteLevel == "products") ? product = pathArray[5] : "";
	
		/*---FILE NAME ---*/
		var fileName;
		pathArray.each(function(part) {
			if(part.indexOf('.html')  > -1) { filename = part; } 
		});	
		
		var pageInfo = {
			
			"url":								window.location,
			"path":								window.location.pathname,
			"protocol":						window.location.protocol,
			"hash":								window.location.hash,
			"host":								pathArray[0],		
			"isWorkarea":					isWorkarea,
			"workarea":						workareaName,
			"locale":							locale,
			"siteLevel":					siteLevel,
			"siteSection":				siteSection,
			"productName":				productName,
			"siteSubSection":			siteSubSection,
			"productSection":			productSection,
			"productSubSection":	productSubSection,
			"fileName":						fileName
		};
		
		return pageInfo;
	
})();