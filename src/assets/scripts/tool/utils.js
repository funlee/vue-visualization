/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2017-12-27 10:09:41
 * @Last Modified time: 2017-12-27 10:09:41
 * @Description: 工具方法
 */
/**
 * @param {String} name 接口URL
 */
import $ from 'jquery'
export const urlReg = (name) => {
  const protocols = '((https?|s?ftp|irc[6s]?|git|afp|telnet|smb):\\/\\/)?'
  const userInfo = '([a-z0-9]\\w*(\\:[\\S]+)?\\@)?'
  const domain = '([a-z0-9]([\\w]*[a-z0-9])*\\.)?[a-z0-9]\\w*\\.[a-z]{2,}(\\.[a-z]{2,})?'
  const port = '(:\\d{1,5})?'
  const ip = '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}'
  const address = '(\\/\\S*)?'
  const domainType = [protocols, userInfo, domain, port, address, name, address]
  const ipType = [protocols, userInfo, ip, port, address, name, address]
  return new RegExp('^' + domainType.join('') + '$', 'i') || new RegExp('^' + ipType.join('') + '$', 'i')
}
export const tooltip = (option) => {
  const el = option.el
  let location = option.location
  const data = option.data
  const length = data.length
  let text = ''
  for (let i = 0; i < length; i++) {
    if (data[i].color) {
      text += `<span style="color:${data[i].color}">${data[i].name} : ${data[i].value}</span><br>`
    } else {
      text += `<span>${data[i].name} : ${data[i].value}</span><br>`
    }
  }
  $(el).html(text)
  const globalWidth = $('body').outerWidth()
  const elWidth = $(el).outerWidth()
  const elHeight = $(el).outerHeight()
  location.x = location.x - elWidth / 2
  location.y = location.y - elHeight - 10
  if (location.x + elWidth / 2 > globalWidth) {
    location.x = globalWidth - elWidth
  }
  $(el).css({
    left: location.x,
    top: location.y
  })
  return $(el)
}
