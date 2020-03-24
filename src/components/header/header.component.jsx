import React from 'react';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/index";

import './header.styles.css';

class Header extends React.Component {
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };
    render() {
        const { isLoggingOut, logoutError } = this.props; //needed to render redux store
        //console.log(this.props);
        return (
            <>
            <nav className='nav-wrapper'>
                <a href="#!" data-target="slide-out" className="sidenav-trigger show-on-medium-and-down">
                    <img className='logo circle' src='https://firebasestorage.googleapis.com/v0/b/housecal-4ff38.appspot.com/o/houseCal.png?alt=media&token=00ee52f6-64bc-4d74-be2d-97eb19f1cc8a' />
                </a>
                <div className="right hide-on-med-and-down">

                    <a href='/' className="brand-logo left" >
                        Home
                        {/* <img className='logo' src='https://firebasestorage.googleapis.com/v0/b/housecal-4ff38.appspot.com/o/houseCal.png?alt=media&token=00ee52f6-64bc-4d74-be2d-97eb19f1cc8a' /> */}
                    </a>
                    <ul className='right hide-on-med-and-down'>
                        <li><a href='/myAccount'>My Account</a></li>
                        <li><a href='/addChild'>Add Child</a></li>
                        <li><a href='/account/view'>Manage Profile</a></li>
                        <li><a onClick={this.handleLogout}>Logout</a></li>
                        {isLoggingOut && <p>Logging Out....</p>}
                        {logoutError && <p>Error logging out</p>}
                        
                    </ul>
                </div>
            </nav>        
            </>
        )
    }
}

function mapStateToProps(state) { //need to render redux store
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user: state.auth.user
    };

}

export default connect(mapStateToProps)(Header);