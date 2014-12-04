var Browser = function($) {
	
	var self;
	
	$(function() {
		self = Browser;
		_checkSupport();
	});
	
	var _checkSupport = function() {
		self.supported = true;
		if(document.documentMode <= 10) {
			self.supported = false;
		}
	};
	
	var _isValid = function() {
		return self.supported;
	};
	
	return {
		isValid: _isValid
	};
}(jQuery);

var Animate = function() {
	
	var MIN_INTERVAL = 5, MAX_INTERVAL = 10; // in sec
	
	var _doAnimation = function(selector, animationType) {
		setTimeout(function() {
			$(selector).removeClass(animationType + ' animated');
			
			setTimeout(function() {
				$(selector).addClass(animationType + ' animated');
			}, 300);
			
			_doAnimation(selector, animationType);
			
		}, (Math.floor(Math.random() * ((MAX_INTERVAL + 1) - MIN_INTERVAL)) + MIN_INTERVAL) * 1000);
	};
	
	return {
		doAnimation: _doAnimation
	};
}(jQuery);