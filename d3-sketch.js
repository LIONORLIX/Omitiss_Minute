// 设置画布大小
const coreSize = 600;
const marginSize = 50;
const width = coreSize + marginSize * 2;
const height = coreSize + marginSize * 2;
const strokeWidth = 1;

const gridSize = coreSize / 24;
const centerPosX = marginSize + gridSize * 12;
const centerPosY = marginSize + gridSize * 15;
const timeRadius = Math.sqrt((gridSize * 2) ** 2 + (gridSize * 5) ** 2);
const hourLength = gridSize * 8;
const minRadius = Math.sqrt((gridSize * 2) ** 2 + (gridSize * 4) ** 2);
const innerRadius = gridSize * 5.4;
const outerRadius = gridSize * 5.8;

// 创建 SVG 画布
const svg = d3
  .select("#canvas-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  // .style("background", "#fff");

const houseLayer = svg.append("g").attr("class", "house-layer");
const scalesLayer = svg.append("g").attr("class", "scales-layer");
const secondLayer = svg.append("g").attr("class", "second-layer");
const minuteLayer = svg.append("g").attr("class", "minute-layer");
const hourLayer = svg.append("g").attr("class", "hour-layer");

// 绘制房屋形状
function drawHouse(){
  houseLayer.selectAll("*").remove(); // 清理旧元素
  houseLayer
  .append("polygon")
  .attr("points", [
    [marginSize + gridSize * 12, marginSize + gridSize * 1],
    [marginSize + gridSize * 1, marginSize + gridSize * 12],
    [marginSize + gridSize * 1, marginSize + gridSize * 23],
    [marginSize + gridSize * 23, marginSize + gridSize * 23],
    [marginSize + gridSize * 23, marginSize + gridSize * 12],
  ])
  .attr("fill", "black")
  .attr("stroke", "white")
  .attr("stroke-width", strokeWidth);
}

// 绘制刻度
function drawScales(){
  scalesLayer.selectAll("*").remove();
  for (let i = 0; i < 60; i++) {

    const angle = i * 6 - 90;
    const gap = outerRadius - innerRadius
    const singleProcess = (checkStatus().isScaleShowProgress*60-i) <= 1 ? (checkStatus().isScaleShowProgress*60-i) : 1
    const x1 = centerPosX + Math.cos((angle * Math.PI) / 180) * innerRadius;
    const y1 = centerPosY + Math.sin((angle * Math.PI) / 180) * innerRadius;
    // 单个刻度的无极变换
    const x2 = centerPosX + Math.cos((angle * Math.PI) / 180) * (outerRadius-gap*(1-singleProcess));
    const y2 = centerPosY + Math.sin((angle * Math.PI) / 180) * (outerRadius-gap*(1-singleProcess));
    // const x2 = centerPosX + Math.cos((angle * Math.PI) / 180) * outerRadius;
    // const y2 = centerPosY + Math.sin((angle * Math.PI) / 180) * outerRadius;
    let opacityTemp = 0;
    if (i<=checkStatus().isScaleShowProgress*60 || checkStatus().isScaleShowProgress == 1){
      opacityTemp = 1;
    }
    scalesLayer
      .append("line")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("opacity", opacityTemp)
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);
  }
}

function drawSecond(){
  secondLayer.selectAll("*").remove();
  // 秒针
  secondLayer
    .selectAll(".second-hand")
    .data([getTime().second])
    .join("line")
    .attr("class", "second-hand")
    .attr("x1", centerPosX)
    .attr("y1", centerPosY)
    .attr("x2", (d) =>
      centerPosX + Math.cos((d * 6 - 90) * (Math.PI / 180)) * coreSize * checkStatus().isMinuteShowProgress 
    )
    .attr("y2", (d) =>
      centerPosY + Math.sin((d * 6 - 90) * (Math.PI / 180)) * coreSize * checkStatus().isMinuteShowProgress
    )
    .attr("stroke", "white")
    .attr("stroke-width", strokeWidth);
}

function drawMinute(){
  // 分针
  minuteLayer.selectAll("*").remove();
  minuteLayer
    .selectAll(".minute-hand")
    .data([getTime().minute])
    .join("rect")
    .attr("class", "minute-hand")
    .attr("width", hourLength)
    .attr("height", hourLength)
    .attr("x", (d) =>
      centerPosX +
      Math.cos((d * 6 - 90) * (Math.PI / 180)) * timeRadius -
      hourLength / 2
    )
    .attr("y", (d) =>
      centerPosY +
      Math.sin((d * 6 - 90) * (Math.PI / 180)) * timeRadius -
      hourLength / 2
    )
    .attr("fill", "white")
    .attr("stroke", "black")
    // .attr("style", "mix-blend-mode: difference;") // 设置重叠反色
    .attr("stroke-width", strokeWidth);

    minuteLayer
      .selectAll(".minute-text")
      .data([getTime().minute])
      .join("text")
      .attr("class", "minute-text")
      .attr("x", (d) =>
        centerPosX +
        Math.cos((d * 6 - 90) * (Math.PI / 180)) * timeRadius
      )
      .attr("y", (d) =>
        centerPosY +
        Math.sin((d * 6 - 90) * (Math.PI / 180)) * timeRadius
      )
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .attr("font-size", "20px")
      .attr("fill", "black")
      .attr("opacity", checkStatus().isTextShowProgress)
      .text(d => Math.floor(d));
  // }else{
  //   minuteLayer.selectAll(".minute-text").remove();
  // }
}

function drawHour(){
  // 时针
  hourLayer.selectAll("*").remove();
  hourLayer
    .selectAll(".hour-hand")
    .data([getTime().hour])
    .join("circle")
    .attr("class", "hour-hand")
    .attr("cx", (d) =>
      centerPosX + Math.cos((d * 30 - 90) * (Math.PI / 180)) * timeRadius
    )
    .attr("cy", (d) =>
      centerPosY + Math.sin((d * 30 - 90) * (Math.PI / 180)) * timeRadius
    )
    .attr("r", minRadius)
    .attr("fill", "white")
    .attr("stroke", "black")
    // .attr("style", "mix-blend-mode: difference;") // 设置重叠反色
    .attr("stroke-width", strokeWidth);

  hourLayer
    .selectAll(".hour-text")
    
    .data([getTime().hour])
    .join("text")
    .attr("class", "hour-text")
    .attr("x", (d) =>
      centerPosX + Math.cos((d * 30 - 90) * (Math.PI / 180)) * timeRadius
    )
    .attr("y", (d) =>
      centerPosY + Math.sin((d * 30 - 90) * (Math.PI / 180)) * timeRadius
    )
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central")
    .attr("font-size", "20px")
    .attr("fill", "black")
    .attr("opacity", checkStatus().isTextShowProgress)
    .text(d => 
      { 
        if(Math.floor(d)==0){
          return 12
        }else if(Math.floor(d)>12){
          return Math.floor(d)-12
        }else{
          return Math.floor(d)
        }
      }
    ); // 显示小时数字
}


// 绘制动态更新函数
function updateClock() {

  setBackground();

  drawHouse()
  if (checkStatus().isDay){
    if (checkStatus().isScalesSecondShow){
      drawScales()
      drawSecond()
    }else{
      secondLayer.selectAll("*").remove();
      scalesLayer.selectAll("*").remove();
    }
  }else{
    secondLayer.selectAll("*").remove();
    scalesLayer.selectAll("*").remove();
  }
  drawMinute()
  drawHour()

  if (checkStatus().videoIndex == 0){
    svg.style("opacity", 1);
  }else{
    svg.style("opacity", 0);
  }
}

// 启动动画
d3.interval(updateClock, 16);  // 改为16ms，约60fps
updateClock();
