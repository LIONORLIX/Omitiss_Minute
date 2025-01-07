// 设置画布大小
const coreSize = 400;
const marginSize = 50;
const width = coreSize + marginSize * 2;
const height = coreSize + marginSize * 2;

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

// 绘制房屋形状
svg
  .append("polygon")
  .attr("points", [
    [marginSize + gridSize * 12, marginSize + gridSize * 1],
    [marginSize + gridSize * 1, marginSize + gridSize * 12],
    [marginSize + gridSize * 1, marginSize + gridSize * 23],
    [marginSize + gridSize * 23, marginSize + gridSize * 23],
    [marginSize + gridSize * 23, marginSize + gridSize * 12],
  ])
  .attr("fill", "black")
  .attr("stroke", "white");

// 绘制刻度
for (let i = 0; i < 60; i++) {
  const angle = i * 6 - 90;
  const x1 = centerPosX + Math.cos((angle * Math.PI) / 180) * innerRadius;
  const y1 = centerPosY + Math.sin((angle * Math.PI) / 180) * innerRadius;
  const x2 = centerPosX + Math.cos((angle * Math.PI) / 180) * outerRadius;
  const y2 = centerPosY + Math.sin((angle * Math.PI) / 180) * outerRadius;

  svg
    .append("line")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .attr("stroke", "white")
    .attr("stroke-width", 1);
}

// 绘制动态更新函数
function updateClock() {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  const minute = now.getMinutes() + now.getSeconds() / 60;
  const second = now.getSeconds() + now.getMilliseconds() / 1000;

  // 秒针
  svg
    .selectAll(".second-hand")
    .data([second])
    .join("line")
    .attr("class", "second-hand")
    .attr("x1", centerPosX)
    .attr("y1", centerPosY)
    .attr("x2", (d) =>
      centerPosX + Math.cos((d * 6 - 90) * (Math.PI / 180)) * coreSize
    )
    .attr("y2", (d) =>
      centerPosY + Math.sin((d * 6 - 90) * (Math.PI / 180)) * coreSize
    )
    .attr("stroke", "white")
    .attr("stroke-width", 1);

  // 分针
  svg
    .selectAll(".minute-hand")
    .data([minute])
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
    .attr("stroke", "black");

  // 时针
  svg
    .selectAll(".hour-hand")
    .data([hour])
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
    .attr("stroke", "black");
}

// 启动动画
d3.interval(updateClock, 1);
updateClock();
