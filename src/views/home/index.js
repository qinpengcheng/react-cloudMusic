import React,{Component} from 'react'
import {HashRouter  as Router,Route} from 'react-router-dom'
import {childrenRouters} from "../../router";
import './index.scss'
class Home extends Component{
  constructor(...args){
    super(...args)
    this.state={
      activeIndex:0,
      tables:[
        {
          name:'个性推荐',
          path:'/recommend'
        },
        {
          name:'歌单',
          path:'/songSheet'
        },
        {
          name:'主播电台',
          path:'/radioStation'
        },
        {
          name:'排行榜',
          path:'/rankingList'
        },
        {
          name:'歌手',
          path:'/singer'
        },
        {
          name:'最新音乐',
          path:'/latestMusic'
        }
      ]
    }
  }
  link(path,index,params={}){
    this.setState({
      activeIndex:index
    })
    this.props.history.push(path)
  }
  render(){
    return (
      <div className='home'>
        <Router>
          <div className='table'>
           <ul>
             {
               this.state.tables.map((item,index)=>{
                 let currentIndex = this.state.activeIndex
                 return(
                   <li className={['tab-item',currentIndex === index?' tab-item-active':''].join('')} onClick={this.link.bind(this,item.path,index)} key={index}>{item.name}</li>
                 )
               })
             }
           </ul>
          </div>
          <div className='content'>
            {
              childrenRouters.map((item,index)=>{
                if(item.exact){
                  return <Route
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    key={index}
                  >
                  </Route>
                }else{
                  return <Route
                    path={item.path}
                    component={item.component}
                    key={index}
                  >
                  </Route>
                }
              })
            }
          </div>
        </Router>
      </div>
    )
  }
}
export default Home