/*
 * @Author: funlee 
 * @Email: i@funlee.cn 
 * @Date: 2017-12-26 22:14:26 
 * @Last Modified time:   2017-12-26 22:14:26 
 * @Description: 左侧接口 
 */
import {
  urlReg
} from '../../../tool/utils'
import Mock from 'mockjs'
const data = () => {
  Mock.mock(urlReg('/iot/overview/alarm'), {
    'code': 1,
    'msg': 'success',
    'result': {
      'diandongche': {
        'lastyear': '@natural(1,2000)',
        'thisyear': '@natural(1,2000)',
        'huanbi': '@integer(-100,100)'
      },
      'caseResolved': [{
        'name': '忍者',
        'value': '@natural(1,2000)'
      }, {
        'name': '安静',
        'value': '@natural(1,2000)'
      }, {
        'name': '简单爱',
        'value': '@natural(1,2000)'
      }]
    }
  })
}
export default data
