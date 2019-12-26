import React,{Component} from 'react'
import {Progress } from 'antd'
import './index.scss'
class Play extends Component{
  constructor(...args){
    super(...args)
    this.state={
      playStatus:0,
      currentTime :'00:00',
      duration :'00:00',
      percent:0
    }
  }
  componentDidMount() {

  }
  //播放
  play(){
    this.refs.audio.play()
    this.setState({
      playStatus : 1
    })
  }
  //暂停
  pause(){
    this.refs.audio.pause()
    this.setState({
      playStatus : 0
    })
  }
  //播放中
  playing(e){
    let duration = Math.floor(this.refs.audio.duration)
    let dm = Math.floor(duration/60)
    let durationStr = `${dm}:${Math.floor(duration-(dm*60))}`
    let currentTime = Math.floor(this.refs.audio.currentTime)
    let cm = Math.floor(currentTime/60)
    let s = Math.floor(currentTime-(cm*60))
    let currentTimeStr = `0${cm}:${s<10?'0'+s:s}`
    console.log(e);
    this.setState({
      currentTime:currentTimeStr,
      duration:durationStr,
      percent:currentTime/duration*100
    })
  }
  render() {
    return (
      <div className='play'>
        <div className='play-btn'>
          <button className='play-btn-prev'><i></i></button>
          {
            this.state.playStatus?(<button className='play-btn-audioPause' onClick={this.pause.bind(this)}><i></i></button>):
              (<button className='play-btn-audioPlay' onClick={this.play.bind(this)}><i></i></button>)
          }
          <button className='play-btn-next'><i></i></button>
        </div>
        <div className='play-time'>
          <audio
            onTimeUpdate={this.playing.bind(this)}
            src='http://ip.h5.ri01.sycdn.kuwo.cn/3751e6e864791af9cd4a26d3667ce1e4/5e0485fb/resource/n2/64/12/418291969.mp3'
            controls
            ref='audio'
          >您的浏览器不支持 audio 标签。</audio>
          <span className='currentTime'>{this.state.currentTime}</span>
          <Progress percent={this.state.percent} size="small" strokeColor='#E83C3C' showInfo={false} />
          <span className='duration'>{this.state.duration}</span>
        </div>
        <div className='play-info'>

        </div>
      </div>
    )
  }

}
export default Play