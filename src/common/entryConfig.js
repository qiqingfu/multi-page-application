// 多个页面共用的配置, 一次修改多处生效

import { arrayFunction } from 'common/index'

export default Vue => {
  if (process.env.NODE_ENV !== 'production') {
    Vue.config.performance = true;
  }

  Vue.$arrayFunction = Vue.prototype.$arrayFunction = arrayFunction
}