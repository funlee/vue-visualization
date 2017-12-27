/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2017-12-26 23:20:59
 * @Last Modified time: 2017-12-26 23:20:59
 * @Description: top5
 */
import {
  urlReg
} from '../../../assets/scripts/tool/utils'
import Mock from 'mockjs'
const data = () => {
  Mock.mock(urlReg('/iot/overview/top5'), {
    'code': 1,
    'msg': 'success',
    'result': {
      'sex': {
        'male': '@natural(20,80)',
        'female': '@natural(20,80)' // 其实没用
      },
      'jizhan': [{
        'name': '烟花易冷',
        'value': '@natural(500,600)'
      }, {
        'name': '发如雪',
        'value': '@natural(400,500)'
      }, {
        'name': '超人不会飞',
        'value': '@natural(300,400)'
      }, {
        'name': '米兰的小铁匠',
        'value': '@natural(200,300)'
      }, {
        'name': '一路向北',
        'value': '@natural(100,200)'
      }]
    }
  })
}
export default data
