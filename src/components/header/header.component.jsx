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

        <Link to='/'>
            Home
            {/* <img className='logo' src='https://firebasestorage.googleapis.com/v0/b/housecal-4ff38.appspot.com/o/2HouseCalLogoLg.png?alt=media&token=257a6cc6-2801-40f2-b7b4-7329258ea1df' /> */}
        </Link>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li><Link className='option' to='/myAccount'>My Account</Link></li>
            <li><Link className='option' to='/addChild'>Add Child</Link></li>
            <li><Link className='option'><ProfileMenu /></Link></li>
            <li><Link onClick={this.handleLogout}>Logout</Link></li>
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