/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2017-12-18 16:20:29
 * @Last Modified time: 2017-12-18 16:20:29
 * @Description: 页面缩放
 */

import config from './config'
export default () => {
  const {
    pageWidth,
    pageHeight
  } = config
  const body = document.querySelector('body')
  body.style.width = `${pageWidth}px`
  body.style.height = `${pageHeight}px`
  const x = window.innerWidth / pageWidth
  const y = window.innerHeight / pageHeight
  body.style.transform = `scale(${x}, ${y})`
}
