var data;

var z=0;

var url = "http://api.open-notify.org/iss-now.json";

var bg;//background image

var cx;//central x
var cy;//central y

var x;
var y;



var mapWidth = 800;
var mapHeight = 400;


var clat = 0;//center latitude
var clon = 0;//center longitude



function preload() {

  bg = loadImage("map.png");

}

function setup() {
  createCanvas(mapWidth, mapHeight);
  loadJSON(url, gotData, 'jsonp');

  




}

function gotData(data) {

  var lati = data.iss_position.latitude;
  var long = data.iss_position.longitude;
 
  cx = mercX(clon);
  cy = mercY(clat);

  x = mercX(long) - cx;
  y = mercY(lati) - cy;

}


function draw() {
  background(255);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  
  
  image(bg, 0, 0, mapWidth, mapHeight);

  noStroke();
  fill(1, 87, 155);

  if (z>x){   //for a better visual effect
    load();
  }
  
  
  ellipse(x, y, 5, 5);
  text("iss", x + 3, y + 3);



  stroke(0, 145, 234);
  line(z, -1*mapHeight/2, z, height);
  z = z + 1;
  if (z > 398) {
    z = -398;

  }





}

function load() { //asyncronous
  loadJSON(url, gotData, 'jsonp');

}


function mercX(lon) { //function to convert longitide to x coordinate
  long = radians(lon);

  var a = (mapWidth / (PI*2));
  var b = long + PI;
  return a * b;

}


function mercY(lat) {  //function to convert latitude to y coordinate
  lat = radians(lat);
  var a = (mapHeight / (PI*2));
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;


}


