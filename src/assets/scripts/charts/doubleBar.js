/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2017-12-27 20:34:17
 * @Last Modified time: 2017-12-27 20:34:17
 * @Description: 多列柱状图
 */
import * as d3 from 'd3'
import $ from 'jquery'
import config from '../tool/config'
import { tooltip } from '../tool/utils'
export default class DoubleBar {
  defaultSetting () {
    return {
      width: 1420,
      height: 230,
      padding: {
        top: 30,
        right: 40,
        bottom: 50,
        left: 40
      },
      ticks: 2,
      barSpace: 4,
      xAxisLine: true,
      yAxisLine: false,
      value: 'url(#jjValue)',
      valueUp: 'url(#jjValueUp)',
      tongbi: 'url(#jjTongbi)',
      tongbiUp: 'url(#jjTongbiUp)',
      huanbi: 'url(#jjHuanbi)',
      huanbiUp: 'url(#jjHuanbiUp)',
      mask: false
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
    $('.chart-wrap').find('.chart-legend').find('li').off().on('click', function () {
      $(this).toggleClass('legend-hide')
      var opType = $(this).attr('data-op')
      $(selector).find('.' + opType + '-bar').fadeToggle()
    })
  }
  drawChart (data) {
    const { width, height, mask, padding: { bottom, top, left, right } } = this.config
    this.distanceMid = (height - bottom - top) / 2 + top
    this.xScale = d3.scaleBand() // .attr("width", this.xScale.bandwidth())
      .domain(d3.range(data.length))
      .rangeRound([0, width - right - left])
      .padding(0.8)
    // 求取最大值和最小值
    let maxValue = Math.floor(d3.max(data, d => {
      return d.value * 1.2
    }))
    if (maxValue === 0) {
      maxValue = 100
    }
    const maxRatio = Math.max(
      d3.max(data, d => {
        return d.hbRatio
      }),
      d3.max(data, d => {
        return d.tbRatio
      })
    )
    const minRatio = Math.min(
      d3.min(data, d => {
        return d.hbRatio
      }),
      d3.min(data, d => {
        return d.tbRatio
      })
    )
    const targetRatio = Math.floor(
      Math.max(
        Math.abs(maxRatio) * 1.2,
        Math.abs(minRatio) * 1.2
      )
    )
    this.yValueScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, height - bottom - top])
    this.yRatioScale = d3.scaleLinear()
      .domain([0, targetRatio])
      .range([0, (height - bottom - top) / 2])
    // 绘制柱图的两个Y轴
    this.drawYaxis(maxValue, targetRatio)
    // 绘制公用的X轴
    this.drawXaxis(data)
    // 绘制柱子
    this.drawBar(data)
    if (mask) {
      this.addMask()
    }
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
  drawYaxis (maxValue, targetRatio) {
    const { width, height, ticks, padding: { top, left, right, bottom }, yAxisLine } = this.config
    // value值的Y轴
    const yValueAxis = this.addGWrap('y-value-axis')
    let yValueAxisData
    let yRatioAxisData
    if (ticks === 2) {
      yValueAxisData = [0, Math.floor(maxValue / 2), maxValue]
      yRatioAxisData = [-targetRatio, 0, targetRatio]
    } else if (ticks === 4) {
      yValueAxisData = [0, Math.floor(maxValue / 4), Math.floor(maxValue / 2), Math.floor(maxValue * 3 / 4), maxValue]
      yRatioAxisData = [-targetRatio, -Math.floor(targetRatio / 2), 0, Math.floor(targetRatio / 2), targetRatio]
    }
    const updateValue = yValueAxis.selectAll('text').data(yValueAxisData)
    updateValue.enter().append('text')
    updateValue.exit().remove()
    yValueAxis.selectAll('text').data(yValueAxisData)
      .attr('x', left + 50)
      .attr('y', (d, i) => {
        return height - (top + i * (height - top - bottom) / ticks) - 14 // 向上偏移字体大小的一半
      })
      .attr('text-anchor', 'end')
      .attr('fill', '#a4d5ff')
      .attr('font-size', 28)
      .attr('font-family', 'sans-serif')
      .text(d => {
        return d
      })
    // 同环比的Y轴
    const yRatioAxis = this.addGWrap('y-ratio-axis')
    const updateRatio = yRatioAxis.selectAll('text').data(yRatioAxisData)
    updateRatio.enter().append('text')
    updateRatio.exit().remove()
    yRatioAxis.selectAll('text').data(yRatioAxisData)
      .attr('x', width - left - right - 10)
      .attr('y', (d, i) => {
        return height - (top + i * (height - top - bottom) / ticks) - 14 // 向上偏移字体大小的一半
      })
      .attr('text-anchor', 'start')
      .attr('fill', '#a4d5ff')
      .attr('font-size', 28)
      .attr('font-family', 'sans-serif')
      .text(d => {
        return `${d}%`
      })
    // 绘制网格线
    if (yAxisLine) {
      const yGridLine = this.addGWrap('y-grid-line')
      const yGridUpdate = yGridLine.selectAll('line').data(d3.range(ticks + 1))
      yGridUpdate.enter().append('line')
      yGridUpdate.exit().remove()
      yGridLine.selectAll('line').data(d3.range(ticks + 1))
        .attr('x1', left + 80)
        .attr('x2', width - left - right)
        .attr('y1', (d, i) => {
          return height - (top + i * (height - top - bottom) / ticks) - 18
        })
        .attr('y2', (d, i) => {
          return height - (top + i * (height - top - bottom) / ticks) - 18
        })
        .attr('stroke', '#637dff')
        .attr('fill', 'none')
        .attr('stroke-width', 3)
        .attr('stroke-dasharray', '20 10')
    }
  }
  drawXaxis (data) {
    const { width, height, padding: { left, right, bottom }, xAxisLine } = this.config
    const xAxisG = this.addGWrap('x-axis')
    const xTextUpdate = xAxisG.selectAll('text').data(data)
    xTextUpdate.enter().append('text')
    xTextUpdate.exit().remove()
    xAxisG.selectAll('text').data(data)
      .attr('x', (d, i) => {
        return this.xScale(i) + left
      })
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', 28)
      .attr('fill', '#46aaff')
      .text(d => {
        return d.name
      })
    // 在添加一根水平线
    if (xAxisLine) {
      const isXAxisLine = this.svg.select('.x-axis-line').empty()
      let xAxisLine
      if (isXAxisLine) {
        xAxisLine = this.svg.append('line').attr('class', 'x-axis-line')
      } else {
        xAxisLine = this.svg.select('.x-axis-line')
      }
      xAxisLine
        .attr('x1', left + 80)
        .attr('x2', width - left - right)
        .attr('y1', height - bottom)
        .attr('y2', height - bottom)
        .attr('stroke', '#637dff')
        .attr('fill', 'none')
    }
  }
  drawBar (data) {
    const {
      height,
      padding: {
        left,
        bottom
      },
      value,
      mask,
      barSpace,
      tongbi,
      huanbi,
      valueUp,
      huanbiUp,
      tongbiUp
    } = this.config
    const {
      pageWidth,
      pageHeight
    } = config
    const barWrap = this.addGWrap('bar-wrap')
    const itemUpdate = barWrap.selectAll('.bar').data(data)
    const itemEnter = itemUpdate.enter().append('g').attr('class', 'bar')
    itemUpdate.exit().remove()
    itemEnter.append('rect').attr('class', 'value-bar')
    itemEnter.append('rect').attr('class', 'tb-bar')
    itemEnter.append('rect').attr('class', 'hb-bar')
    const group = barWrap.selectAll('.bar')
    // 绘制value的柱子
    group.select('.value-bar')
      .attr('x', (d, i) => {
        return this.xScale(i) + left
      })
      .attr('width', this.xScale.bandwidth())
      .attr('fill', value)
      .attr('cursor', 'pointer')
      .attr('height', 0)
      .attr('y', height - bottom)
      .attr('mask', () => {
        return mask ? 'url(#mask)' : false
      })
      .transition()
      .duration(2000)
      .attr('height', d => {
        return this.yValueScale(d.value)
      })
      .attr('y', d => {
        return height - bottom - this.yValueScale(d.value)
      })
    // 绘制同比的柱子
    group.select('.tb-bar')
      .attr('x', (d, i) => {
        return this.xScale(i) - this.xScale.bandwidth() - barSpace + left
      })
      .attr('width', this.xScale.bandwidth())
      .attr('fill', tongbi)
      .attr('cursor', 'pointer')
      .attr('height', 0)
      .attr('y', this.distanceMid)
      .attr('mask', () => {
        return mask ? 'url(#mask)' : false
      })
      .transition()
      .duration(2000)
      .attr('height', d => {
        return this.yRatioScale(Math.abs(d.tbRatio))
      })
      .attr('y', d => {
        return d.tbRatio < 0 ? this.distanceMid : this.distanceMid - this.yRatioScale(Math.abs(d.tbRatio))
      })
    // 绘制环比的柱子
    group.select('.hb-bar')
      .attr('x', (d, i) => {
        return this.xScale(i) + this.xScale.bandwidth() + barSpace + left
      })
      .attr('width', this.xScale.bandwidth())
      .attr('fill', huanbi)
      .attr('cursor', 'pointer')
      .attr('height', 0)
      .attr('y', this.distanceMid)
      .attr('mask', () => {
        return mask ? 'url(#mask)' : false
      })
      .transition()
      .duration(2000)
      .attr('height', d => {
        return this.yRatioScale(Math.abs(d.hbRatio))
      })
      .attr('y', d => {
        return d.tbRatio < 0 ? this.distanceMid : this.distanceMid - this.yRatioScale(Math.abs(d.hbRatio))
      })
    // value值显示动画
    group.on('mouseover', function (d) {
      d3.select(this).select('.value-bar').attr('fill', valueUp)
      d3.select(this).select('.tb-bar').attr('fill', tongbiUp)
      d3.select(this).select('.hb-bar').attr('fill', huanbiUp)
      const top = d3.event.pageY / (window.innerHeight / pageHeight)
      const left = d3.event.pageX / (window.innerWidth / pageWidth) + 20
      let tbColor
      if (d.tbRatio > 0) {
        tbColor = '#ff4444'
      } else if (d.tbRatio === 0) {
        tbColor = '#b4c7f9'
      } else if (d.tbRatio < 0) {
        tbColor = '#44ff86'
      }
      let hbColor
      if (d.hbRatio > 0) {
        hbColor = '#ff4444'
      } else if (d.hbRatio === 0) {
        hbColor = '#b4c7f9'
      } else if (d.hbRatio < 0) {
        hbColor = '#44ff86'
      }
      const option = {
        el: '.auto-tooltip',
        location: {
          x: left,
          y: top
        },
        data: [{
          name: '同 比 值',
          value: d.tbValue
        }, {
          name: '同比比例',
          value: d.tbRatio + '%',
          color: tbColor
        }, {
          name: '当 前 值',
          value: d.value
        }, {
          name: '环 比 值',
          value: d.hbValue
        }, {
          name: '环比比例',
          value: d.hbRatio + '%',
          color: hbColor
        }]
      }
      tooltip(option)
      d3.select('.auto-tooltip').style('display', 'block')
    })
    .on('mouseout', function () {
      d3.select(this).select('.value-bar').attr('fill', value)
      d3.select(this).select('.tb-bar').attr('fill', tongbi)
      d3.select(this).select('.hb-bar').attr('fill', huanbi)
      d3.select('.auto-tooltip').style('display', 'none')
    })
  }
  addMask () {
    const { width, height } = this.config
    const maskLine = d3.select('.mask-line')
    const linePart = 2
    const lineWidth = 2
    const update = maskLine.selectAll('line').data(d3.range(Math.ceil(width / linePart)))
    update.enter().append('line')
    update.exit().remove()
    maskLine.selectAll('line')
      .attr('x1', (d, i) => {
        return i * (linePart + lineWidth)
      })
      .attr('x2', (d, i) => {
        return i * (linePart + lineWidth)
      })
      .attr('y1', 0)
      .attr('y2', height)
      .style('stroke-width', lineWidth)
      .style('stroke', 'black')
  }
}
