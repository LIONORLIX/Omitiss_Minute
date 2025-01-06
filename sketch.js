let gridSize;
let timeRadius;
let minRadius;
let centerPosX;
let centerPosY;
let coreSize = 400;
let marginSize = 50;

function setup() {

  let canvas = createCanvas(coreSize+marginSize*2, coreSize+marginSize*2);
  canvas.parent('canvas-container');
  angleMode(DEGREES);

  gridSize = coreSize/24;

  centerPosX = marginSize+gridSize*12;
  centerPosY = marginSize+gridSize*15;

  timeRadius = Math.sqrt( (gridSize*2)**2 + (gridSize*5)**2 )
  hourLength = gridSize*8;
  minRadius = Math.sqrt( (gridSize*2)**2 + (gridSize*4)**2 )
}

function getLocalTime(){
  let now = new Date(); // 获取当前时间
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let milliseconds = now.getMilliseconds();
  
  // 转换为整数
  let hour = hours + minutes / 60 + seconds / 3600 + milliseconds / 3600000; // 向下取整
  let minute = minutes + seconds / 60 + milliseconds / 60000; // 向下取整
  let second = seconds + milliseconds / 1000; // 向下取整
  
  console.log("hour: ", hour);
  console.log("min: ", minute);
  console.log("sec: ", second);
  
  return { hour: hour, min: minute, sec: second }; // 返回对象以包含多个值
  
}

function drawHouse(){
  fill(0);
  stroke(255);
  // Start drawing the shape.
  beginShape();
  // Add vertices.
  vertex(marginSize+gridSize*12, marginSize+gridSize*1);
  vertex(marginSize+gridSize*1, marginSize+gridSize*12);
  vertex(marginSize+gridSize*1, marginSize+gridSize*23);
  vertex(marginSize+gridSize*23, marginSize+gridSize*23);
  vertex(marginSize+gridSize*23, marginSize+gridSize*12);
  // Stop drawing the shape.
  endShape(CLOSE);
}

function drawHour(hour){
  fill(255);
  stroke(0);
  ellipse(centerPosX+cos(hour*6-90)*timeRadius, centerPosY+sin(hour*6-90)*timeRadius, minRadius*2);
}

function drawMin(min){
  fill(255);
  stroke(0);
  rect(centerPosX+cos(min*30-90)*timeRadius-hourLength/2, centerPosY+sin(min*30-90)*timeRadius-hourLength/2, hourLength, hourLength);
}

function drawScale(){
  stroke(255);
  strokeWeight(0.5);
  let innerRadius = gridSize*5.4
  let outerRadius = gridSize*5.8
  for (let i=0; i<60; i++){
    line(centerPosX+cos(i*6-90)*innerRadius,centerPosY+sin(i*6-90)*innerRadius,centerPosX+cos(i*6-90)*outerRadius,centerPosY+sin(i*6-90)*outerRadius)
  }
}

function drawSec(sec){
  stroke(255);
  line(centerPosX,centerPosY,centerPosX+cos(sec*6-90)*coreSize,centerPosY+sin(sec*6-90)*coreSize);
}

function draw() {
  background(255);
  drawHouse();
  drawScale();
  drawSec(getLocalTime().sec)
  drawMin(getLocalTime().min);
  drawHour(getLocalTime().hour);
}