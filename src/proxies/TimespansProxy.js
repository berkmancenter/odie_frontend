import Proxy from './Proxy'
import config from './../config/general'

class TimespansProxy extends Proxy {
  /**
   * The constructor for the CohortsProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    let apiUrl = config.api.url

    super(apiUrl, 'timespans', parameters)
  }

  /**
   * Method used to fetch all items from the API.
   *
   * @returns {Promise} The result in a promise.
   */
  aggregated (params = null) {
    return this.submit('get', `${this.endpoint}`, {
      params: params
    })
  }
}

export default TimespansProxy
