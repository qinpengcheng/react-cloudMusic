import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import routers from './router'
function App() {
  return (
    <div className="App">
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
  );
}

export default App;
