import axios from 'axios'

export default class Api {
  request (method, url, data, headers = {}) {
    const token = window.localStorage.getItem('token')

    headers = {
      ...headers,
      'Authorization': 'Bearer ' + token
    }

    return new Promise((resolve, reject) => {
      this._request(method, url, data, headers)
        .then(res => resolve(res))
        .catch(error => {
          if (this._hasTokenExpired(error)) {
            window.localStorage.removeItem('token')
            alert('Your token has expired')
            window.location.reload(true)
          }
        })
    })
  }

  _hasTokenExpired (error) {
    return error.response && error.response.status === 401 && !error.config.url.includes('/login')
  }

  _request (method, url, data, headers = {}) {
    headers = {
      ...headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }

    return axios({
      method: method,
      url: url,
      params: method === 'get' ? data : {},
      data: method !== 'get' ? data : {},
      headers: headers
    })
  }
}
