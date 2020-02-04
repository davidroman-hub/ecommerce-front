import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

//pages
import Signin from './user/Signin'
import Signup from './user/Signup'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/userDashboard'

//menu

//import Menu from './core/Menu' // I CHANGING THE MENU TO LAYOUT


const Routes = () => {
    return(
    <BrowserRouter>
    {/* <Menu/> */}
          <Switch>
               <Route path = '/' exact component={Home}/>  
               <Route path = '/signin' exact component={Signin}/> 
               <Route path = '/signup' exact component={Signup}/> 
               <PrivateRoute path='/dashboard' exact component={Dashboard}/>
                 
          </Switch>  
    </BrowserRouter>
    );
};

export default Routes