import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SET_PLAY_LIST } from "../../../store/action";
import './index.scss'
import Banner from '../../../components/banner'
import { getPlayList, personalized } from '../../../axios/api'
import { notification } from 'antd';
class Recommend extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            personalizedList: []
        }
    }
    componentDidMount() {
        this.getPersonalized()
    }
    // 获取推荐歌单
    async getPersonalized() {
        let params = {
            limit: 10
        }
        let res = await personalized(params)
        if (res.code === 200) {
            this.setState({
                personalizedList: res.result
            })
        }
    }
    //获取歌单详情
    async getPlayList(id) {
        let data = {
            id
        }
        let res = await getPlayList(data)
        if (res.code === 200) {
            this.props.setPlayList(res.playlist.tracks, res.playlist.name, res.playlist.trackIds)
            notification.success({
                duration: 1,
                message: '已添加到播放列表'
            })
        }
    }

    //渲染推荐歌单
    renderPersonalized() {
        let { personalizedList } = this.state
        return personalizedList.map(item => {
            return (
                <div className='section-list-item' key={item.id} >
                    <div className='section-list-item-top' >
                        <div className='section-list-item-title'>
                            <p>{item.copywriter}</p>
                        </div>
                        <div className='section-list-item-img'>
                            <img src={item.picUrl} alt="" />
                        </div>
                        <div className='section-list-item-play' onClick={this.getPlayList.bind(this, item.id)}>
                            <i></i>
                        </div>
                    </div>
                    <div className='section-list-item-bottom'>
                        <p>{item.name}</p>
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div className='recommend'>
                <Banner></Banner>
                <div className='section'>
                    <div className='section-title'>
                        <h4>推荐歌单</h4>
                        <span>更多></span>
                    </div>
                    <div className='section-list'>
                        {this.renderPersonalized()}
                    </div>
                </div>
                <div className='section'>
                    <div className='section-title'>
                        <h4>推荐歌单</h4>
                        <span>更多></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(function (state, props) {
    return state.playList
}, {
    setPlayList(data, source, ids) {
        return {
            type: SET_PLAY_LIST,
            data,
            source,
            ids
        }
    }
})(Recommend)