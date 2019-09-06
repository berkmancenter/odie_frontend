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
}

export default MediaSourcesProxy
