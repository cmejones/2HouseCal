import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import ProfileMenu from '../menu-profile/menu-profile.component';

// import { ReactComponent as Logo} from '../../../assets/coffee-cup.svg';

import './header.styles.css';


const Header = ({ currentUser }) => (
    <nav className='nav-wrapper'>

        <Link to='/'>
            Home
            {/* <img className='logo' src='https://firebasestorage.googleapis.com/v0/b/housecal-4ff38.appspot.com/o/2HouseCalLogoLg.png?alt=media&token=257a6cc6-2801-40f2-b7b4-7329258ea1df' /> */}
        </Link>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li><Link className='option' to='/myAccount'>My Account</Link></li>
            <li><Link className='option'><ProfileMenu /></Link></li>

            {
                currentUser ? 
                    <a className='option' onClick={() => auth.signOut()}>SIGN OUT</a>
                    :
                    <Link className='option' to='/login'>Log In</Link>
            }
            
        </ul>

    </nav>
)


export default Header;