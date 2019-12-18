import axios from 'axios'

const service = axios.create({
  timeout:5000,
  baseURL:'https://api.apiopen.top'
})

service.interceptors.request.use(config=>{
  return config
},error=>{
  Promise.reject(error)
})
service.interceptors.response.use(response=>{
  return response.data
},error=>{
 return Promise.reject(error)
})
export default service