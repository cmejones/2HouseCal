import React, { Component } from "react";
//import { connect } from "react-redux";
//import { logoutUser } from "../actions";
import Header from '../components/header/header.component';
//import { stat } from "fs";
import '../index.css';
import CalendarView from "./calendar-view/calendar-view.component";
import AddChild from '../components/Forms/AddChild';
import MyAccount from '../pages/MyAccount';
import MenuProfile from '../components/menu-profile/menu-profile.component';

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
            <div className="container d-flex justify-content-center mt-3">
                <div className="row">
                    <main>
                        <div>
                            <MenuProfile />
                        </div>
                        <div className="row">
                            <div className="col s12 m10">
                                <CalendarView />
                            </div>
                            <div className="col s12 m2">
                                <img className='responsive-img home-logo' src="https://firebasestorage.googleapis.com/v0/b/housecal-4ff38.appspot.com/o/2HouseCalLogoLg.png?alt=media&token=257a6cc6-2801-40f2-b7b4-7329258ea1df" />
                            </div>
                        </div>
                    </main>
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