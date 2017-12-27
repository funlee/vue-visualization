/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2017-12-27 15:54:58
 * @Last Modified time: 2017-12-27 15:54:58
 * @Description: 底部数据
 */
import {
  urlReg
} from '../../../assets/scripts/tool/utils'
import Mock from 'mockjs'
const data = () => {
  Mock.mock(urlReg('/iot/overview/trend'), {
    'code': 1,
    'msg': 'success',
    'result': {
      'proportion|12': [{
        'name': '@cname()',
        'value': '@natural(100,1000)',
        'proportion': '@integer(-80,80)'
      }],
      'tongbi|12': [{
        'name|+1': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        'tbRatio': '@integer(-80,80)',
        'hbRatio': '@integer(-80,80)',
        'tbValue': '@natural(100,1000)',
        'hbValue': '@natural(100,1000)',
        'value': '@natural(100,1000)'
      }]
    }
  })
}
export default data
