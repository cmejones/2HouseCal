import React from 'react';
// import { propTypes } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { connect } from "react-redux";
import { db } from '../../firebase/firebase';

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function mapStateToProps(state) {
    return {
        user: state.auth.user   
    };
}

const propTypes = {}
class MyCalendar extends React.Component {
    constructor(...props) {
        super(...props);
    
        this.state = {
            events: []
        }  
    }

    handleSelect = ({ start, end }) => {

         const { user } = this.props
        console.log('userId handleSelect: ', user.uid)

        let events = []
        const title = window.prompt('New Event name')
        if (title)
        this.setState({
            events: [
            ...this.state.events,
            {
                start,
                end,
                title,
                
                },
        
            ], 
          
        })
            events.push(this.state.events);
            console.log('handle select state: ', events) 
        
            // convert events array to object for firestore
            let data = {...events}
            // Add events to Firestore by user 
        db.collection("events").doc(user.uid)
            .collection("myEvents").doc().set(data, { merge: true })   
        
  }

    render() {
        
            // const { localizer } = this.props
            return (
                <div>
                    <Calendar
                        selectable
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView={Views.MONTH}
                        events={this.state.events}
                        style={{ height: "100vh", width: "80vw" }} 
                        onSelectEvent={event => alert(event.title)}//create function here to add form
                        onSelectSlot={this.handleSelect}
                    />
                
                </div>
            )
        }  
}

MyCalendar.propTypes = propTypes

export default connect(mapStateToProps)(MyCalendar);