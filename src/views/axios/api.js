import service from './request'
export const getData = params =>{
  return service({
    url:'/search',
    method:'get',
    params
  })
}