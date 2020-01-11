import service from './request'
//推荐歌单
export const personalized = params =>{
  return service({
    url:'/personalized',
    method:'get',
    params
  })
}
//歌单详情
export const getPlayList = params =>{
  return service({
    url:'/playlist/detail',
    method:'get',
    params
  })
}
//获取歌曲url
export const getPlayUrl = params =>{
  return service({
    url:'/song/url',
    method:'get',
    params
  })
}

