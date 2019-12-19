import React,{Component} from 'react';
import {HashRouter  as Router,Route} from 'react-router-dom'
import {routers} from './router'
import Header from './components/header'
import Menu from './components/menu'

class App extends Component{

  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className='container'>
            <Router>
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
            </Router>
        </div>
      </div>
    );
  }
}


export default App;
