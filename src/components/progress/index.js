import React,{Component} from 'react'
import {Progress } from 'antd'
import './index.scss'
class ProgressBar extends Component{
  constructor(...args){
    super(...args)
    this.state={
      isDown:false,
      x:0,
      l:0,
      width:0,
    }
  }


  componentDidMount() {
    this.setState({
      width:this.refs.progress.clientWidth
    })
  }
  btnMouseDow(e){
    e.persist()
    //获取x坐标
    this.setState({
      isDown:true,
      x:e.clientX,
      l:this.refs.btn.offsetLeft,
    })
    this.refs.btn.style.cursor = 'pointer'
  }
  btnMouseUp(){
    //关
    let _this = this
    window.onmouseup=function(){
      _this.setState({
        isDown:false
      })
      _this.refs.btn.style.cursor = 'default'
    }
  }
  btnMousemove(){
    let _this = this
    window.onmousemove=function (e) {
      if(_this.state.isDown){
        let nx = e.clientX;
        //计算移动后的左偏移量和顶部的偏移量
        let nl = nx - (_this.state.x - _this.state.l);
        if(nl>_this.state.width|| nl<0){
          return false
        }
        _this.props.onChange(nl/_this.state.width*100)
      }
    }

  }
  render() {
    return (
      <div className={this.props.hide?['m-progress ','hide'].join(''):'m-progress'} ref='progress' onMouseMove={this.btnMousemove.bind(this)}>
        <div className='bar'>
          <div className='bar-number' ref='number' style={{width:`${this.props.percent/100*this.state.width}px`}}></div>
          <span className='btn' ref='btn'  style={{left:`${this.props.percent/100*this.state.width}px`}} onMouseDown={this.btnMouseDow.bind(this)}  onMouseUp={this.btnMouseUp.bind(this)}><i></i></span>
        </div>
      </div>
    );
  }

}
export default ProgressBar