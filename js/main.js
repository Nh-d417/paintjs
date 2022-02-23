const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#000";


canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event){
  //offset : 캔버스 부분과 관련
  //clientX,Y : 윈도우 전체의 범위 내에서 마우스 위치 값
  const x = event.offsetX;
  const y = event.offsetY;

  if(!painting){  
    // painting = false
    // beginPath - 경로 생성
    // moveTo - 선 시작 좌표
    ctx.beginPath();
    ctx.moveTo(x, y);
  }else{         
    // painting = true
    // lineTo - 선 끝 좌표
    // stroke - 선 그리기
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPainting(){
  painting = true;
}

function stopPainting(){
  painting = false;
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChage(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(){
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill"
  }else{
    filling = true;
    mode.innerText = "Paint"
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleContextMenu(event){
  //우클릭 방지
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image
  link.download = "PaintJS";
  link.click();
}

if(canvas){
  canvas.addEventListener("mousemove",onMouseMove );
  canvas.addEventListener("mousedown",startPainting);
  canvas.addEventListener("mouseup",stopPainting);
  canvas.addEventListener("mouseleave",stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu);
}

//colors가 오브젝트(콜렉션)형식으로 반환
//Array.from(colors) : Array.from메소드는 object로 부터 array생성
Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if(range){
  range.addEventListener("input" , handleRangeChage);
}

if(mode){
  mode.addEventListener("click", handleModeClick)
}

if(save){
  save.addEventListener("click", handleSaveClick);
}