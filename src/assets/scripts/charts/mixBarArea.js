/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2017-12-27 09:18:32
 * @Last Modified time: 2017-12-27 09:18:32
 * @Description: 柱状图和面积图混合
 */
import * as d3 from 'd3'
import config from '../tool/config'
import { tooltip } from '../tool/utils'
export default class MixBarArea {
  defaultSetting () {
    return {
      width: 1320,
      height: 330,
      padding: {
        top: 30,
        right: 40,
        bottom: 50,
        left: 30
      },
      fillBar: 'url(#fillBarProportion)',
      fillBarUp: 'url(#fillBarProportionUp)',
      fillArea: 'url(#fillAreaProportion)'
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
  }
  addGWrap (className) {
    const isWrap = this.svg.select('.' + className).empty()
    let wrap
    if (isWrap) {
      wrap = this.svg.append('g').attr('class', className)
    } else {
      wrap = this.svg.select('.' + className)
    }
    return wrap
  }
  drawChart (data) {
    const { width, height, padding: { bottom, top } } = this.config
    let xData = []
    data.map(item => {
      xData.push(item.name)
    })
    this.xScale = d3.scaleBand() // .attr("width", this.xScale.bandwidth())
      .domain(d3.range(data.length))
      .rangeRound([0, width])
      .padding(0.8)
    // 占比的Y轴比例尺
    let minValue = d3.min(data, d => {
      return d.proportion
    })
    let maxValue = d3.max(data, d => {
      return d.proportion
    })
    if (minValue === 0 && maxValue === 0) {
      minValue = 0
      maxValue = 100
    }
    this.yComScale = d3.scaleLinear()
      .domain([minValue * 1.2, maxValue * 1.2])
      .range([0, height - bottom - top])
    // value值的Y轴比例尺
    this.yValueScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => {
        return d.value
      }) * 1.2])
      .range([0, height - bottom])
    // 绘制面积图
    this.drawArea(data)
    // 绘制柱子
    this.drawBar(data)
    // 绘制柱图的Y轴
    this.drawYaxisValue()
    // // 绘制同环比的Y轴
    // this.drawYaxisCom()
    // // 绘制公用的X轴
    // this.drawXaxis()
  }
  drawArea (data) {
    const { height, padding: { bottom }, fillArea } = this.config
    let areaPath = d3.area()
      .x((d, i) => {
        return this.xScale(i)
      })
      .y0(height - bottom)
    areaPath.y1((d, i) => {
      return height - this.yComScale(d.proportion) - bottom
    })
    const isArea = this.svg.select('.area-path').empty()
    let area
    if (isArea) {
      area = this.svg.append('path').attr('class', 'area-path')
    } else {
      area = this.svg.select('.area-path')
    }
    area
      .attr('d', areaPath(data))
      .attr('stroke', 'none')
      .attr('fill', fillArea)
      .attr('opacity', 0.8)
      .attr('transform', `translate(${this.xScale.bandwidth() / 2},0)`)
  }
  drawBar (data) {
    const { height, padding: { bottom }, fillBar, fillBarUp } = this.config
    const {
      pageWidth,
      pageHeight
    } = config
    const barWrap = this.addGWrap('bar-wrap')
    const itemUpdate = barWrap.selectAll('.bar').data(data)
    const itemEnter = itemUpdate.enter().append('g').attr('class', 'bar')
    itemUpdate.exit().remove()
    const group = this.svg.selectAll('.bar')
    // 绘制value的柱子
    itemEnter.append('rect')
    group.select('rect')
      .attr('x', (d, i) => {
        return this.xScale(i)
      })
      .attr('width', this.xScale.bandwidth())
      .attr('fill', fillBar)
      .attr('cursor', 'pointer')
      .attr('y', height - bottom)
      .attr('height', 0)
      .transition()
      .duration(2000)
      .attr('y', d => {
        return height - bottom - this.yValueScale(d.value)
      })
      .attr('height', d => {
        return this.yValueScale(d.value)
      })

    // 鼠标悬浮事件
    group.on('mouseover', function (d) {
      d3.select(this).select('rect').attr('fill', fillBarUp)
      const top = d3.event.pageY / (window.innerHeight / pageHeight)
      const left = d3.event.pageX / (window.innerWidth / pageWidth) + 20
      const option = {
        el: '.auto-tooltip',
        location: {
          x: left,
          y: top
        },
        data: [{
          name: '数量',
          value: d.value
        }, {
          name: '占比',
          value: d.proportion + '%'
        }]
      }
      tooltip(option)
      d3.select('.auto-tooltip').style('display', 'block')
    })
    .on('mouseout', function () {
      d3.select(this).select('rect')
        .transition()
        .duration(1000)
        .attr('fill', fillBar)
      d3.select('.auto-tooltip').style('display', 'none')
    })
  }
  drawYaxisValue () {
    const { height, padding: { bottom, top } } = this.config
    this.yValueScale.range([height - bottom - top, 0])
    const yValueAxis = d3.axisLeft(this.yValueScale).ticks(5)
    const isYValueAxis = this.svg.select('.y-value-axis').empty()
    let yValueAxisG
    if (isYValueAxis) {
      yValueAxisG = this.svg.append('g').attr('class', 'y-value-axis axis')
    } else {
      yValueAxisG = this.svg.select('.y-value-axis')
    }
    yValueAxisG.attr('transform', `translate(80,${top})`)
      .call(yValueAxis)
  }
}
