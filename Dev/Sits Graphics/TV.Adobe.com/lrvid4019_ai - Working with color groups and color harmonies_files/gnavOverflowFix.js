adobe.gnavOverflowFix = (function() {
	
	function MenuLayout(el) {
		this.element = $(el);
		this.isWrapping;
		this.isOverSearchBox;
		this.fixedState = [false, false];
	}
	
	MenuLayout.prototype = {
		setProps: function() {
			var el = this.element,
			items = el.childElements(),
			lastItem = items[items.length-1],
			yMenuPadding = parseInt(el.getStyle("padding-top")) + parseInt(el.getStyle("padding-bottom"));
			
			this.isWrapping = (el.offsetHeight > (lastItem.offsetHeight + yMenuPadding));
			this.right = (el.offsetLeft + lastItem.offsetLeft + lastItem.offsetWidth);
			this.top = Position.cumulativeOffset(el)[1];
		},
		setFixedState: function(side, value) {
			var i;
			switch(side) {
				case "top": i = 0; break;
				case "right": i = 1; break;
			}
			this.fixedState[i] = !!value;
			return;
		},
		getFixedState: function(side) {
			var i;
			switch(side) {
				case "top": i = 0; break;
				case "right": i = 1; break;
			}
			return this.fixedState[i];
		},
		doFix: function(side, adjust) {
			switch(side) {
				case "top": 
					this.element.setStyle({
						paddingTop: (parseInt(this.element.getStyle("padding-top")) + adjust + "px")
					});
					break;
				case "right": 
					this.element.setStyle({
						width: "756px",
						marginRight: (adjust*-1)+"px"
					});
					break;
			}
			
			this.setFixedState(side, true);
		},
		undoFix: function(side) {
			if(!this.getFixedState(side)) { return };
			
			switch(side) {
				case "top": 
					this.element.setStyle({
						paddingTop: ""
					});
					break;
				case "right": 
					this.element.setStyle({
						width: "",
						marginRight: ""
					});
					break;
			}
			
			this.setFixedState(side, false);
		}
	}
	
	
	
	function SearchBoxLayout(el) {
		this.el = el;
		this.height;
		this.width;
		this.left;
		this.bottom;
	}
	
	SearchBoxLayout.prototype = {
		update: function() {
			var el = this.el;
			this.height = el.offsetHeight,
			this.width = el.offsetWidth,
			this.left = el.offsetLeft;
			this.bottom = (el.offsetTop + el.offsetHeight);
			this.left = (el.offsetLeft);
		}
	}
	
	return {
		init: function () {			
			var gNav = $("globalnav"),
			userMenuList = document.getElementById("user-menu-list"),
			siteDropdown = document.getElementById("site-menu-dropdown"),
			siteSearch = document.getElementById("site-search");
			
			if(!(gNav && userMenuList && siteDropdown && siteSearch)) { return; }
			
			var dropdownLayout = new MenuLayout(siteDropdown),
			userMenuLayout = new MenuLayout(userMenuList),
			searchBoxLayout = new SearchBoxLayout(siteSearch);
			
			function resize() {
				searchBoxLayout.update();
				userMenuLayout.setProps();
				dropdownLayout.setProps();
				
				var 
				userMenuFixedTop = userMenuLayout.getFixedState("top"),
				dropdownFixedTop = dropdownLayout.getFixedState("top"),
				userMenuIsOverSearchBox = isOverSearchBox(userMenuLayout),
				dropdownIsOverSearchBox = isOverSearchBox(dropdownLayout),
				rightAdjust = parseInt(gNav.getStyle("padding-right")),
				topAdjust = (searchBoxLayout.bottom - userMenuLayout.top);
				
				if((userMenuLayout.isWrapping || dropdownLayout.isWrapping) && !userMenuFixedTop) {
					userMenuLayout.doFix("top", topAdjust);
					userMenuLayout.doFix("right", rightAdjust);
					dropdownLayout.doFix("right", rightAdjust);
				} else if(userMenuFixedTop && !userMenuIsOverSearchBox && !dropdownIsOverSearchBox && !userMenuLayout.isWrapping) {
					userMenuLayout.undoFix("top");
					userMenuLayout.undoFix("right");
					dropdownLayout.undoFix("right");
				}
				
				function isOverSearchBox(layout) {
					return (!layout.isWrapping && (searchBoxLayout.left < layout.right));
				}
				
				// Repositions ad pod on HTML store only if gnav gets resized - bug 97757
				if ((document.getElementById('ad_pod')) && (typeof repositionPromotionPod == "function")) {
					repositionPromotionPod ();
				}
			}
			
			resize();
			Event.observe(window, "resize", resize);
		}
	}

})();

registerOnLoad(adobe.gnavOverflowFix.init);