import axios from 'axios'

const service = axios.create({
  timeout:5000,
  baseURL:'http://localhost:4000/'
})

service.interceptors.request.use(config=>{
  return config
},error=>{
  Promise.reject(error)
})
service.interceptors.response.use(response=>{
  console.log(response);
  return response.data
},error=>{
 return Promise.reject(error)
})
export default service