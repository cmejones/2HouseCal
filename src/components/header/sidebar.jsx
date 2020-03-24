import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/index";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import './sidebar.styles.css'

class Sidenav extends Component {
    componentDidMount() {
        const options = {
            inDuration: 350,
            outDuration: 300,
            draggable: true
        };
        M.Sidenav.init(this.Sidenav);
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
                <li><a href='/'>Home</a></li>
                <li><a href='/myAccount'>My Account</a></li>
                <li><a href='/addChild'>Add Child</a></li>
                <li><a href='/account/view'>Manage Profile</a></li>

                <li>
                    <div className="divider" />
                </li>
                <li><a onClick={this.handleLogout}>Logout</a></li>
                    {isLoggingOut && <p>Logging Out....</p>}
                    {logoutError && <p>Error logging out</p>}
                </ul>

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