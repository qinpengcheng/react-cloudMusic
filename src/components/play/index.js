import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import ProgressBar from '../progress'
import Playlist from '../playList'
import { getPlayUrl } from '../../axios/api'
import { notification } from 'antd';
import { SET_PLAY_INDEX } from "../../store/action";

class Play extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            playStatus: 0,
            currentTime: '00:00',
            duration: '00:00',
            percent: 0,
            volume: 30,
            volume2: 0,
            isDown: false,
            playOrderClass: [
                { className: 'sequential-play', title: '顺序播放' },
                { className: 'random-play', title: '随机播放' },
                { className: 'loop-play', title: '列表循环' },
                { className: 'single-play', title: '单曲循环' },
            ],
            playOrder: 0,
            audioSrc: '',
            isShow: false,
            currentId: ''
        }
    }


    componentDidMount() {
        this.setVolume(this.state.volume / 100)
    }
    //播放
    play() {
        if (this.state.currentId === '') {
            if (this.props.ids.length) {
                this.getPlayUrl(this.props.ids[0].id)
            } else {
                notification.error({
                    duration: 1,
                    message: '请选择歌单'
                })
            }
        } else {
            this.refs.audio.play()
            this.setState({
                playStatus: 1
            })
        }
    }
    //暂停
    pause() {
        this.refs.audio.pause()
        this.setState({
            playStatus: 0
        })
    }
    //播放中
    playing(e) {
        let duration = Math.floor(this.refs.audio.duration)
        let dm = Math.floor(duration / 60)
        let ds = Math.floor(duration - (dm * 60))
        let durationStr = `${dm < 10 ? '0' + dm : dm}:${ds < 10 ? '0' + ds : ds}`
        let currentTime = Math.floor(this.refs.audio.currentTime)
        let cm = Math.floor(currentTime / 60)
        let s = Math.floor(currentTime - (cm * 60))
        let currentTimeStr = `0${cm}:${s < 10 ? '0' + s : s}`
        this.setState({
            currentTime: currentTimeStr,
            duration: durationStr,
            percent: currentTime / duration * 100
        })
    }
    //音量修改
    setVolume(volume) {
        this.refs.audio.volume = volume
    }
    //音量改变
    onChange(val) {
        this.setState({
            volume: val
        })
        this.setVolume(val / 100)
    }
    //播放进度改变
    onPercentChange(val) {
        this.setState({
            percent: val
        })
    }
    //播放顺序切换
    togglePlay() {
        let { playOrder } = this.state
        this.setState({
            playOrder: playOrder += 1
        })
        if (this.state.playOrder > 3) {
            this.setState({
                playOrder: 0
            })
        }
    }
    //静音切换
    switchVolume() {
        if (this.state.volume !== 0) {
            this.refs.audio.volume = 0
            this.setState({
                volume: 0,
                volume2: this.state.volume
            })
        } else {
            this.refs.audio.volume = this.state.volume2 / 100
            this.setState({
                volume: this.state.volume2
            })
        }
    }
    //根据id获取音乐url
    async getPlayUrl(id) {
        let data = {
            id
        }
        let res = await getPlayUrl(data)
        if (res.code === 200 && res.data[0].url) {
            this.setState({
                audioSrc: res.data[0].url,
                currentId: id
            })
            let ids = this.props.ids.map(item => item.id)
            let index = ids.indexOf(id)
            //设置当前播放的index
            this.props.setPlayIndex(index)
            // this.refs.audio.playbackRate = '10'
            this.play()
        } else {
            notification.error({
                placement: 'topRight',
                duration: 1.5,
                message: '播放失败'
            })
        }
    }
    //上一首
    playPrev() {
        let ids = this.props.ids.map(item => item.id)
        let prevId = ids[this.props.playIndex - 1]
        this.getPlayUrl(prevId)
    }
    //下一首
    nextPrev() {
        let ids = this.props.ids.map(item => item.id)
        let nextId = ids[this.props.playIndex + 1]
        this.getPlayUrl(nextId)
    }
    //播放结束后
    playEnd(e) {
        this.setState({
            playStatus: 0
        })
        let ids = this.props.ids.map(item => item.id)
        let { playOrder } = this.state
        let currentIndex = this.props.playIndex
        let nextId = ''
        let random = Math.floor(Math.random() * ids.length)
        switch (playOrder) {
            case 0:
                nextId = ids[currentIndex + 1]
                break;
            case 1:
                nextId = ids[random]
                break;
            case 2:
                nextId = ids[currentIndex === ids.length - 1 ? 0 : currentIndex + 1]
                break;
            case 3:
                nextId = ids[currentIndex]
                break;
            default:
                nextId = ''
        }
        if (nextId) {
            this.getPlayUrl(nextId)
        } else {
            this.setState({
                currentId: ''
            })
        }
    }
    //播放列表关闭/打开
    modalChange() {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    render() {
        return (
            <div className='play'>
                <div className='play-btn'>
                    <button className='play-btn-prev' onClick={this.playPrev.bind(this)}><i></i></button>
                    {
                        this.state.playStatus ? (<button className='play-btn-audioPause' onClick={this.pause.bind(this)}><i></i></button>) :
                            (<button className='play-btn-audioPlay' onClick={this.play.bind(this)}><i></i></button>)
                    }
                    <button className='play-btn-next' onClick={this.nextPrev.bind(this)}><i></i></button>
                </div>
                <div className='play-time'>
                    <audio
                        onEnded={this.playEnd.bind(this)}
                        onTimeUpdate={this.playing.bind(this)}
                        src={this.state.audioSrc}
                        ref='audio'
                    >您的浏览器不支持 audio 标签。</audio>
                    <span className='currentTime'>{this.state.currentTime}</span>
                    <ProgressBar percent={this.state.percent} onChange={this.onPercentChange.bind(this)}></ProgressBar>
                    <span className='duration'>{this.state.duration}</span>
                </div>
                <div className='play-info'>
                    <div className='play-info-switch' onClick={this.switchVolume.bind(this)}>
                        <i className={this.state.volume > 0 ? 'up' : 'down'}></i>
                    </div>
                    <div className='play-info-volume'>
                        <ProgressBar hide={true} percent={this.state.volume} onChange={this.onChange.bind(this)}></ProgressBar>
                    </div>
                    <div className='play-info-action'>
                        <i onClick={this.togglePlay.bind(this)} className={this.state.playOrderClass[this.state.playOrder].className} title={this.state.playOrderClass[this.state.playOrder].title}></i>
                        <i title="打开播放列表" className='play-list' onClick={this.modalChange.bind(this)}></i>
                    </div>
                </div>
                <Playlist changeId={this.getPlayUrl.bind(this)} isShow={this.state.isShow} onchange={this.modalChange.bind(this)}></Playlist>
            </div>
        )
    }
}
export default connect(function (state, props) {
    return state.playList
}, {
    setPlayIndex(index) {
        console.log(index);
        return {
            type: SET_PLAY_INDEX,
            index
        }
    }
})(Play)