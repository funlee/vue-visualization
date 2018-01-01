/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2017-12-31 13:55:16
 * @Last Modified time: 2017-12-31 13:55:16
 * @Description: map
 */
import * as topojson from 'topojson'
import * as d3 from 'd3'
import root from './chongqing.json'
import config from '../tool/config'
import { tooltip } from '../tool/utils'
export default class Map {
  defaultSetting () {
    return {
      width: 600,
      height: 540,
      padding: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
      circleSty: {
        'maxR': 20
      }
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
    this.svg = d3.select(selector).append('svg')
      .attr('width', width)
      .attr('height', height)
    this.mapSvg = this.svg.append('g').attr('class', 'mapSvg')
    this.areaId = []
    this.areaCentro = []
    this.changeCor = ['城口县', '巫山县', '城口县', '云阳县', '梁平县', '石柱土家族自治县', '忠县', '黔江区', '秀山土家族苗族自治县', '垫江县', '长寿区', '涪陵区', '武隆区', '南川区', '綦江区', '永川区', '荣昌县', '铜梁区', '璧山区', '合川区', '潼南县']
  }
  drawCharts (data) {
    const { circleSty: { maxR } } = this.config
    this.mapD = []
    this.xsData = []
    this.xzData = []
    this.cityNumXz = 0
    this.cityNumXs = 0
    this.xzRadius = 0
    this.xsRadius = 0
    // 计算maxNum
    data.map((d, i) => {
      this.xsData.push({ 'id': d.id, 'value': d.xsvalue })
      this.xzData.push({ 'id': d.id, 'value': d.xzvalue })
      if (d.id !== '500103') {
        this.mapD.push(d.xsvalue, d.xzvalue)
      } else {
        this.cityNumXz = d.xzvalue
        this.cityNumXs = d.xsvalue
      }
    })
    this.maxNum = Math.max(...this.mapD)
    // 先设定好主城的刑事和行政的圆圈大小，主城不参与比较，故设置为比最大值大一丢丢
    if (this.cityNumXs > this.cityNumXz) {
      this.xzRadius = maxR + 2
      this.xsRadius = maxR + 4
    } else {
      this.xzRadius = maxR + 4
      this.xsRadius = maxR + 2
    }
    this.groupData = [this.xsData, this.xzData]
    // 绘制地图
    this.nameDat = ['xingshi', 'xingzheng']
    this.mapDraw()
  }
  mapDraw () {
    const { width, height } = this.config
    const {
      pageWidth,
      pageHeight
    } = config
    const roots = topojson.feature(root, root.objects.chongqing)
    const rootData = roots.features
    // 控制地图缩放的大小
    const scale = this.getZoomScale(rootData)
    const center = this.getCenters(rootData)
    const projection = d3.geoMercator()  // 球形墨卡托投影
      .scale(scale * 44)
      .center(center)
      .translate([width / 2, height / 2])
    this.path = d3.geoPath(projection)  // 创建一个地理路径生成器
    // 路径组
    const updatePathG = this.mapSvg.selectAll('.mapPath')
      .data(rootData)
    const enterPathG = updatePathG.enter()
    updatePathG.exit().remove()
    // 路径组
    // enter部分
    enterPathG.append('path')
      .attr('class', 'mapPath')
      .attr('id', (d, i) => {
        this.areaId.push(d.properties.id)
      })
      .attr('fill', d => {
        if (this.changeCor.indexOf(d.properties.name) !== -1) {
          return '#7fe156'
        }
        return '#84e75a'
      })
      .attr('d', this.path)
      .attr('stroke', '#1866cc')
      .attr('stroke-width', 2)
      .attr('fill', 'rgba(17, 27, 142, 0.9)')
      .attr('centre', d => {
        this.areaCentro.push(this.path.centroid(d))
        return this.path.centroid(d)
      })
      .on('mouseover', (d, i) => {
        const tooltipName = d.properties.name
        const selfId = d.properties.id
        let tooltipXsValue
        let tooltipXzValue
        this.groupData[0].map((item, index) => {
          if (item.id === selfId) {
            tooltipXsValue = item.value
          }
        })
        this.groupData[1].map((item, index) => {
          if (item.id === selfId) {
            tooltipXzValue = item.value
          }
        })
        tooltipXsValue = tooltipXsValue || 0
        tooltipXzValue = tooltipXzValue || 0
        const top = d3.event.pageY / (window.innerHeight / pageHeight)
        const left = d3.event.pageX / (window.innerWidth / pageWidth) + 20
        const option = {
          el: '.auto-tooltip',
          location: {
            x: left,
            y: top
          },
          data: [{
            name: '地区',
            value: tooltipName
          }, {
            name: '刑事',
            value: tooltipXsValue
          }, {
            name: '行政',
            value: tooltipXzValue
          }]
        }
        tooltip(option)
        d3.select('.auto-tooltip').style('display', 'block')
      })
      .on('mouseout', function () {
        d3.select('.auto-tooltip').style('display', 'none')
      })
    // 合并主城
    const chong = d3.set(['渝北区', '北碚区', '江北区', '沙坪坝区', '南岸区', '九龙坡区', '大渡口区', '巴南区', '渝中区'])
    let hbc = { 'name': '重庆主城', 'path': [], 'id': '500103' }
    this.areaId.push(hbc.id)
    hbc.path = topojson.merge(root,
      root.objects.chongqing.geometries.filter(d => {
        return chong.has(d.properties.name)
      })
    )
    d3.selectAll('.mapSvg').append('path')
      .datum(hbc.path)
      .attr('d', this.path)
      .attr('stroke', '#1866cc')
      .attr('stroke-width', 2)
      .attr('fill', 'rgba(17, 27, 142, 0.9)')
      .attr('centre', d => {
        this.areaCentro.push(this.path.centroid(d))
      })
      .style('cursor', 'pointer')
    // 绘制圆圈组
    this.circleDraw()
  }
  circleDraw () {
    const { circleSty: { maxR } } = this.config
    // 绘制圆圈分组
    console.log(this.groupData)
    const updateG = this.svg.selectAll('.circleG')
      .data(this.groupData)
    const enterG = updateG.enter()
    updateG.exit().remove()
    // update部分
    updateG.attr('class', (d, i) => {
      return `circleG ${this.nameDat[i]}`
    })
    // enter部分
    enterG.append('g')
      .attr('class', (d, i) => {
        return `circleG ${this.nameDat[i]}`
      })
      .attr('transform', (d, i) => {
        return 'translate(' + (i * 15) + ' ' + (i * 15 - 40) + ')'
      })
    // 绘制圆组
    const updateCircleG = this.svg.selectAll('.circleG').selectAll('g')
      .data(d => {
        return d
      })
    const enterCircleG = updateCircleG.enter()
    updateCircleG.exit().remove()
    // enter部分
    // 控制地图缩放的大小
    updateCircleG.attr('transform', (d, i) => {
      if (this.areaId.indexOf(d.id) >= 0) {
        const coord = this.areaCentro[this.areaId.indexOf(d.id)]
        return 'translate(' + coord[0] + ' ' + coord[1] + ')'
      }
    })
    enterCircleG.append('g')
      .attr('transform', (d, i) => {
        if (this.areaId.indexOf(d.id) >= 0) {
          const coord = this.areaCentro[this.areaId.indexOf(d.id)]
          return 'translate(' + coord[0] + ' ' + coord[1] + ')'
        }
      })
    // 绘制圆
    // 中心圆
    var updataCir1 = d3.selectAll('.circleG').selectAll('g').selectAll('circle')
      .data(d => {
        var data = []
        data.push(d.value)
        return data
      })
    var enterCir1 = updataCir1.enter()
    updataCir1.exit().remove()
    updataCir1
      .attr('class', 'circleMain')
      .attr('r', (d, i) => {
        if (d === this.cityNumXs) {
          return this.xsRadius
        } else if (d === this.cityNumXz) {
          return this.xzRadius
        } else {
          return (d / this.maxNum) * maxR
        }
      })
      .attr('cx', 0)
      .attr('cy', (d, i) => {
        if (d === this.cityNumXz) { // 白色圆相对蓝色圆的偏移是通过css控制的，但那主要是针对非主城区域，由于主城的圆点较大，所以单独设置偏移距离
          return 12
        }
      })
    enterCir1.append('circle')
      .attr('class', 'circleMain')
      .attr('r', (d, i) => {
        if (d === this.cityNumXs) {
          return this.xsRadius
        } else if (d === this.cityNumXz) {
          return this.xzRadius
        } else {
          return (d / this.maxNum) * maxR
        }
      })
      .attr('cx', 0)
      .attr('cy', (d, i) => {
        if (d === this.cityNumXz) { // 白色圆相对蓝色圆的偏移是通过css控制的，但那主要是针对非主城区域，由于主城的圆点较大，所以单独设置偏移距离
          return 12
        }
      })
    // 两个外环圆
    d3.selectAll('.circleG').selectAll('g').append('circle')
      .attr('class', 'circleOuter1')
      .attr('r', d => {
        if (d.value === this.cityNumXs) {
          return this.xsRadius + 3
        } else if (d.value === this.cityNumXz) {
          return this.xzRadius + 3
        } else {
          return (d.value / this.maxNum) * maxR + 3
        }
      })
      .attr('cx', 0)
      .attr('cy', (d, i) => {
        if (d.value === this.cityNumXz) { // 白色圆相对蓝色圆的偏移是通过css控制的，但那主要是针对非主城区域，由于主城的圆点较大，所以单独设置偏移距离
          return 12
        }
      })
    d3.selectAll('.circleG').selectAll('g').append('circle')
      .attr('class', 'circleOuter2')
      .attr('r', d => {
        if (d.value === this.cityNumXs) {
          return this.xsRadius + 6
        } else if (d.value === this.cityNumXz) {
          return this.xzRadius + 6
        } else {
          return (d.value / this.maxNum) * maxR + 6
        }
      })
      .attr('cx', 0)
      .attr('cy', (d, i) => {
        if (d.value === this.cityNumXz) { // 白色圆相对蓝色圆的偏移是通过css控制的，但那主要是针对非主城区域，由于主城的圆点较大，所以单独设置偏移距离
          return 12
        }
      })
  }
  getZoomScale (features) {
    const { width, height } = this.config
    let longitudeMin = 100000 // 最小经度
    let latitudeMin = 100000 // 最小维度
    let longitudeMax = 0 // 最大经度
    let latitudeMax = 0 // 最大纬度
    features.map((e) => {
      let a = d3.geoPath().bounds(e) // [[最小经度，最小维度][最大经度，最大纬度]]
      if (a[0][0] < longitudeMin) {
        longitudeMin = a[0][0]
      }
      if (a[0][1] < latitudeMin) {
        latitudeMin = a[0][1]
      }
      if (a[1][0] > longitudeMax) {
        longitudeMax = a[1][0]
      }
      if (a[1][1] > latitudeMax) {
        latitudeMax = a[1][1]
      }
    })
    var a = longitudeMax - longitudeMin
    var b = latitudeMax - latitudeMin
    return Math.min(width / a, height / b)
  }
  getCenters (features) {
    let longitudeMin = 100000
    let latitudeMin = 100000
    let longitudeMax = 0
    let latitudeMax = 0
    features.forEach((e) => {
      let a = d3.geoPath().bounds(e)
      if (a[0][0] < longitudeMin) {
        longitudeMin = a[0][0]
      }
      if (a[0][1] < latitudeMin) {
        latitudeMin = a[0][1]
      }
      if (a[1][0] > longitudeMax) {
        longitudeMax = a[1][0]
      }
      if (a[1][1] > latitudeMax) {
        latitudeMax = a[1][1]
      }
    })
    let a = (longitudeMax + longitudeMin) / 2
    let b = (latitudeMax + latitudeMin) / 2
    return [a, b]
  }
}
