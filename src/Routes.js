import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

//pages
import Signin from './user/Signin'
import Signup from './user/Signup'
import Home from './core/Home'
import Dashboard from './user/userDashboard'
import AdminDashboard from './user/AdminDashboard'

//Routes Privates and admi

import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import AddCategory from './admin/AddCategory'



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
               
               {/* //User routes */}

               <PrivateRoute path='/user/dashboard' exact component={Dashboard}/>

            {/* adminRoutes     */}
            
               <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}/>
               <AdminRoute path='/create/categories' exact component={AddCategory}/>
                 
          </Switch>  
    </BrowserRouter>
    );
};

export default Routes