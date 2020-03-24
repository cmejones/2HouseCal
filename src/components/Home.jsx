import React, { Component } from "react";
import Header from '../components/header/header.component';
import '../index.css';
import CalendarView from "./calendar-view/calendar-view.component";
import Sidenav from "./header/sidebar";

class Home extends Component {
    render() {
        return (
        <div>
            <Header />
            <Sidenav />
            <div className="container d-flex justify-content-center mt-3">
                <div className="row">
                    <main className="home-logo">
                        <div className="row">
                            <div className="col s12 m10 card home-calendar">
                                <CalendarView />
                            </div>

                            <div className="col s12 m2">
                                <img className='responsive-img home-logo' alt="2HouseCalLogo" src="https://firebasestorage.googleapis.com/v0/b/housecal-4ff38.appspot.com/o/2HouseCalLogoLg.png?alt=media&token=257a6cc6-2801-40f2-b7b4-7329258ea1df" />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
        );
    }
}

export default Home;