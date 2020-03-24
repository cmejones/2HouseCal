import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/index";
import ProfileMenu from '../menu-profile/menu-profile.component';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Sidenav extends Component {
    componentDidMount() {
        const options = {
            inDuration: 350,
            outDuration: 300,
            draggable: true
        };
        M.Sidenav.init(this.Sidenav);

        //let instance = M.Sidenav.getInstance(this.Sidenav);
        //instance.open();
        //console.log(instance.isOpen);
    }
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };
    render() {
        const { isLoggingOut, logoutError } = this.props; //needed to render redux store
        return (
            <div className="show-on-medium-and-down hide-on-large-only">
                <ul
                ref={Sidenav => {
                    this.Sidenav = Sidenav;
                }}
                id="slide-out"
                className="sidenav"
                >
                <li><a href='/myAccount'>My Account</a></li>
                <li><a href='/addChild'>Add Child</a></li>

                <li><span onClick={this.handleLogout}>Logout</span></li>
                {isLoggingOut && <p>Logging Out....</p>}
                {logoutError && <p>Error logging out</p>}
            
                <li>
                    <div className="divider" />
                </li>
                <li><ProfileMenu /></li>
                </ul>
                <a href="#!" data-target="slide-out" className="sidenav-trigger show-on-medium-and-down">
                    <i className="material-icons">menu</i>
                </a>
            </div>
        );
    }
}


function mapStateToProps(state) { //need to render redux store
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user: state.auth.user
    };

}

export default connect(mapStateToProps)(Sidenav);