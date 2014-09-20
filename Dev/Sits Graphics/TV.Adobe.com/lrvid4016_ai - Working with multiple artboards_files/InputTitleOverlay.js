/*--- $Id: InputTitleOverlay.js,v 1.8 2008/10/29 18:45:12 mok Exp $ ---*/
adobe.InputTitleOverlay = (function() {
/*--- To-do: 
		Decide if this needs maintain state for communication with other objects
		If so, create an object oriented approach without storing too many object references ---*/ 
	function _init(id) {
		this.input = $(id);
		this.title = this.input.getAttribute("title");
		this.inputTitle = this.input.getAttribute("title");	
		this.form = this.input.form;
		
		if(!this.title) { return; }
		
		if(!this.input.value) {	this.input.value = this.title; }
		
		Event.observe(this.input,"focus", handleFocus);
		Event.observe(this.input,"blur", handleBlur);
		Event.observe(this.form, "submit", handleSubmit.bindAsEventListener(this));
	}
	
	function _initBlur(id) 
	{
		this.BlurInput = $(id);
		this.BlurTitle = this.BlurInput.getAttribute("title");
		this.BlurInputTitle = this.BlurInput.getAttribute("title");	
		this.Blurform = this.BlurInput.form;
		
		if(!this.BlurTitle) { return; }
		
		if(!this.BlurInput.value) {	this.BlurInput.value = this.BlurTitle; }
		
		Event.observe(this.BlurInput,"focus", handleFocus);
		Event.observe(this.BlurInput,"blur", handleBlur);
		Event.observe(this.Blurform, "submit", handleSubmit.bindAsEventListener(this));
	}
	
	function handleFocus(event) {
		var el = event.element();
		if(!el.getAttribute) { return }
		if(el.value == el.getAttribute("title")) {
			el.value = "";
		}
	}
	
	function handleBlur(event) {
		var el = event.element();
		if(el.value) {
			return;
		} else {
			el.value = el.getAttribute("title");
		}
	}
	
	/*--- don't allow "Search for..." to be term value ---*/
	function handleSubmit(event) {
		event.stop();
		if(this.input.value==this.inputTitle) { this.input.value=""; }		
		this.form.submit();	
	}
	
	return {
		init: function(e) {
			return _init(e);
		},
		initBlur : function(e) {
			return _initBlur(e);	
		}
	}
})();