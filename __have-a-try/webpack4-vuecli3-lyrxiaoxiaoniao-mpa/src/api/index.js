import axios from './interceptor'
import config from './config'
export default {
  POST(url, params) {
    let _url = config.serverURI + url
    return new Promise((resolve, reject) => {
      axios
        .post(_url, { params })
        .then(function(response) {
          resolve(response.data)
        })
        .catch(function(err) {
          reject(err)
        })
    })
  },
  GET(url, params) {
    let _url = config.serverURI + url
    return new Promise((resolve, reject) => {
      axios
        .get(_url, { params })
        .then(function(response) {
          resolve(response.data)
        })
        .catch(function(err) {
          reject(err)
        })
    })
  }
}
