var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var pages ={
PROFILE:{
    title:'PROFILE | KAPIL',
    heading:'My Profile',
    date:'21/feb/2017',
    content:      
            `<p>
            Hello! Everyone here i am the developer of this web page 
            name KAPIL CHAUDHARY
            i am one of the enthusiastic student here.
            </p>    
            <p>
            Thnx for visiting my profile page.
            </p>`
},
QUALIFICATION:{
    title:'QUALIFICATION | KAPIL',
    heading:'My Qualification',
    date:'21/feb/2017',
    content:      
            ` <p>I have completed my Graduation (Bachelor of Technology) in ECE.
            from DCRUST, Murthal (Haryana)
            </p>`
},
LIFEGOALS:{
    title:'LIFE GOALS | KAPIL',
    heading:'Life Goals',
    date:'21/feb/2017',
    content:   
            `<p>Though everyone have their own life plans and goals but am very specific to be a respectful human and a good citizen for my surroundings and live a happy and prosper life.
                that one always have dream of.
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
  res.send(createTemplate(QUALIFICATION)); 
});

app.get('/3', function (req, res) {
 res.send(createTemplate(LIFEGOALS)); 
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
