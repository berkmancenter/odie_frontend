import Proxy from './Proxy'
import config from './../config/general'

class CohortsProxy extends Proxy {
  /**
   * The constructor for the CohortsProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    let apiUrl = config.api.url

    super(apiUrl, 'cohorts', parameters)
  }

  comparison (params = null) {
    return this.submit(
      'get',
      `${this.apiUrl}/cohort/${params.cohort_a_id}/timespan/${params.timespan_a_id}/cohort/${params.cohort_b_id}/timespan/${params.timespan_b_id}`
    )
  }
}

export default CohortsProxy
