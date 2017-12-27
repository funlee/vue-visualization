/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2017-12-27 00:23:29
 * @Last Modified time: 2017-12-27 00:23:29
 * @Description: 水球图
 */
import * as d3 from 'd3'
export default class WaterBall {
  defaultSetting () {
    return {
      width: 400,
      height: 400,
      radius: 120,
      fillOuterLine: 'url(#outline)', // 外圈圆
      innerBall: 'url(#innerBall)' // 100% 实心圆填充
    }
  }
  constructor (selector, option) {
    const defaultSetting = this.defaultSetting()
    this.config = Object.assign(defaultSetting, option)
    const {
      width,
      height
    } = this.config
    // 创建svg
    this.svg = d3.select(selector).select('svg')
      .attr('width', width)
      .attr('height', height)
    this.defs = this.svg.select('defs')
  }
  drawCharts (data) {
    const {
      width,
      height,
      radius,
      innerBall,
      fillOuterLine
    } = this.config
    let rate
    if (data.male === 0 || data.female === 0) {
      rate = 0
    } else {
      rate = Math.floor(data.male)
    }
    const dataset = [
      [
        [rate, 100 - rate]
      ]
    ]
    // 设置布局
    const clockwisePie = d3.pie() // 顺时针，针对数据类型:[small,bigger]
      .startAngle(Math.PI)
      .endAngle(3 * Math.PI)
    const anticlockwisePie = d3.pie() // 逆时针,针对数据类型：[bigger,small]
      .startAngle(Math.PI)
      .endAngle(-Math.PI)
    // 绘制男性
    const maleArc = d3.arc()
      .innerRadius(radius - 8)
      .outerRadius(radius + 8)
    // 绘制女性
    const femaleArc = d3.arc()
      .innerRadius(radius - 30)
      .outerRadius(radius - 14)
    // 处理好结构
    const ballUpdate = this.svg.selectAll('.ball')
      .data(dataset)
    const ballEnter = ballUpdate.enter().append('g').attr('class', 'ball')
    ballUpdate.exit().remove()
    const ballGroup = this.svg.selectAll('.ball').data(dataset)
      .attr('transform', `translate(${width / 2 - 50},${height / 2})`)
    // 绘制内部实心圆
    ballEnter.append('circle').attr('class', 'innerCircle')
    ballGroup.select('.innerCircle')
      .attr('r', radius - 14)
      .attr('fill', 'rgba(79,35,129,0.6)')
    // 绘制100%的实心圆
    ballEnter.append('circle').attr('class', 'fillCircle')
    ballGroup.select('.fillCircle')
      .attr('r', radius - 14)
      .attr('fill', innerBall)
      .attr('clip-path', 'url(#areaWave)')
    // 绘制外圈渐变填充圆
    ballEnter.append('circle').attr('class', 'outLine')
    ballGroup.select('.outLine')
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('stroke', fillOuterLine)
      .attr('stroke-width', 4)
    // 绘制外圈纯色填充圆 -- 男性占比
    ballEnter.append('path').attr('class', 'maleCircle')
    ballGroup.select('.maleCircle')
      .attr('fill', '#01e2fa')
      .attr('d', d => {
        return d[0][0] >= d[0][1] ? maleArc(clockwisePie(d[0])[0]) : maleArc(anticlockwisePie(d[0])[0])
      })
    // 绘制外圈纯色填充圆 -- 女性占比
    ballEnter.append('path').attr('class', 'femaleCircle')
    ballGroup.select('.femaleCircle')
      .attr('fill', '#ff03b9')
      .attr('d', d => {
        const femaleData = [
          [d[0][1], d[0][0]]
        ]
        if (femaleData[0][0] >= femaleData[0][1]) {
          return femaleArc(clockwisePie(femaleData[0])[0])
        } else {
          return femaleArc(anticlockwisePie(femaleData[0])[0])
        }
      })
    // 制作波浪纹 - clipPath
    const clipPathUpdate = this.defs.selectAll('clipPath').data(d3.range(1))
    clipPathUpdate.enter().append('clipPath').append('path')
    clipPathUpdate.exit().remove()
    const waveClipCount = 2
    const waveClipWidth = radius * 4
    const waveHeight = 10.26
    const waveOffset = 0
    const waveCount = 1
    let wavaData = []
    for (let i = 0; i <= 40 * waveClipCount; i++) {
      wavaData.push({
        x: i / (40 * waveClipCount),
        y: (i / (40))
      })
    }
    const waveScaleX = d3.scaleLinear()
      .range([0, waveClipWidth])
      .domain([0, 1])
    const waveScaleY = d3.scaleLinear()
      .range([0, waveHeight])
      .domain([0, 1])
    // translateY为radius 对应 0%
    // translateY为-radius 对应 100%
    const wavePercentScale = d3.scaleLinear()
      .domain([0, 100])
      .range([radius, -radius])
    const clipArea = d3.area()
      .x(d => {
        return waveScaleX(d.x)
      })
      .y0(d => {
        return waveScaleY(Math.sin(Math.PI * 2 * waveOffset * -1 + Math.PI * 2 * (1 - waveCount) + d.y * 2 * Math.PI))
      })
      .y1(2 * radius)
    let clipPath = this.defs.selectAll('clipPath')
      .attr('id', 'areaWave')
      .select('path')
        .datum(wavaData)
        .attr('d', clipArea)
        .attr('fill', 'yellow')
        .attr('T', 0)
    clipPath.transition()
      .duration(2000)
      .attr('transform', `translate(${-3 * radius},${wavePercentScale(rate)})`)
      .on('start', () => {
        clipPath.attr('transform', `translate(${-3 * radius},${radius})`)
      })
    // 绘制图表名字
    ballEnter.append('text').attr('class', 'chart-name')
    ballGroup.select('.chart-name')
      .attr('y', -radius / 4)
      .attr('text-anchor', 'middle')
      .attr('fill', '#f4f8fc')
      .attr('font-weight', 'bold')
      .attr('font-size', 30)
      .text('男性占比')
    // 绘制百分占比数值 -- 严格的绘制顺序决定层级
    ballEnter.append('text').attr('class', 'valueText')
    ballGroup.select('.valueText')
      .attr('y', radius / 4 + 20)
      .attr('text-anchor', 'middle')
      .attr('fill', '#f4f8fc')
      .attr('font-size', 70)
      .text(0)
      .transition()
      .duration(3000)
      .on('start', function () {
        d3.active(this)
          .tween('text', function (d, i) {
            const that = d3.select(this)
            return function (t) {
              that.text(Math.floor(t * d[0][0]))
            }
          })
      })
    // 绘制value值百分比符号
    ballEnter.append('text').attr('class', 'percentText')
    ballGroup.select('.percentText')
      .attr('y', 40)
      .attr('x', 70)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', 40)
      .text('%')
    // 用定时器做波浪动画
    setTimeout(function () {
      let distance = -3 * radius
      d3.timer(() => {
        distance++
        if (distance > -radius) {
          distance = -3 * radius
        }
        clipPath.attr('transform', `translate(${distance},${wavePercentScale(rate)})`)
      })
    }, 2000)
  }
}
