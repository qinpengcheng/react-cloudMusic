import React,{Component} from 'react'
import './index.scss'
import defaultImg from '../../asset/img/header/user.png'
class Header extends Component{
    constructor(...args){
      super(...args)
      this.state={
        userName:'未登陆',
        headImg:defaultImg
      }
    }
    componentDidMount() {
      console.log(this);
    }

  render() {
    return(
      <div className='headers'>
        <div className='headers-left'>
          <i className='headers-left-log'></i>
          <div className='headers-left-btns'>
            <button className='headers-left-none'><i className='prev'></i></button>
            <button><i className='next'></i></button>
          </div>
          <div className='headers-left-search'>
            <input type="text" placeholder='搜索音乐，视频，歌词，电台'/>
          </div>
        </div>
        <div className='headers-right'>
          <div className='headers-right-img'>
            <img  src={this.state.headImg} alt=''/>
          </div>
          <div className='headers-right-userInfo'>
            <span>{this.state.userName}</span>
            <i></i>
          </div>
          <div className='headers-right-vip'>
            <span>开通VIP</span>
          </div>
          <div className='headers-right-skin-peeler'>
            <i></i>
          </div>
        </div>
      </div>
    )
  }
}
export default Header