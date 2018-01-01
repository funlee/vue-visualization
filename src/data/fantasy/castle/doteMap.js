import {
  urlReg
} from '../../../assets/scripts/tool/utils'
import Mock from 'mockjs'
const data = () => {
  Mock.mock(urlReg('/fantasy/castle/dotemap'), {
    'code': 1,
    'msg': 'success',
    'result': {
      'map|16': [{
        'id|1': ['500242', '500236', '500238', '500234', '500243', '500235', '500101', '500229', '500116', '500240', '500237', '500102', '500230', '500232', '500119', '500241'],
        'name': '@cname',
        'xsvalue|2000-5000': 1000,
        'xzvalue|2000-5000': 1000
      }]
    }
  })
}
export default data
