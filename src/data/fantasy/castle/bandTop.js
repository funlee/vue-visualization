/*
 * @Author: funlee 
 * @Email: i@funlee.cn 
 * @Date: 2017-12-26 23:20:59 
 * @Last Modified time:   2017-12-26 23:20:59 
 * @Description: top5 
 */
import {
  urlReg
} from '../../../tool/utils'
import Mock from 'mockjs'
const data = () => {
  Mock.mock(urlReg('/iot/overview/top5'), {
    'code': 1,
    'msg': 'success',
    'result': {
      'ddc': [{
        'name': '呈贡',
        'value': '@natural(50000,60000)'
      }, {
        'name': '西山',
        'value': '@natural(40000,50000)'
      }, {
        'name': '盘龙',
        'value': '@natural(30000,40000)'
      }, {
        'name': '官渡',
        'value': '@natural(20000,30000)'
      }, {
        'name': '安宁',
        'value': '@natural(10000,20000)'
      }],
      'jizhan': [{
        'name': '呈贡',
        'value': '@natural(500,600)'
      }, {
        'name': '西山',
        'value': '@natural(400,500)'
      }, {
        'name': '盘龙',
        'value': '@natural(300,400)'
      }, {
        'name': '官渡',
        'value': '@natural(200,300)'
      }, {
        'name': '安宁',
        'value': '@natural(100,200)'
      }]
    }
  })
}
export default data
