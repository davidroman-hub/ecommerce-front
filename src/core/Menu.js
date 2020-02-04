import React,{Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuth} from '../auth/index'


const isActive = (history, path) => {
    if(history.location.pathname === path) { // this is for change the color when is activated the Route
        return{ color: '#ff9900'}
    } else{
        return { 'color': '#ffffff'}
    }
} 
            //in this case is history, but also can be props
const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className=" nav-item">
                <Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link>
            </li>
                {!isAuth () && (
                  <Fragment>
                        <li className=" nav-item">
                            <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">Sign In</Link>
                        </li>

                        <li className=" nav-item">
                            <Link className="nav-link"  style={isActive(history,'/signup')} to="/signup">Sign up</Link>
                        </li>

                    </Fragment>
                )}
          {isAuth () && (
                <li className=" nav-item">
                        <span 
                        className="nav-link"  
                        style={{cursor:'pointer', color:'#ffff'}}
                        onClick={() => signout(()=> {
                            history.push('/');
                        })} >Sign out
                        
                        </span>
            </li>
          )}
        </ul>

    </div>
)

export default withRouter(Menu)