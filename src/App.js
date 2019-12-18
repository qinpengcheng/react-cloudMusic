import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import routers from './router'
import Header from './components/header'
import Menu from './components/menu'
function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className='container'>
        <Menu></Menu>
        <div className='container-right'>
          <Router>
            <Link to='/home' >home</Link>
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

          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
