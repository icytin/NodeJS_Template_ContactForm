/*
 * Module dependencies
 */
var express = require('express'),
		engines = require('consolidate'),
		bodyParser = require('body-parser');

var app = express();

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache); // Apply view engine
app.set('view engine', 'html');

app.use(express.logger('dev'));

app.use(bodyParser.json()); // JSON-encoded bodies
app.use(bodyParser.urlencoded({ // .. and URL-encoded bodies
  extended: true
}));

app.use(express.static(__dirname + '/public'));

// Default action
app.get('/', function (req, res) {
  res.render('master',
		{
			title : 'A Company',
			partials: {
				head: 'head', 
				contactForm: 'contactForm',
				globalScripts: 'globalScripts'
			}
		}
  )
});

// Form submit
app.post('/SubmitForm', function (req, res) {
	
	var title = 'A Company';
	
	// default partials
	var partials = {
		head: 'head',
		globalScripts: 'globalScripts',
		confirm: 'confirm'
	};
			
	// Ignore server-side validation and assumes everything is ok
	var o = req.body;
	if(o.address === '' || o.artist === '' || o.city === '' || o.completeName === '' || o.email === '' || o.zipCode === '') {
		// On fail
		partials = {
			title : title,
			head: 'head',
			globalScripts: 'globalScripts',
			fail: 'fail'
		}
	}
	
  res.render('master', {
			title : title,
			req : o,
			partials: partials
		}
  )
});

// In case of this url is entered by the user. Never mind, but it´s a cleaner solution to render the default page instead of an error route.
app.get('/SubmitForm', function (req, res) {
	res.redirect('/');
});

app.listen(3000);