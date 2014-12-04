var Form = function() {
	
	var _init = function() {
		$('.container.contact').show();
		$('input').val(''); // Clear in case of history exist
		setTimeout(function() {
			$('#contactForm').show();
			_focus();
		}, 1000);
		_validation();
	};
	
	var _validation = function() {
		$('#contactForm').bootstrapValidator({
			// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
			feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				completeName: {
					message: 'The name is not valid',
					validators: {
							notEmpty: {
									message: 'Please specifiy your full name'
							},
							regexp: {
									regexp: /([a-öA-Ö\-]+){2,}\s+([a-öA-Ö\-]+){2,}/,
									message: 'Please specify your first and last name'
							}
					}
				},
				email: {
					validators: {
						notEmpty: {
								message: 'Please specify your e-mail'
						},
						regexp: {
								regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
								message: '<b></b>' // This is a bug in the plugin
						}
					}
				},
				address: {
					validators: {
						notEmpty: {
								message: 'Please specify your address'
						},
						regexp: {
								regexp: /([a-öA-Ö0-9\-]+){4,}/, // Well, four characters should be entered at least 
								message: '<b></b>'
						}
					}
				},
				zipCode: {
					validators: {
						notEmpty: {
								message: 'Please specify your zip code'
						},
						regexp: {
								regexp: /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/,
								message: '<b></b>'
						}
					}
				},
				city: {
					validators: {
						notEmpty: {
								message: 'Please specify your city'
						},
						regexp: {
								regexp: /([a-öA-Ö\-]+){1,}/, // At least one character..
								message: '<b></b>'
						}
					}
				},
				artist: {
					validators: {
						notEmpty: {
								message: 'Please specifiy your favorite artist ;)'
						},
						regexp: {
								regexp: /([a-öA-Ö\-]+){1,}/, // At least one character..
								message: '<b></b>'
						}
					}
				}
			}
		})		
	};
	
	var _focus = function() {
		var el = $('#contactForm').find('input[type=text],input[type=password],input[type=radio],input[type=checkbox],textarea,select').filter(':visible:first');
		if(el !== undefined && el.length !== 0) {
			el.focus();
		}
	};
	
	return {
		init: _init
	}
	
}(jQuery);

$(document).ready(function() {
	
	// Initialize
	var browser = Browser;
	if(browser.isValid()) {
		Form.init();
		Animate.doAnimation('h2.intro-text', 'pulse'); // Trigger animation
		$('.box:first').addClass('zoomIn animated');
	}
	else {
		alert('You are using an old IE version. Please go to http://browsehappy.com to read more');
	}
	
});