import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

//pages
import Signin from './user/Signin'
import Signup from './user/Signup'
import Home from './core/Home'

//menu
import Menu from './core/Menu'


const Routes = () => {
    return(
    <BrowserRouter>
    <Menu/>
          <Switch>
               <Route path = '/' exact component={Home}/>  
               <Route path = '/signin' exact component={Signin}/> 
               <Route path = '/signup' exact component={Signup}/> 
                 
          </Switch>  
    </BrowserRouter>
    );
};

export default Routes