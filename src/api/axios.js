import axios from 'axios'
import JSONBig from 'json-bigint'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transfromRequest: [function (data) {
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
})
instance.interceptors.request.use(config => {
  if (window.sessionStorage.getItem('token')) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
