import React,{Component} from 'react'
import { withRouter } from 'react-router-dom';
import './index.scss'
import music from '../../asset/img/menu/music.png'
import radio from '../../asset/img/menu/radio.png'
class Menu extends Component{
  constructor(...args){
    super(...args)
    this.state={
      activeIndex:1,
      recommend:{
        name:'推荐',
        menuList:[
          {
            name:"发现音乐",
            url:music,
            path:'/recommend',
            id:1
          },
          {
            name:"私人FM",
            url:radio,
            path:'/home',
            id:2
          }
        ]
      },
      myMusic:{
        name:'我的音乐',
        menuList:[
          {
            name:"发现音乐",
            active:false,
            id:3
          }
        ]
      },
      createMusic:{
        name:'创建的歌单',
        menuList:[
          {
            name:"发现音乐",
            active:false,
            id:4
          }
        ]
      }

    }
  }
  link(path,index,params={}){
    this.setState({
      activeIndex:index
    })
  this.props.history.push(path)
  }
  renderMenu(obj){
    let menu = obj
    return (
      <div className='menu-item'>
        <div className='menu-item-title'>
          <p>{menu.name}</p>
        </div>
        <ul className='menu-item-ul'>
          {menu.menuList.map(item=>{
            let currentIndex = this.state.activeIndex
                return (
                <li className={['menu-item-li',currentIndex === item.id?' active':''].join('')}  key={item.id} onClick={this.link.bind(this,item.path,item.id)}>
                  <img src={item.url} alt=''/>
                  <span>{item.name}</span>
                </li>
                )
          })}
        </ul>
      </div>
    )
  }
  render() {
    return(
      <div className='menu'>
        {this.renderMenu(this.state.recommend)}
        {this.renderMenu(this.state.myMusic)}
        {this.renderMenu(this.state.createMusic)}
      </div>
    )
  }
}

export default withRouter(Menu)