var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var pages ={
'1':{
    title:'PROFILE | KAPIL',
    heading:'My Profile',
    date:'19/feb/2017',
    content:`
            <script>
            alert ('click OK to ENTER')
            </script>
            <p>
            Hello! Everyone here i am the developer of this web page 
            name KAPIL CHAUDHARY
            i am one of the enthusiastic student.
            </p>
            
            <p>
            Thnx for visiting my profile page.
            </p>`
},
'2':{
    title:'QUALIFICATION | KAPIL',
    heading:'My Qualification',
    date:'20/feb/2017',
    content:`
            <script>
            alert ('click OK to ENTER')
            </script>
            <p>
                    I have completed my Graduation (Bachelor of Technology) in ECE.
                    from DCRUST, Murthal (Haryana)
            </p>`
},
'3':{
    title:'LIFE GOALS | KAPIL',
    heading:'Life Goals',
    date:'21/feb/2017',
    content:`
            <script>
            alert ('click OK to ENTER')
            </script>
            <p>Though everyone have their own life plans and goals but am very specific to be a respectful human and a good citizen for my surroundings and live a happy and prosper life.
            </p>
             <p>
                That everyone always have dream of.
            </p>`
},
};


function createTemplate (data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    
    //template for all html pages//
var htmlTemplate=`
    <html class="life">
    <head>
        <title>     ${title}
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
                    ${date}
                </h4>
            </div>
            <div>
                    ${content}
            </div>
         </div>
         <script type="text/javascript" src="/ui/main.js">
        </script>
     </body>
     <img src="/ui/hulk.png" class="img-new" />
    </html>
    `;
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:page', function (req, res) {
  var page = req.params.page;
  res.send(createTemplate(pages[page]));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/url.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'url.png'));
});

                          // custom bg files //
                          
app.get('/ui/life.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'life.jpg'));
});

app.get('/ui/hulk.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'hulk.png'));
});

app.get('/ui/mark-suit.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'mark-suit.png'));
});

app.get('/ui/kapil.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'kapil.png'));
});

app.get('/ui/back.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'back.gif'));
});

app.get('/ui/page2.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'page2.png'));
});

app.get('/ui/page1.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'page1.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
