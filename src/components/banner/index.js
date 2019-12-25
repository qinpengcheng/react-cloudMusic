import React,{Component} from 'react'
import { Carousel } from 'antd';
import './index.scss'
class Banner extends Component{
  constructor(...args){
    super(...args)
  }
  next(){
    this.refs.banner.next()
  }
  prev(){
    this.refs.banner.prev()
  }
  render() {
    let html = '<'
    return(
      <div className='banner'>
        <span onClick={this.next.bind(this)} className='banner-next btn'></span>
        <span onClick={this.prev.bind(this)} className='banner-prev btn'></span>
        <Carousel autoplay ref='banner'>
          <div>
            <img src="http://p1.music.126.net/3SB4tQ-E6OwJ1RrukPVLEA==/109951164578275681.jpg?imageView&quality=89" alt=""/>
          </div>
          <div>
            <img src="http://p1.music.126.net/TWO_e4RzKylUzznG4b8sNw==/109951164578264051.jpg?imageView&quality=89" alt=""/>
          </div>
          <div>
            <img src="http://p1.music.126.net/dnjfe0hmJ3Ldf3vRJwN5pA==/109951164578299603.jpg?imageView&quality=89" alt=""/>
          </div>
          <div>
            <img src="http://p1.music.126.net/Qeq4iIzycHEwKpvLwmtuug==/109951164578269309.jpg?imageView&quality=89" alt=""/>
          </div>
        </Carousel>
      </div>
    )
  }
}
export default Banner