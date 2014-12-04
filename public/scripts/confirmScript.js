$(document).ready(function() {
	Music.load($('input[name="artist"]').val().toLowerCase());
});

var Summary = function() {

	var _show = function(topTracks) {
		
		$('#loadingSection').remove();
		
		var $ps = $('#presentationSection');
		$ps.find('h4').html('Thanks for the submit! We´ve received the following details from you');
		
		setTimeout(function() {
		
			// Address info
			setTimeout(function() {
				$ps.find('.interest div.address').html(
					$('input[name="address"]').val() + getSep(',') +
					$('input[name="zipCode"]').val() + getSep('') +
					$('input[name="city"]').val() + getSep(''));
			}, 600);
		
			$('.interest .glyphicon-home').show().addClass('bounce animated');
		}, 400);
		
		setTimeout(function() {
			// Person
			setTimeout(function() {
				$ps.find('.interest div.person').html(
					$('input[name="completeName"]').val() +
					'&nbsp;[' + $('input[name="email"]').val() + ']');
				}, 600);
				
			$('.interest .glyphicon-user').show().addClass('bounce animated');
		}, 1500);
		
		setTimeout(function() {		
			// Message
			setTimeout(function() {
				var m = $('input[name="message"]').val();
				$ps.find('.interest div.message').html(m === '' ? '<i>No message specified</i>' : m);
			}, 600);
			
			$('.interest .glyphicon-pencil').show().addClass('shake animated');
			
		}, 2600);
		
		setTimeout(function() {
			// Music
			setTimeout(function() {
				var $tracks = $ps.find('.interest div.tracks');
				if(topTracks === undefined || topTracks.length === 0) {
					$tracks.html('Sorry, failed to get information from the artist <i>' + $('input[name="artist"]').val() + '</i>');
				}
				else {
					$.each(topTracks, function(i, val) {
						$ps.find('.interest div.tracks').append(val);
					});
				}
				
				var at = 'tada';
				$('.interest .glyphicon-music').show().addClass(at + ' animated');
				Animate.doAnimation('.interest .glyphicon-music', at);
			});
		}, 3700);
		
		$('#presentationSection').show();
		
		function getSep(sign) {
			return '<span>' + sign + '&nbsp;</span>';
		}
	};

	return {
		show: _show
	};
}(jQuery);

var Music = function() {
	
	var self;
	
	var _getIframe = function() {
		var src = 'https://open.spotify.com/artist/' + self.artistId;
		return '<iframe id="spotifyIframe" src="' + src + '" height="700px" width="100%" style="margin-top: 6em;"></iframe>';
	};
	
	var _loadInformation = function() {
		if(self.currentArtist !== undefined && self.currentArtist.href !== undefined) {
			
			self.artistId = self.currentArtist.href.split(':')[2];
			
			// Set artist presentation
			$('#presentationSection').append(_getIframe());
			
			// Load top tracks for this artist
			_loadTopTracks();
		}
		else {
			Summary.show();
		}
	};
	
	var _loadTopTracks = function() {
		$.ajax({
			type: "GET",
			url: encodeURI('https://api.spotify.com/v1/artists/' + self.artistId + '/top-tracks?country=SE'), // In case of space or other things mess up things
			data: { },
			async: true
		})
		.done(function( data ) {
			if(data !== undefined && data.length !== 0 && data.tracks.length !== 0) {
				var tt = [];
				$.each(data.tracks, function(i, val) {
					if(tt.length === 3) {
						return false;
					}
					else {
						var separator = tt.length === 2 ? '' : '&nbsp;&nbsp;|&nbsp;&nbsp',
							album = val.album !== undefined ? ('[Album ' + val.album.name + ']' + separator) : '';
							
						tt.push('<b>' + val.name + '</b>' + album);
					}
					
				});
				
				Summary.show(tt);
			}
		});
	}
	
	var _load = function(artistName) {
		
		self = this;
		
		$.ajax({
			type: "GET",
			url: encodeURI('http://ws.spotify.com/search/1/artist.json?q=' + artistName), // In case of space or other things mess up things
			data: { },
			async: true
		})
		.done(function( data ) {
			if(data !== undefined && data.length !== 0 && data.artists.length !== 0) {
				/*
				* In case of multiple hit of the artist. Would have been nice with a flag, something like "exact=true"
				* But that is not supported by the API, what I can see.
				* Take the first match, highest popularity first.
				*/				
				$.each(data.artists, function(i, val) {
					if(val.name.toLowerCase() === artistName) {
						self.currentArtist = val;
						return false; // Okey, we got it
					}
				});
				
				// Delay the next phase a bit just for the visualization to be shown..
				setTimeout(function() {
					
					// Initialize information about this artist
					_loadInformation();
					
				}, 3000);
				
			}
			else {
				// SORRY, couldn´t find anything
				Summary.show();
			}
		});
	};

	return {
		load: _load
	}
}(jQuery);