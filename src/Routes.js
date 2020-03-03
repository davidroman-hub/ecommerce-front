import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

//pages
import Signin from './user/Signin'
import Signup from './user/Signup'
import Home from './core/Home'
import Dashboard from './user/userDashboard'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Profile from './user/Profile'

//Routes Privates and admi

import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import AdminDashboard from './user/AdminDashboard'
import Orders from './admin/Orders'
import ManageProducts from './admin/ManageProducts'
//menu

//import Menu from './core/Menu' // I CHANGING THE MENU TO LAYOUT


const Routes = () => {
    return(
    <BrowserRouter>
    {/* <Menu/> */}
          <Switch>
               <Route path = '/' exact component={Home}/>
               <Route path = '/product/:productId' exact component={Product}/>
               <Route path = '/cart' exact component={Cart}/>
               <Route path = '/shop' exact component={Shop}/>   
               <Route path = '/signin' exact component={Signin}/> 
               <Route path = '/signup' exact component={Signup}/> 
               
            {/* //User routes */}

               <PrivateRoute path='/user/dashboard' exact component={Dashboard}/>
               <PrivateRoute path='/profile/:userId' exact component={Profile}/>

            {/* adminRoutes     */}
            
               <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}/>
               <AdminRoute path='/create/categories' exact component={AddCategory}/>
               <AdminRoute path='/create/product' exact component={AddProduct}/>
               <AdminRoute path='/admin/orders' exact component={Orders}/>
               <AdminRoute path='/admin/product' exact component={ManageProducts}/>

                 
          </Switch>  
    </BrowserRouter>
    );
};

export default Routes