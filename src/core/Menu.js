import React from 'react'
import {Link, withRouter} from 'react-router-dom'


const Menu = () => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className=" nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className=" nav-item">
                <Link className="nav-link" to="/signin">Sign In</Link>
            </li>

            <li className=" nav-item">
                <Link className="nav-link" to="/signup">Sign up</Link>
            </li>
        </ul>

    </div>
)

export default withRouter(Menu)