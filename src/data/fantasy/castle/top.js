/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2017-12-25 12:33:21
 * @Last Modified time: 2017-12-25 12:33:21
 * @Description: 页面顶部接口
 */
import {
  urlReg
} from '../../../assets/scripts/tool/utils'
import Mock from 'mockjs'
const data = () => {
  Mock.mock(urlReg('fantasy/castle/top'), {
    'code': 1,
    'msg': 'success',
    'result': {
      'top|3': [{
        'name|+1': ['本周', '本月', '本年'],
        'value': '@natural(100,10000)',
        'huanbi': '@integer(-100,100)'
      }]
    }
  })
}
export default data
