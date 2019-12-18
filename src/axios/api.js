import service from './request'
export const getData = params =>{
  return service({
    url:'/getJoke',
    method:'get',
    params
  })
}