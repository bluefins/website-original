// JavaScript Document
	var openerStep = 0;
	var openerSteps = 10;
	var openerHeight = -1; 
	var openerDirection = 1;
	
	function toggleEmailHeader(){
		if (openerHeight==-1) {
			openerHeight = document.getElementById("contactBannerInner").offsetHeight;
		}					
		if ((openerDirection==1 && openerStep < openerSteps) || (openerDirection==-1 && openerStep > 0)){
			openerStep = openerStep + openerDirection;
			propor = ((Math.sin(((((openerStep) / openerSteps) * 2) - 1) * (Math.PI/2))) + 1) / 2;
			currentHeight = parseInt (openerHeight * propor);
			document.getElementById("contactBannerOpener").style.height = currentHeight+"px";
			if (openerStep>=10) {
				openerDirection = -1;
				document.getElementById("emailUsButton").className= "emailUsOpen";
			} else {
				if (openerStep <=0) {
					openerDirection = 1;
					document.getElementById("emailUsButton").className= "emailUsClosed";
				} else {
					setTimeout ("toggleEmailHeader()", 25);
				}
			}
		}
		return false; 
	}
	
	function initGallery (imageCount){
		thisObject = new Object();
		thisObject.currentImage = 1;
		thisObject.counter = 0;
		thisObject.startPos = 0;
		thisObject.endPos = 0;
		thisObject.steps = 30;
		thisObject.ticks = 25;
		thisObject.moveDistance = 480;
		thisObject.imageCount = imageCount;
		thisObject.timer = window.setTimeout("goNextSlide()", 15000)
		return thisObject;
	}
	function goNextImage () {
		nextImage = galleryObject.currentImage + 1;
		if (nextImage > galleryObject.imageCount - 1) {
			nextImage = 1;
		}
		goImage (nextImage);
		return false;
	}
	function goPrevImage () {
		nextImage = galleryObject.currentImage - 1;
		if (nextImage < 1) {
			nextImage = galleryObject.imageCount;
		}
		goImage (nextImage);
		return false;
	}
	function goImage (which){
		if (galleryObject.counter == 0) {
			window.clearTimeout (galleryObject.timer);
			galleryObject.currentImage = which;
			galleryObject.endPos = (which - 1) * -1 * galleryObject.moveDistance;
			galleryObject.timer = window.setTimeout("slide()", galleryObject.ticks);
		}
		for (f=1;f<=3;f++) {
			if ((f * 2)==galleryObject.currentImage||((f * 2) - 1)==galleryObject.currentImage) {
				document.getElementById("galleryButton"+f).className="over";
			} else {
				document.getElementById("galleryButton"+f).className="";
			}
		}
		return false;
	}
	function slide() {
		galleryObject.counter++;
		propor = ((Math.sin(((((galleryObject.counter) / galleryObject.steps) * 2) - 1) * (Math.PI/2))) + 1) / 2;
		currentPos = parseInt (((galleryObject.endPos - galleryObject.startPos) * propor) + galleryObject.startPos);
		document.getElementById("gallerySlider").style.left = currentPos+"px";
		if (galleryObject.counter < galleryObject.steps) {
			galleryObject.timer = window.setTimeout("slide()", galleryObject.ticks);
		} else {
			galleryObject.startPos = galleryObject.endPos;
			galleryObject.counter = 0;
			galleryObject.timer = window.setTimeout("goNextSlide()", 15000);
		}		
	}
	
	
	
	////home page slides
	function initHomeSlides (slideCount, slideWidth){
		thisObject = new Object();
		thisObject.currentSlide = 1;
		thisObject.counter = 0;
		thisObject.startPos = -1 * slideWidth;
		thisObject.endPos = 0;
		thisObject.steps = 50;
		thisObject.ticks = 15;
		thisObject.maxSlides = slideCount;
		thisObject.slideWidth = slideWidth;
		thisObject.timer = window.setTimeout("goNextHomeSlide()", 8000);
		return thisObject;
	}
	function goNextHomeSlide () {
		nextSlide = slideObject.currentSlide + 1;
		if (nextSlide > slideObject.maxSlides) {
			nextSlide = 1;
		}
		goHomeSlide (nextSlide);
	}
	function goHomeSlide (which){
		if (slideObject.counter == 0) {
			window.clearTimeout (slideObject.timer);
			slideObject.currentSlide = which;
			thisObject.endPos = ((which - 1) * slideObject.slideWidth * -1) - slideObject.slideWidth;
			slideObject.timer = window.setTimeout("homeSlide()", slideObject.ticks);
		}
		for (f=1;f<=slideObject.maxSlides;f++) {
			if (f==slideObject.currentSlide) {
				document.getElementById("homeSlideButton"+f).className="over";	
			} else { 
				document.getElementById("homeSlideButton"+f).className="";	
			}
		}
		return false;
	}
	function homeSlide() {
		slideObject.counter++;	
		propor = ((Math.sin(((((slideObject.counter) / slideObject.steps) * 2) - 1) * (Math.PI/2))) + 1) / 2;
		currentPos = parseInt (((slideObject.endPos - slideObject.startPos) * propor) + slideObject.startPos);
		document.getElementById("homeSlideInner").style.left = currentPos+"px";
		
		if (slideObject.counter < slideObject.steps) {
			slideObject.timer = window.setTimeout("homeSlide()", slideObject.ticks);
		} else {
			slideObject.startPos = slideObject.endPos;
			slideObject.counter = 0;
			slideObject.timer = window.setTimeout("goNextHomeSlide()", 8000);
		}		
	}
	
	function initSlider(slideCount, slideWidth, ele, timeoutTicks){
		this.currentSlide = 1;
		this.counter = 0;
		this.startPos = 0;
		this.endPos = 0;
		this.steps = 30;
		this.ticks = 15;
		this.maxSlides = slideCount;
		this.slideWidth = slideWidth;
		
		if (typeof (timeoutTicks)=="undefined") {
			this.timeoutTicks = 0;
			this.timer = null;			
		} else {
			this.timeoutTicks = timeoutTicks * 1000;
			var _this = this;
			setTimeout(function() { _this.goNext(); }, this.timeoutTicks);			
		}		
		this.ele = ele;
		this.goPrev=function(){
			nextImage = this.currentSlide - 1;
			if (nextImage <= 0){
				nextImage = this.maxSlides;
			}
			this.goImage (nextImage);
			return false;
		}
		this.goNext=function(){
			nextImage = this.currentSlide + 1;
			if (nextImage > this.maxSlides){
				nextImage = 1;
			}
			this.goImage (nextImage);
			return false;
		}
		this.goImage=function(which){
			if (this.counter == 0) {
				window.clearTimeout (this.timer);
				this.start();
				this.currentSlide = which;
				this.endPos = (which - 1) * -1 * this.slideWidth;
				var _this = this;
				setTimeout(function() { _this.slide(); }, this.ticks);
			}			
			return false;
		}
		this.slide = function() {
			this.counter++;
			propor = ((Math.sin(((((this.counter) / this.steps) * 2) - 1) * (Math.PI/2))) + 1) / 2;
			currentPos = parseInt (((this.endPos - this.startPos) * propor) + this.startPos);
			this.ele.style.left = currentPos+"px";
			var _this = this;
			if (this.counter < this.steps) {
				this.timer = setTimeout(function() { _this.slide(); }, this.ticks);
			} else {
				this.startPos = this.endPos;
				this.counter = 0;
				this.end();
				if (this.timeoutTicks > 0) {
					this.timeoutTicks = timeoutTicks * 1000;
					this.timer = setTimeout(function() { _this.goNext(); }, this.timeoutTicks);		
				}	
			}		
		}
		this.start=function (){}
		this.end=function (){}
	}
	
	var clearedFields = new Array();
	function clearDefault(ID){
		var found = false;
		for (f=0;f<clearedFields.length;f++) {
			if (clearedFields[f]==ID){
				found = true;
			}
		}
		if (found==false) {
			document.getElementById(ID).value="";
			clearedFields.push (ID);
		}
	}