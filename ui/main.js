console.log('Loaded!');

var img = document.getElementById('url');
var marginLeft = 0;
function moveRight (){
	marginLeft = marginLeft + 2;
	img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function(){
	var interval = setInterval (moveRight, 5);	
};



// counter code //
var button = document.getElementById('counter');
button.onclick = function () {
//create a request object
	var request = new XMLHttpRequest();

//capture the response and store it in a variable
	request.onreadystatechange = function() {
		if (request.readyState === XMLHttpRequest.DONE) {
//take some action
			if(request.status === 200) {
				var counter = request.responseText; 
				var span = document.getElementById('count');
				span.innerHTML = counter.toString();
			}
		}


	};


//make the request
	request.open('GET', 'http://kapcha.imad.hasura-app.io/counter', true);
	request.send(null);
};


// submit name //


var submit = document.getElementById('submit_btn');
submit.onclick = function (){
	//make a request //
	var request = new XMLHttpRequest();

//capture the response and store it in a variable
	request.onreadystatechange = function() {
		if (request.readyState === XMLHttpRequest.DONE) {
//take some action
			if(request.status === 200) {
			var names = request.responseText;
			names = JSON.parse(names);
var list = '';
	for (var i=0; i< names.length; i++) {
	list += '<li>' + names[i] + '</li>';
}
var ul = document.getElementById('namelist');
ul.innerHTML = list;
			}
		}


	};


//make the request
var nameInput = document.getElementById('name');
var name = nameInput.value;
request.open('GET', 'http://kapcha.imad.hasura-app.io/submit-name?name='+name, true);
request.send(null);
	
	//capture a list of names and render it as a list//

};

var img = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

img.src = '/images/iron.jpg';
var CanvasXSize = 2000 ;
var CanvasYSize = 300;
var speed = 2; //lower is faster
var scale = 1.05;
var y = -4.5; //vertical offset

// Main program

var dx = 0.75;
var imgW = 2000;
var imgH;
var x = 0;
var clearX;
var clearY;
var ctx;

img.onload = function() {
    imgW = img.width * scale;
    imgH = img.height * scale;
    if (imgW > CanvasXSize) { x = CanvasXSize - imgW; } // image larger than canvas
    if (imgW > CanvasXSize) { clearX = imgW; } // image larger than canvas
    else { clearX = CanvasXSize; }
    if (imgH > CanvasYSize) { clearY = imgH; } // image larger than canvas
    else { clearY = CanvasYSize; }
    //Get Canvas Element
    ctx = document.getElementById('canvas').getContext('2d');
    //Set Refresh Rate
    return setInterval(draw, speed);
}

function draw() {
    //Clear Canvas
    ctx.clearRect(0, 0, clearX, clearY);
    //If image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = 0; }
        //draw aditional image
        if (x > (CanvasXSize - imgW)) { ctx.drawImage(img, x - CanvasXSize + 1, y, imgW, imgH); }
    }
    //If image is > Canvas Size
    else {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = CanvasXSize - imgW; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx.drawImage(img, x - imgW + 1, y, imgW, imgH); }
    }
    //draw image
    ctx.drawImage(img, x, y,imgW, imgH);
    //amount to move
    x += dx;
}

function clock() {
  var now = new Date();
  var ctx = document.getElementById('clock').getContext('2d');
  ctx.save();
  ctx.clearRect(0, 0, 150, 150);
  ctx.translate(75, 75);
  ctx.scale(0.4, 0.4);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';

  // Hour marks
  ctx.save();
  for (var i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Minute marks
  ctx.save();
  ctx.lineWidth = 5;
  for (i = 0; i < 60; i++) {
    if (i % 5!= 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();
 
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr  = now.getHours();
  hr = hr >= 12 ? hr - 12 : hr;

  ctx.fillStyle = 'black';

  // write Hours
  ctx.save();
  ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) *sec);
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // write Minutes
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();
 
  // Write seconds
  ctx.save();
  ctx.rotate(sec * Math.PI / 30);
  ctx.strokeStyle = '#D40000';
  ctx.fillStyle = '#D40000';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(83, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#325FA2';
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.restore();

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);
