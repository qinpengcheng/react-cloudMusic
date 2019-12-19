import Home from '../views/home'
import Recommend from '../views/home/recommend'
import LatestMusic from '../views/home/latestMusic'
import RadioStation from '../views/home/radioStation'
import RankingList from '../views/home/rankingList'
import Singer from '../views/home/singer'
import SongSheet from '../views/home/songSheet'
export const routers = [
  {
    path:'/',
    component:Home,
  }
]
export const childrenRouters = [
  {
    path:'/recommend',
    component:Recommend
  },
  {
    path:'/latestMusic',
    component:LatestMusic
  },
  {
    path:'/radioStation',
    component:RadioStation
  },
  {
    path:'/rankingList',
    component:RankingList
  },
  {
    path:'/singer',
    component:Singer
  },
  {
    path:'/songSheet',
    component:SongSheet
  }
]
