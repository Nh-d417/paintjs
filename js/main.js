const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.strokeStyle = "#000";
ctx.lineWidth = 2.5;
let painting = false;



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


if(canvas){
  canvas.addEventListener("mousemove",onMouseMove );
  canvas.addEventListener("mousedown",startPainting);
  canvas.addEventListener("mouseup",stopPainting);
  canvas.addEventListener("mouseleave",stopPainting);
}