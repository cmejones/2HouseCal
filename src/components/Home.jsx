import React, { Component } from "react";
//import { connect } from "react-redux";
//import { logoutUser } from "../actions";
import Header from '../components/header/header.component';
//import { stat } from "fs";
import '../index.css';
import CalendarView from "./calendar-view/calendar-view.component";
import AddChild from '../components/Forms/AddChild';
import MyAccount from '../pages/MyAccount';

class Home extends Component {
    // handleLogout = () => {
    //     const { dispatch } = this.props;
    //     dispatch(logoutUser());
    // };
    render() {
        //const { isLoggingOut, logoutError, user } = this.props; //needed to render redux store
        //console.log(this.props);
        return (
        <div>
            <Header />
            {/* <div class="row">
                <div className="col m4">
 
                </div>
                <div className="col m4">
                    <div>Add information here</div>
                </div>
            </div>   */}

            <div className="row">
                <div className="col m8">
                    <CalendarView />
                </div>
                <div className="col m4">
                    <img className='responsive-img home-logo' src="https://firebasestorage.googleapis.com/v0/b/housecal-4ff38.appspot.com/o/2HouseCalLogoLg.png?alt=media&token=257a6cc6-2801-40f2-b7b4-7329258ea1df" />
                </div>
            </div>

        </div>
        );
    }
}
// function mapStateToProps(state) { //need to render redux store
//     return {
//         isLoggingOut: state.auth.isLoggingOut,
//         logoutError: state.auth.logoutError,
//         user: state.auth.user
//     };

// }

//export default connect(mapStateToProps)(Home);
export default Home;