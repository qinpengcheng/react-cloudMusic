import React,{Component} from 'react';
import {HashRouter  as Router,Route} from 'react-router-dom'
import {routers} from './router'
import Header from './components/header'
import Menu from './components/menu'
import Play from './components/play'

class App extends Component{
  render() {
    return (
      <div className="App">
        <Router>
          <Header></Header>
          <div className='container'>
            <Menu></Menu>
            <div className='container-right'>
              {
                routers.map((item,index)=>{
                  if(item.exact){
                    return <Route
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      key={index}
                    >
                    </Route>
                  }else{
                    return <Route
                      path={item.path}
                      component={item.component}
                      key={index}
                    >
                    </Route>
                  }
                })
              }
            </div>
          </div>
          <Play></Play>
        </Router>
      </div>
    );
  }
}


export default App;
