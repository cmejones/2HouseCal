import React from 'react';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/index";
import ProfileMenu from '../menu-profile/menu-profile.component';

import './header.styles.css';

class Header extends React.Component {
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };
    render() {
        const { isLoggingOut, logoutError, user } = this.props; //needed to render redux store
        console.log(this.props);
        return (

            <nav className='nav-wrapper'>

                <a href='/' className="brand-logo left" >
                    Home
                    {/* <img className='logo' src='https://firebasestorage.googleapis.com/v0/b/housecal-4ff38.appspot.com/o/houseCal.png?alt=media&token=00ee52f6-64bc-4d74-be2d-97eb19f1cc8a' /> */}
                </a>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li><a href='/myAccount'>My Account</a></li>
                    <li><a href='/addChild'>Add Child</a></li>
                    <li><ProfileMenu /></li>
                    <li><span onClick={this.handleLogout}>Logout</span></li>
                    {isLoggingOut && <p>Logging Out....</p>}
                    {logoutError && <p>Error logging out</p>}
                    
                </ul>
            </nav>
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