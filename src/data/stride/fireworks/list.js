import {
  urlReg
} from '../../../assets/scripts/tool/utils'
import Mock from 'mockjs'
const data = () => {
  Mock.mock(urlReg('/stride/fireworks/list'), {
    'code': 1,
    'msg': 'success',
    'result': {
      'list|30': [{
        'name|+1': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        'tbRatio': '@integer(-100,100)',
        'hbRatio': '@integer(-100,100)',
        'tbValue': '@natural(100000,200000)',
        'hbValue': '@natural(100000,200000)',
        'value': '@natural(100000,200000)'
      }]
    }
  })
}
export default data
