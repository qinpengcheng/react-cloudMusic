import React,{Component} from 'react'
import {getData} from "../../axios/api";

class Home extends Component{
  async getData(){
    let data = {
      type:'text',
      page:1,
      count:10
    }
    let res = await getData(data)
    console.log(res);
  }
  render(){
    return (
      <div>
       <button onClick={this.getData.bind(this)}>发送验证码</button>
      </div>
    )
  }
}
export default Home