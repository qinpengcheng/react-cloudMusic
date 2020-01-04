import React,{Component} from 'react'
import {Progress } from 'antd'
import './index.scss'
import audioSrc from '../../asset/mp3/418291969.mp3'
class Play extends Component{
  constructor(...args){
    super(...args)
    this.state={
      playStatus:0,
      currentTime :'00:00',
      duration :'00:00',
      percent:0,
      volume:30,
      volume2:0,
      isDown:false,
      x:0,
      l:0,
    }
  }
  componentDidMount() {
    this.refs.audio.volume = this.state.volume/100
    this.refs.btn.style.left=Math.floor(this.state.volume * 85 / 100) +'px'

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
    this.setState({
      currentTime:currentTimeStr,
      duration:durationStr,
      percent:currentTime/duration*100
    })
  }
  switchVolume(){
    if(this.state.volume !==0){
      this.refs.audio.volume = 0
      this.setState({
        volume:0,
        volume2:this.state.volume
      })
    }else{
      this.refs.audio.volume = this.state.volume2/100
      this.setState({
        volume:this.state.volume2
      })
    }
  }
  btnMouseDow(e){
    e.persist()
    //获取x坐标和y坐标
    //开关打开
    //获取左部和顶部的偏移量
    this.setState({
      x:e.clientX,
      l:this.refs.btn.offsetLeft,
      isDown:true
    })
    this.refs.btn.style.cursor = 'pointer'
    console.log('开');
  }
  btnMouseUp(){
    //关
    console.log('关');
    this.setState({
      isDown:false
    })
    this.refs.btn.style.cursor = 'default'
  }
  btnMousemove(e){
    e.persist()
    if(this.state.isDown){
      let nx = e.clientX;
      //计算移动后的左偏移量和顶部的偏移量
      let nl = nx - (this.state.x - this.state.l);
      if(nl>85 || nl<0){
        return false
      }
      console.log(Math.floor(nl / 85 *100));
      this.refs.audio.volume = Math.floor(nl / 85 *100)/100
      this.refs.btn.style.left=nl+'px'
      this.setState({
        volume:Math.floor(nl / 85 *100)
      })
    }
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
            src={audioSrc}
            ref='audio'
          >您的浏览器不支持 audio 标签。</audio>
          <span className='currentTime'>{this.state.currentTime}</span>
          <Progress percent={this.state.percent} size="small" strokeColor='#E83C3C' showInfo={false} />
          <span className='duration'>{this.state.duration}</span>
        </div>
        <div className='play-info'>
          <div className='play-info-switch' onClick={this.switchVolume.bind(this)}>
            <i className={this.state.volume>0?'up':'down'}></i>
          </div>
          <div className='play-info-volume'>
            <span className='btn' ref='btn' onMouseDown={this.btnMouseDow.bind(this)} onMouseMove={this.btnMousemove.bind(this)} onMouseUp={this.btnMouseUp.bind(this)}><i></i></span>
            <Progress percent={this.state.volume} size="small" strokeColor='#E83C3C' showInfo={false} />
          </div>
        </div>
      </div>
    )
  }

}
export default Play