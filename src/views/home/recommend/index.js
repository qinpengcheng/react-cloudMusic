import React,{Component} from 'react'
import './index.scss'
import Banner from '../../../components/banner'
class Recommend extends Component{
  constructor(...args){
    super(...args)
  }

  render() {
    return(
      <div className='recommend'>
        <Banner></Banner>
        <div className='section'>
          <div className='section-title'>
            <h4>推荐歌单</h4>
            <span>更多></span>
          </div>
          <div className='section-list'>
            <div className='list-row'>
              <div className='list-col'>
                <div className=''>

                </div>
              </div>
              <div className='list-col'>

              </div>
              <div className='list-col'>

              </div>
              <div className='list-col'>

              </div>
              <div className='list-col'>

              </div>
            </div>
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
export default Recommend