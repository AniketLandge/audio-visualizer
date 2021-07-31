const audioEl = document.getElementById('audio');
const c = document.getElementById('progress');
const ctx = c.getContext('2d');

let arr = [];
let barSpace = 6;
let seconds = 60;
let barMaxHeight = 300;
let barMinHeight = 100;
let barWidth = 2;
let isPlaying = false;
const element = document.getElementById('audioControlIcon');

CanvasRenderingContext2D.prototype.roundRect = function (
  x,
  y,
  width,
  height,
  radius
) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  this.beginPath();
  this.moveTo(x + radius, y);
  this.arcTo(x + width, y, x + width, y + height, radius);
  this.arcTo(x + width, y + height, x, y + height, radius);
  this.arcTo(x, y + height, x, y, radius);
  this.arcTo(x, y, x + width, y, radius);
  this.closePath();
  return this;
};

audioEl.addEventListener('loadedmetadata', function () {
  let totalBar = audioEl.duration;
  for (let i = 0; i < totalBar; i++) {
    let height = Math.floor(Math.random() * barMaxHeight) + barMinHeight;
    arr.push(height);
  }

  drawBar(-1);
});

//event listener for finding bar no
//here 1 bar represent 1 second
c.addEventListener('click', function (e) {
  let xAxis = e.clientX;
  let mod = xAxis % barSpace;

  if (mod < barSpace / 2) xAxis = xAxis - mod;
  else xAxis = xAxis + (barSpace - mod);
  console.log(xAxis);
  let selectedBar = xAxis / barSpace;
  pushForward(selectedBar);
});

//function for forward music
//on click of visulizer
function pushForward(time) {
  audioEl.currentTime = time;
}

function updateBar() {
  let currentTime = audioEl.currentTime;
  let duration = audioEl.duration;

  drawBar(currentTime);
}

//function to draw no of bar
//on the basis of music timing
function drawBar(currentTime) {
  ctx.clearRect(0, 0, c.width, c.height);

  let totalBar = Math.floor(audioEl.duration);
  let x = barSpace;
  for (let i = 0; i < totalBar; i++) {
    let height = arr[i];
    let y = Math.floor((barMaxHeight - height) / 2);
    ctx.beginPath();

    ctx.rect(x, y, barWidth, height);

    ctx.fillStyle = i < currentTime ? '#FF0000' : '#FFFFFF';
    ctx.fill();

    x += barSpace;
  }
  let toolTipColor1 = '#02d11d';
  let toolTipColor2 = '#16c78b';
  let toolTipColor3 = '#1b07bd';
  let toolTipColor4 = '#996c68';
  let toolTipColor5 = '#659a40';
  drawRoundRect(20, 60, 200, 30, 8, toolTipColor1);
  drawLine(110, 90, 6, 56, toolTipColor1);
  drawCircle(113, 150, 10, 0, 2 * Math.PI, toolTipColor1);
  drawText('Introduction', 120, 80);

  drawRoundRect(300, 20, 150, 30, 8, toolTipColor2);
  drawLine(370, 50, 6, 92, toolTipColor2);
  drawCircle(373, 150, 10, 0, 2 * Math.PI, toolTipColor2);
  drawText('One_Six', 380, 40);

  drawRoundRect(810, 80, 130, 30, 8, toolTipColor3);
  drawLine(870, 92, 6, 50, toolTipColor3);
  drawCircle(873, 150, 10, 0, 2 * Math.PI, toolTipColor3);
  drawText('Polite', 875, 100);

  drawRoundRect(720, 42, 230, 30, 8, toolTipColor4);
  drawLine(920, 46, 6, 96, toolTipColor4);
  drawCircle(923, 150, 10, 0, 2 * Math.PI, toolTipColor4);
  drawText('Rapport Building - Empathy', 835, 60);

  drawRoundRect(780, 2, 260, 30, 8, toolTipColor5);
  drawLine(1020, 32, 6, 110, toolTipColor5);
  drawCircle(1023, 150, 10, 0, 2 * Math.PI, toolTipColor5);
  drawText('Rapport Building - Energy', 900, 22);
}

//toggle play/pause

function togglePlaying() {
  if (isPlaying) {
    isPlaying = false;
    audioEl.pause();
    element.className = 'fas fa-play fa-2x play-icon';
  } else {
    isPlaying = true;
    audioEl.play();

    element.className = 'fas fa-pause fa-2x play-icon';
  }
}

function drawRoundRect(xAxis, yAxis, width, height, radius, color) {
  ctx.roundRect(xAxis, yAxis, width, height, radius);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(xAxis, yAxis, width, height, color) {
  ctx.rect(xAxis, yAxis, width, height);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawCircle(x, y, r, sAngle, eAngle, counterclockwise, color) {
  ctx.arc(x, y, r, sAngle, eAngle, counterclockwise);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawText(text, x, y) {
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = '18px Arial';
  ctx.fillText(text, x, y);
}

function load() {
  element.className = 'fas fa-play fa-2x play-icon';
}
