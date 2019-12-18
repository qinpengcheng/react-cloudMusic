import React,{Component} from 'react'
import './index.scss'
import music from '../../asset/img/menu/music.png'
class Menu extends Component{
  constructor(...args){
    super(...args)
    this.state={
      recommend:{
        name:'推荐',
        menuList:[
          {
            name:"发现音乐",
            url:music,
            active:true
          },
          {
            name:"私人FM",
            active:false
          }
        ]
      },
      myMusic:{
        name:'我的音乐',
        menuList:[
          {
            name:"发现音乐",
            active:false
          }
        ]
      },
      createMusic:{
        name:'创建的歌单',
        menuList:[
          {
            name:"发现音乐",
            active:false
          }
        ]
      }

    }
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

              if(item.active){
                return (
                <li className='menu-item-li active'>
                  <img src={item.url} alt=""/>
                  <span>{item.name}</span>
                </li>
                )
              }else{
                return (
                  <li className='menu-item-li'>{item.name}</li>
                )
              }
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

export default Menu