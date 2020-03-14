import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import { stat } from "fs";

class Home extends Component {
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };
    render() {
        const { isLoggingOut, logoutError, user } = this.props; //needed to render redux store
        return (
        <div>
            <h1>This is your app's protected area.</h1>
            <p>{user}</p>
            <button onClick={this.handleLogout}>Logout</button>
            {isLoggingOut && <p>Logging Out....</p>}
            {logoutError && <p>Error logging out</p>}
        </div>
        );
    }
}
function mapStateToProps(state) { //need to render redux store
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user: state.auth.user.email
    };

}

export default connect(mapStateToProps)(Home);