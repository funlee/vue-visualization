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
        'name|+1': ['东川区', '嵩明县', '五华区', '富民县', '盘龙区', '官渡区', '西山区', '宜良县', '安宁市', '呈贡区', '晋宁县', '石林彝族县'],
        'value': '@natural(1,200)',
        'proportion': '@integer(-100,100)'
      }],
      'tongbi|12': [{
        'name|+1': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        'tbRatio': '@integer(-100,100)',
        'hbRatio': '@integer(-100,100)',
        'tbValue': '@natural(100,1000)',
        'hbValue': '@natural(100,1000)',
        'value': '@natural(100,1000)'
      }]
    }
  })
}
export default data
