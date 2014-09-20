/* 
	SEARCH BUDDY
	$Id: SearchBuddy.js,v 1.18 2009/08/17 09:51:15 mok Exp $
*/

adobe.Loader.requireAsset("http://wwwimages.adobe.com/www.adobe.com/lib/com.adobe/module/ProductSelector/GvaScript.js");
adobe.Loader.requireAsset("http://wwwimages.adobe.com/www.adobe.com/lib/com.adobe/urlParser.js");
adobe.Loader.requireAsset("http://wwwimages.adobe.com/www.adobe.com/lib/com.adobe/template/search/buddy/screen.css");

var SearchBuddy = (function() {
var _SearchBuddy = {};

	_SearchBuddy.IDS = {
		searchForm			:	"globalnav-search",
		siteSearch			:	"site-search",
		searchInput			:	"search-input",
		searchBuddySubmit		:	"search-buddy-submit",
		resultsContainer		:	"sb-results",
		resultsBody			: 	"sb-results-body",
		resultsList			: 	"result-list"
	}
	
	_SearchBuddy.CSS = {
		activated			:	"activated",
		highlight			:	"highlight",
		noResult			:	"no-result",
		searchResult			:	"search-result",
		pulloutLeft50			:	"pullout-left left-50",
		pulloutItem			:	"pullout-item",
		linkList			:	"link-list",
		searchSuggestion		:	"search-suggestion",
		searchAll			:	"txtright search-all"
	}

	var _SearchBuddyInstance = Class.create({
											
		initialize : function(URLS,STRINGS) {
			
			if($('globalnav-search')==null) return;		// error checking for no gnav
			if(!$('globalnav-search').hasClassName("en")) return;
			
			this.URLS = Object.extend({
				searchBuddy		:	"/cfusion/search/buddy/searchbuddy.cfm",
				searchResults	:	"/cfusion/search/index.cfm"
			},URLS);
			
			this.STRINGS = Object.extend({
				searchForElipsis	:	"Search for...",
				searchFor			:	"Search for",
				seeAllResults		:	"See all search results &#8250;",
				delay				:	0.015
			},STRINGS);
						
			this.searchForm = $(_SearchBuddy.IDS.searchForm);
			this.input = $(_SearchBuddy.IDS.searchInput);
			
			this.term = this.input.value.escapeHTML();
			this.loc = (!Object.isUndefined(this.searchForm.getInputs('hidden')[0])) ? this.searchForm.getInputs('hidden')[0].value : "";
			
			this.sitesearch = $(_SearchBuddy.IDS.siteSearch);
					
			this.title = this.input.getAttribute("title");
			
			this.resultsContainer = new Element('div');
			this.resultsContainer.id = _SearchBuddy.IDS.resultsContainer;
			
			this.resultsBody = new Element('div');
			this.resultsBody.id = _SearchBuddy.IDS.resultsBody;		
			
			this.goURL = "";					
		
			this.isSafari2 = ((adobe.hostEnv.ua.indexOf('multisafari') > -1) || (adobe.hostEnv.isSafari && adobe.hostEnv.kitV <= 418)) ? true : false;
					
			this.selectedIndex = 1;
			
			this.searchbutton = $$("button[type=submit]")[0];	// first <button> of the page
			
			/*--- "cache" the bound functions for observe/stopObserving ---*/
			_SearchBuddyInstance.clickFX = this.handleOutsideClicks.bindAsEventListener(this);
			_SearchBuddyInstance.mouseFX = this.handleMouseHover.bindAsEventListener(this);
			_SearchBuddyInstance.windowFX = this.handleWindowResize.bindAsEventListener(this);
				
			/*--- create a hidden input with site section/subsection ---*/
			this.siteSection = adobe.URLParser.siteLevel;
			this.siteSection = (this.siteSection=="") ? "home" : this.siteSection;
			this.siteSection = (adobe.URLParser.host.startsWith('get')) ? ("get:"+this.siteSection) : this.siteSection;
			this.siteSection = (adobe.URLParser.host.startsWith('kb')) ? ("get:"+this.siteSection) : this.siteSection;
			this.siteSection += (adobe.URLParser.siteSection==null || adobe.URLParser.siteSection=="") ? "" : ":" + adobe.URLParser.siteSection;
			
			var siteSection_input = new Element('input');
			Element.writeAttribute(siteSection_input, {
				 "name" : "siteSection",
				 "type" : "hidden",
				 "value": this.siteSection
			});
					
			Element.insert(this.searchForm, siteSection_input); 	
			Element.insert(this.sitesearch,this.resultsContainer);
			Element.insert(this.resultsContainer,this.resultsBody);
			
			var rules   = {
				UP:     	this.handleKeyCheck.bindAsEventListener(this), 
				DOWN:   	this.handleKeyCheck.bindAsEventListener(this),
				BACKSPACE:	this.handleKeyCheck.bindAsEventListener(this),
				REGEX: 	[ 
					["S_", "|[A-Z]|[0-9]", this.handleResultsMenu.bindAsEventListener(this) ],		// Shift + Letter
					["C_", "|[A-Z]|[0-9]", this.handleResultsMenu.bindAsEventListener(this) ],		// Ctrl + Letter
					["",   "SHIFT|[A-Z]|[0-9]", this.handleResultsMenu.bindAsEventListener(this) ],
					[null, "RETURN|TAB|ESCAPE|DELETE", this.handleKeyCheck.bindAsEventListener(this)  ]
																						 
				]
			};
			
			var queryParams = getSearchParams('cat');
					
			if(!Object.isUndefined(queryParams)) {
				
				var _input = new Element('input', {
				"type" : "hidden",
				"name" : "cat",
				"value": queryParams
				});
				this.searchForm.insert(_input);
			
			} 
		
			this.keymap = new GvaScript.KeyMap(rules);
			this.keymap.observe("keydown",this.resultsBody);
			this.keymap.observe("keydown",this.input);	
			
			this.searchForm.observe('submit', this.handleNoSubmit.bindAsEventListener(this));
			this.searchbutton.observe('click', this.handleFormSubmit.bindAsEventListener(this));
			this.searchbutton.observe('keypress', this.handleFormSubmit.bindAsEventListener(this));
			
			this.input.observe('click', this.handleInputValue.bindAsEventListener(this));
		
		},	
		/*--- clear the input value from "Search for..." ---*/
		handleInputValue : function() { 
			this.input.value=""; 
		},
		/*--- prevent default submit ---*/
		handleNoSubmit : function(event) {	
			event.stop();
			return false;
		},	
		/*--- Either prevent submit if link is selected in results or submit the form based on event type  ---*/
		handleFormSubmit : function(event) {
			if(!event && this.goURL.empty && !this.goURL.empty()) { event.stop(); return false }	// the URL to go to is set when user clicks or navigates through links
			if(event.type=="click" || event.keyCode=="13" || event.keyCode=="0") {			
				if(this.input.value==this.input.title) this.input.value="";	// clear the input value from "Search for..." which is in the title of the input				
				this.searchForm.submit();	
			}
		},
		/*--- document the keycode and then deal with keyboard navigation ---*/
		handleKeyCheck : function(event) {
			this.keyCode =  event.keyModifiers + ":" + event.keyName + " / " +  event.keyCode;		
			this.handleMenuNavigation(event);					
		},
		/*--- if there's results, hide/delete them then make sure to quit observing it ---*/
		hideMenu : function() {
			this.undoSelectFix();
			this.searchForm.fire("searchbuddy:closed");
			if($(_SearchBuddy.IDS.resultsList) != null) {
				$(_SearchBuddy.IDS.resultsList).remove(); 
				this.sitesearch.removeClassName(_SearchBuddy.CSS.activated);
				this.ignoreMouseHover();
				this.ignoreWindowResize();
			}
		},
		/*--- Keyboard commands ---*/
		handleMenuNavigation : function(event) {
			/*--- BUG 87467 :: need to add empty item if no hublets ---*/
			if(!this.json) { return; }
			var resultLinks = $$('#' + this.resultsBody.id + ' a');
			if(this.json.HUBLETS.length==0) { 		
				var foo = resultLinks.unshift("..");		
			}
			/*--- RETURN key either submits the form if no link is selected or goes to the URL of link ---*/
			if(this.keyCode == ":RETURN / 13") {
				if(this.goURL.empty()) {
					event.stop();
					this.searchForm.submit();
					return false;
				} else {
					if(this.isSafari2) {
						this.searchForm.method="post";
						this.searchForm.action=this.goURL;
					} else {
						event.stop();
						window.location.href=this.goURL;	
						return;
					}
				}			
			}
			/*--- ESC gets out of menu ---*/
			if(this.keyCode == ":ESCAPE / 27") {
				this.hideMenu();
				this.goURL="";
				this.input.value = "";
			}
			/*--- TAB out of menu ---*/
			if(this.keyCode == ":TAB / 9") {
				if(this.goURL.empty()) {
					this.hideMenu();
				}
			}
			/*--- BACKSPACE/DEL continues getting results  ---*/
			if(this.keyCode == ":BACKSPACE / 8" || this.keyCode == ":DELETE / 46") {
				this.handleResultsMenu();	
			}	
			/*--- STOP page down and navigate down through result links  ---*/
			if(this.keyCode == ":DOWN / 40") {	
				event.stop();						
				if(this.selectedIndex < resultLinks.length) {
					// pass over links with images
					if(resultLinks[this.selectedIndex].firstChild.nodeType == 1) this.selectedIndex++;	
					
					var nextLink = resultLinks[this.selectedIndex];
					
					if(this.selectedIndex > 1) {
						var lastLink = resultLinks[this.selectedIndex-1];
						if(resultLinks[this.selectedIndex-1].firstChild.nodeType == 1) lastLink = resultLinks[this.selectedIndex-2];
						lastLink.removeClassName(_SearchBuddy.CSS.highlight);
					}
									
					nextLink.addClassName(_SearchBuddy.CSS.highlight);
					window.status=nextLink.href;
					
					this.goURL = nextLink.toString();	// set up link URL to go to if "RETURN" is hit
									
					this.selectedIndex++;
					
				} else if(resultLinks.length==1) {
					resultLinks[0].addClassName(_SearchBuddy.CSS.highlight);	// no results, only search term link
				}
				
			}
			/*--- STOP page up and navigate up through result links  ---*/
			if(this.keyCode == ":UP / 38") {
				event.stop();
				this.selectedIndex--;
				if(this.selectedIndex == 1) this.selectedIndex=2;
				
				if(this.selectedIndex > 1 && this.selectedIndex < resultLinks.length) {
					var currentLink = this.selectedIndex;
					var lastLink = this.selectedIndex-1;
									
					if(resultLinks[lastLink].firstChild.nodeType == 1) { lastLink = lastLink-1; this.selectedIndex-- }
									
					resultLinks[currentLink].removeClassName(_SearchBuddy.CSS.highlight);
					resultLinks[lastLink].addClassName(_SearchBuddy.CSS.highlight);
					window.status=resultLinks[lastLink];
					
					this.goURL = resultLinks[lastLink]; // set up link URL to go to if "RETURN" is hit
					
				}	
			}
		},
		/*--- set a timeout to get search results ---*/
		handleResultsMenu : function(event) {
			this.getResults.bind(this).delay(this.STRINGS.delay);
			
		},
		/*--- get results if term is not empty ---*/
		getResults : function() {
			this.term = ($F(_SearchBuddy.IDS.searchInput)).toLowerCase().escapeHTML();
			if(this.term.empty()) {
				this.handleNoTerm();	// don't show menu
			} else {
				this.search(this.term);	// get JSON results
			}
		},
		/*--- search input is empty so hide menu ---*/
		handleNoTerm : function() {
			this.hideMenu(); 	
		},
		/*--- send query to CF/AJAX to get JSON results ---*/
		search : function() {
			this.baseURL = this.URLS.searchBuddy;	
					
			var sURL = this.baseURL + "?pre=" + this.term + "&s=" + this.siteSection + "&loc=" + this.loc;		
			
			new Ajax.Request(sURL, {
			  method: 'get',
			  onComplete: this.loadJSON.bind(this)
				
			}); 
				 
			this.selectedIndex = 1;		// always reset keyboard navigation index when new results come in
			this.goURL = ""; /*--- reset goURL so it won't go there if search term deleted after arrowed down to something (BUG 88029) ---*/
		},
		/*--- LOAD JSON results and show results ---*/
		loadJSON : function(originalRequest) {
			this.json = originalRequest.responseText.evalJSON();
			if($(_SearchBuddy.IDS.resultsList)!=null) { $(_SearchBuddy.IDS.resultsList).remove(); }	// delete then rewrite results
						
			if(this.json.HUBLETS.length==0 && this.json.SUGGESTIONS.length==0) {
				this.renderNoResults();			// no results from JSON search
			} else {
				this.renderResults();	// show results
				
			}
		},
		/*--- Set up click observer on document to hide menu if clicked outside of menu ---*/
		watchClicks : function() {
			Event.observe(document,'click', _SearchBuddyInstance.clickFX);
		},
		/*--- Stop observing clicks on document ---*/
		ignoreClicks : function() {
			Event.stopObserving(document,'click', _SearchBuddyInstance.clickFX);
		},
		/*--- Handle clicks outside of the menu to hide it and ignore clicks if so --*/
		handleOutsideClicks : function(event) {
			/*--- click on BODY or element has not descendantOf ---*/	
			if(event.target.nodeName == "BODY" || !event.target.descendantOf) { 
				this.hideMenu();
				this.ignoreClicks()
				return;
			}
			/*--- element has an ID and is not a descendant of the site-search ---*/	
			if(!event.target.descendantOf(this.sitesearch) && event.target.id != this.sitesearch.id) { 
				this.hideMenu();
				this.ignoreClicks()
				return;
			}
		},
		/*--- Set up mousehover observer on results --*/
		watchMouseHover : function() {
			this.resultsBody.observe('mouseover', _SearchBuddyInstance.mouseFX);
		},
		/*--- Stop observing mousehover on results --*/
		ignoreMouseHover : function() {
			this.resultsBody.stopObserving('mouseover', _SearchBuddyInstance.mouseFX);
		},
		/*--- Turn off any highlighted links from keyboard navigation ---*/
		handleMouseHover : function(event) {
			if($$("a.highlight")[0]) $$("a.highlight")[0].removeClassName(_SearchBuddy.CSS.highlight);
			this.selectedIndex = 1;
		},
		/*--- Add activated class to show the results menu ---*/
		activateMenu : function() {
			this.sitesearch.addClassName(_SearchBuddy.CSS.activated);
		},
		/*--- For no results from JSON, create a link with whatever term is entered w/ link to search results page ---*/
		renderNoResults : function() {
			this.hideMenu();
			this.activateMenu();
			var dl = new Element('dl',{ id : _SearchBuddy.IDS.resultsList });
			
			this.resultsBody.insert(dl);
			
			var ddLink = this.URLS.searchResults + "?loc=" + this.loc + "&term=" + this.term;
			var ddText = this.STRINGS.searchFor + ' "' + this.term + '" &#8250;';
			var dd = new Element('dd', { 'class': _SearchBuddy.CSS.noResult }).update(new Element('a', { 'href' : ddLink }).update(ddText));
			
			dl.insert(dd);
			
			this.goURL = ""; // make sure to empty go to URL if this link is selected
			
			this.watchClicks();
		},
		doSelectFix : function() {
			if(adobe.hostEnv.ua.indexOf('msie')  && adobe.hostEnv.ieV >= 6) {
				adobe.SelectFix.doFix();
			}
		},
		undoSelectFix : function() {
			if(adobe.hostEnv.ua.indexOf('msie')  && adobe.hostEnv.ieV >= 6) {
				adobe.SelectFix.undoFix();
			}
		},
		/*--- Observe resize of window ---*/
		watchWindowResize : function(event) {
			if(adobe.hostEnv.ua.indexOf('msie')  && adobe.hostEnv.ieV >= 6) {
				Event.observe(window,'resize', _SearchBuddyInstance.windowFX);
			}
		},
		/*--- Stop observing resize of window ---*/
		ignoreWindowResize : function() {
			Event.stopObserving(window,'resize', _SearchBuddyInstance.windowFX);
		},
		handleWindowResize : function() {
			var IE6WinX = Element.viewportOffset(this.input).left;			
			if(IE6WinX < 678) {
				adobe.SelectFix.doFix();
			} else {
				adobe.SelectFix.undoFix();
			}
		},
		/*--- Show results from JSON (Hublets and Suggestions) in pullout-left DD's and a link to results page with term ---*/
		renderResults : function(json) {	
			
			if(this.term.empty()) return;	// if term is empty, make sure nothing renders
				
			this.activateMenu();
						
			var hublets = this.json.HUBLETS;
			var suggestions = this.json.SUGGESTIONS;						
			
			var dl = new Element('dl',{ id : _SearchBuddy.IDS.resultsList });
			
			this.resultsBody.insert(dl);
							
			hublets.each(function(hub,index) {
								  
				var sbrIndex = "sbr-"+index;
				var imgURL = "http://wwwimages.adobe.com/www.adobe.com" + hub.ICONURL;
			
				var dd = new Element('dd', { 'id': sbrIndex, 'class': _SearchBuddy.CSS.searchResult });
				var div = new Element('div').addClassName(_SearchBuddy.CSS.pulloutLeft50);			
				var pullout = new Element('p').addClassName(_SearchBuddy.CSS.pulloutItem).update(new Element('a', { 'href' : hub.HOMEPAGEURL }).update(new Element('img',{ 'src': imgURL})));		
				var h4 = new Element('h4', { 'href': hub.HOMEPAGEURL}).update(new Element('a', { 'href': hub.HOMEPAGEURL }).update(hub.TITLE));
				var linklist = new Element('ul').addClassName(_SearchBuddy.CSS.linkList);
				
				dl.insert(dd);			
				dd.insert(div);
				div.insert(pullout).down();
				div.insert(h4).insert(linklist);
				
				$A(hub.LINKS).each(function(link) {										
					var li = new Element('li');
					var a = new Element('a', { 'href': link.URL}).update(link.TITLE);
					linklist.insert(li);
					li.insert(a);
				})				
			});
					
			suggestions.each(function(suggest,index) {
				
				var dd = new Element('dd', { 'id': "sbs-"+index, 'class': _SearchBuddy.CSS.searchSuggestion });
				var h4 = new Element('h4');
				var a = new Element('a',{ 'href': suggest.DESTINATIONURL }).update(suggest.TITLE);
				var p = new Element('p').update(suggest.BLURB);
				
				Element.insert(dl,dd);
				h4.insert(a);
				dd.insert(h4).insert(p)
			
			});
					
			dl.insert(new Element('dd').addClassName(_SearchBuddy.CSS.searchAll ).update(new Element('a', { 'id': _SearchBuddy.IDS.searchBuddySubmit }).update(this.STRINGS.seeAllResults))).observe('click',this.handleFormSubmit.bindAsEventListener(this));
						
			var IE6X = Element.viewportOffset(this.input).left;
						
			if(IE6X < 678) {
				this.doSelectFix();	
			}
			
			this.searchForm.fire("searchbuddy:opened");			
			this.watchWindowResize();
			this.watchClicks();
			this.watchMouseHover();
		}
	});
	
	return _SearchBuddyInstance;

})();