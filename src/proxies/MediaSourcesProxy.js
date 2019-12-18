import Proxy from './Proxy'
import config from './../config/general'

class MediaSourcesProxy extends Proxy {
  /**
   * The constructor for the ToolsProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    let apiUrl = config.api.url

    super(apiUrl, 'media_sources', parameters)
  }

  /**
   * Method used to fetch all items from the API.
   *
   * @returns {Promise} The result in a promise.
   */
  aggregated (params = null) {
    return this.submit('get', `${this.endpoint}/aggregate`, {
      params: params
    })
  }
}

export default MediaSourcesProxy
