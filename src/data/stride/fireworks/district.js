/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2017-12-30 21:57:47
 * @Last Modified time: 2017-12-30 21:57:47
 * @Description: city 下拉选择
 */
import {
  urlReg
} from '../../../assets/scripts/tool/utils'
import Mock from 'mockjs'
const data = () => {
  Mock.mock(urlReg('/stride/fireworks/city'), {
    'code': 1,
    'msg': 'success',
    'result': {
      'city|12': [{
        'value': '@city()',
        'key': '@natural(1,100)'
      }]
    }
  })
}
export default data
