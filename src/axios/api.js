import service from './request'
export const personalized = params =>{
  return service({
    url:'/personalized',
    method:'get',
    params
  })
}