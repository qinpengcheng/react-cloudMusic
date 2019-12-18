import React,{Component} from 'react'
import {getData} from "../../axios/api";

class Home extends Component{
  async getData(){
    let data = {
      keywords:'一剪梅',
    }
    let res = await getData(data)
    console.log(res);
  }
  render(){
    return (
      <div>
       <button onClick={this.getData.bind(this)}>click</button>
      </div>
    )
  }
}
export default Home