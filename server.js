var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var PROFILE={
    title:'Profile | KAPIL',
    heading:'MY PROFILE',
    date:'15-feb-2017',
    content:        `<p>
                        Hello! Everyone here i am the developer of this web page 
                        name KAPIL CHAUDHARY
                        i am one of the enthusiastic student here.
                    </p>    
                    <p>
                        Thnx for visiting my profile page.
                    </p>`
};

function createTemplate (data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
var htmlTemplate=`
    <html>
    <head>
        <title>     ${title}
        </title>
        <link href="/ui/style.css" rel="stylesheet" />
        
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
                    ${date}
                </h4>
            </div>
            <div>
                    ${content}
            </div>
         </div>
     </body>
    </html>
    `;
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/1', function (req, res) {
  res.send(createTemplate(PROFILE));
});

app.get('/2', function (req, res) {
  res.sendfile(path.join(__dirname, 'ui', 'qualification.html')); 
});

app.get('/3', function (req, res) {
 res.sendfile(path.join(__dirname, 'ui', 'life goals.html')); 
});





app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
