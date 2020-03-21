import React from 'react';
import { Link } from 'react-router-dom';
//import { auth } from '../../firebase/firebase';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/index";
import ProfileMenu from '../menu-profile/menu-profile.component';

// import { ReactComponent as Logo} from '../../../assets/coffee-cup.svg';

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

        <a className="brand-logo left" href='/'>
            Home
            {/* <img className='logo' src='https://firebasestorage.googleapis.com/v0/b/housecal-4ff38.appspot.com/o/2HouseCalLogoLg.png?alt=media&token=257a6cc6-2801-40f2-b7b4-7329258ea1df' /> */}
        </a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li><a href='/myAccount'>My Account</a></li>
            <li><a href='/addChild'>Add Child</a></li>
            <li><a><ProfileMenu /></a></li>
            <li><a onClick={this.handleLogout}>Logout</a></li>
            {isLoggingOut && <p>Logging Out....</p>}
            {logoutError && <p>Error logging out</p>}

            {/* {
                currentUser ? 
                    <a className='option' onClick={() => auth.signOut()}>SIGN OUT</a>
                    :
                    <Link className='option' to='/login'>Log In</Link>
            } */}
            
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