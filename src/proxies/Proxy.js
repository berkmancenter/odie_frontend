import Vue from 'vue'
import Config from '../config/general'

class BaseProxy {
  /**
   * The constructor of the BaseProxy.
   *
   * @param {string} endpoint   The endpoint being used.
   * @param {Object} parameters The parameters for the request.
   */
  constructor (apiUrl, endpoint, parameters = {}) {
    this.apiUrl = apiUrl
    this.endpoint = apiUrl + '/' + endpoint
    this.parameters = parameters
  }

  /**
   * Method used to set the query parameters.
   *
   * @param {Object} parameters The given parameters.
   *
   * @returns {BaseProxy} The instance of the proxy.
   */
  setParameters (parameters) {
    Object.keys(parameters).forEach((key) => {
      this.parameters[key] = parameters[key]
    })

    return this
  }

  /**
   * Method used to set a single parameter.
   *
   * @param {string} parameter The given parameter.
   * @param {*} value The value to be set.
   *
   * @returns {BaseProxy} The instance of the proxy.
   */
  setParameter (parameter, value) {
    this.parameters[parameter] = value

    return this
  }

  /**
   * Method used to remove all the parameters.
   *
   * @param {Array} parameters The given parameters.
   *
   * @returns {BaseProxy} The instance of the proxy.
   */
  removeParameters (parameters) {
    parameters.forEach((parameter) => {
      delete this.parameters[parameter]
    })

    return this
  }

  /**
   * Method used to remove a single parameter.
   *
   * @param {string} parameter The given parameter.
   *
   * @returns {BaseProxy} The instance of the proxy.
   */
  removeParameter (parameter) {
    delete this.parameters[parameter]

    return this
  }

  /**
   * The method used to perform an AJAX-request.
   *
   * @param {string}      requestType The request type.
   * @param {string}      url         The URL for the request.
   * @param {Object|null} data        The data to be send with the request.
   *
   * @returns {Promise} The result in a promise.
   */
  submit (requestType, url, data = null, options = {}) {
    let authToken = sessionStorage.getItem('odie_api_token')

    console.log(authToken)

    if (authToken === null) {
      return new Promise((resolve, reject) => {
        Vue.$http.post(this.apiUrl + '/login.json', {
          api_user: {
            email: Config.api.username,
            password: Config.api.password
          }
        })
          .then((response) => {
            authToken = response.headers.authorization

            if (sessionStorage.getItem('odie_api_token') === null) {
              sessionStorage.setItem('odie_api_token', authToken)
            }

            this.processSubmit(requestType, url, data, options, authToken, resolve, reject)
          })
          .catch(({ response }) => {
            reject(new Error('Something went wrong'))
          })
      })
    } else {
      return new Promise((resolve, reject) => {
        this.processSubmit(requestType, url, data, options, authToken, resolve, reject)
      })
    }
  }

  /**
   * The method used to perform an AJAX-request.
   *
   * @param {string}      requestType The request type.
   * @param {string}      url         The URL for the request.
   * @param {Object|null} data        The data to be send with the request.
   * @param {string}      authToken   The access token
   * @param {Function}    resolve     The success callback
   * @param {Function}    reject      The error callback
   *
   * @returns {Promise} The result in a promise.
   */
  processSubmit (requestType, url, data = null, options = {}, authToken = '', resolve = false, reject = false) {
    if (data === null) {
      data = {}
    }

    data.headers = {
      'Authorization': authToken
    }

    Vue.$http[requestType](url + this.getParameterString(), data, options)
      .then((response) => {
        resolve(response.data)
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          sessionStorage.removeItem('odie_api_token')
          window.location.reload()
        }

        if (response) {
          reject(response.data)
        } else {
          reject(new Error('Something went wrong'))
        }
      })
  }

  /**
   * Method used to fetch all items from the API.
   *
   * @returns {Promise} The result in a promise.
   */
  all () {
    return this.submit('get', `${this.endpoint}`)
  }

  /**
   * Method used to fetch a single item from the API.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  find (id) {
    return this.submit('get', `${this.endpoint}/${id}`)
  }

  /**
   * Method used to create an item.
   *
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  create (item) {
    return this.submit('post', `${this.endpoint}`, item)
  }

  /**
   * Method used to post some data.
   *
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  post (data = {}, options = {}) {
    return this.submit('post', `${this.endpoint}`, data, options)
  }

  /**
   * Method used to update an item.
   *
   * @param {int}    id   The given identifier.
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  update (id, item) {
    return this.submit('put', `${this.endpoint}/${id}`, item)
  }

  /**
   * Method used to destroy an item.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  destroy (id) {
    return this.submit('delete', `${this.endpoint}/${id}`)
  }

  /**
   * Method used to transform a parameters object to a parameters string.
   *
   * @returns {string} The parameter string.
   */
  getParameterString () {
    const keys = Object.keys(this.parameters)

    const parameterStrings = keys
      .filter(key => !!this.parameters[key])
      .map(key => `${key}=${this.parameters[key]}`)

    return parameterStrings.length === 0 ? '' : `?${parameterStrings.join('&')}`
  }
}

export default BaseProxy
