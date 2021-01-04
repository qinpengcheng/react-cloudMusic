import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.scss'
class playList extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            list: [],
            source: ''
        }
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        let { data } = nextProps
        if (this.props.data !== data) { //切换歌单重新播放
            this.props.changeId(data[0].id)
        }
    }

    //选中的歌曲
    checked(id) {
        this.props.changeId(id)
    }

    render() {
        return (
            <div className='modal' style={{ display: this.props.isShow ? 'block' : 'none' }}>
                <div className='modal-header'>
                    <div className='modal-header-btn active'>
                        <span>播放列表</span>
                    </div>
                    <div className='modal-header-btn'>
                        <span>历史记录</span>
                    </div>
                    <div className='modal-header-close' onClick={this.props.onchange}>
                        <i></i>
                    </div>
                </div>
                <div className='modal-content'>
                    <ul className='play-list'>
                        {
                            this.props.data.map((item, index) => {
                                return (
                                    <li className='play-list-item' onClick={this.checked.bind(this, item.id)} key={item.id}>
                                        {/*<span className='name'>{item.name} <i className='sq'></i></span>*/}
                                        <i className='sign' style={{ visibility: this.props.playIndex === index ? 'visible' : 'hidden' }}></i>
                                        <span className='name'>{item.name} </span>
                                        <span className='auth'>{item.ar[0].name}</span>
                                        <span className='source' title={`来源：${this.props.source}`}></span>
                                        <span className='time'>04:03</span>
                                    </li>
                                )
                            })}
                    </ul>
                </div>
                <div className='modal-footer'>

                </div>
            </div>
        )
    }
}
export default connect(function (state) {
    return state.playList
})(playList)