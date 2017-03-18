var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
	user: 'kapcha',
	database: 'kapcha',
	host: 'db.imad.hasura-app.io',
	port: '5432',
	password: 'db-kapcha-31363',
};

var app = express();
app.use(morgan('combined'));

function createTemplate (data){
var title = data.title;
var date = data.date;
var heading = data.heading;
var content = data.content;

var htmlTemplate = `
<html class="life">
    <head>
        <title>
		${title}
        </title>
        <link href="/ui/style.css" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <div class="container">
            <div>
                    <a href="/">Home Page</a>
                    <hr/>
            </div>
            <h2>
                 ${heading}
            </h2>
            <div>
                <h4>
                 ${date.toDateString()}
                </h4>
            </div>
            <div>
                 ${content}
            </div>
         </div>
         <script type="text/javascript" src="/ui/main.js">
        </script>
	<img src="/images/hulk.png" class="img-new" />
     </body>
 </html>


`;
	    return htmlTemplate;
}
		
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

		// pageName == page1 //
		// pages[pageName] == {} content object for page1 //
var pool = new Pool(config);
app.get('/test-db', function (req, res){
	//make a select request
	////return a response with the result
	pool.query("SELECT * FROM test", function (err, result){
	if(err) {
		res.status(500).send(err.toString());
	}
        else{
		res.send(JSON.stringify(result.rows));
	  }
	});
});

var counter = 0;
app.get('/counter', function (req, res) {
	counter = counter + 1;
	res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) {
		//get the name from request//
var name = req.query.name;
names.push(name);
res.send(JSON.stringify(names));
});


app.get('/pages/:pageName', function (req, res) {
	//articleName== page1
	//pages[pageName] == {} content object for page1
	
	//SELECT * FROM pages WHERE title = '\';DELETE WHERE a = \'asdf'       ===injection(hacking)
	//use $1 arguments
  pool.query("SELECT * FROM pages WHERE title = $1", [req.params.pageName], function(err, result){
	  if(err) {
	  res.status(500).send(err.toString());
	  } else {
	  	if(result.rows.length === 0) {
			res.status(404).send('Page not found');
		} else {
			var articleData = result.rows[0];
			res.send(createTemplate(articleData));
		}
	  }
  });

});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res){
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/hulk.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'hulk.png'));
});

app.get('/ui/life.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'life.jpg'));
});

app.get('/ui/url.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'url.png'));
});

app.get('/ui/back.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'back.gif'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`WOW! IMAD course app listening on port ${port}!`);
});

