import Proxy from './Proxy'
import config from './../config/general'

class CohortsComparisonsProxy extends Proxy {
  /**
   * The constructor for the CohortsComparisonsProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    let apiUrl = config.api.url

    super(apiUrl, 'cohort_comparisons', parameters)
  }
}

export default CohortsComparisonsProxy
