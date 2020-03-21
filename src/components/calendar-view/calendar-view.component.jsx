import React from 'react';
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
        this.handleSelect = this.handleSelect.bind(this);
    }

    async componentDidMount() {
        const { user } = this.props;

        let myEventsRef = await db.collection("events").doc(user.uid).collection("myEvents")
        console.log('myEventsRef: ', myEventsRef)
        myEventsRef.get()
        .then(function(snapshot) {
            
                let events = [];
                snapshot.forEach(doc => {
                    events.push({
                        id:doc.id,
                        ...doc.data()
                    });
                    this.setState = {
                        events: events
                    }
                    //console.log(doc.id, '=>', doc.data()); //showing children
                    console.log(events, 'events')
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    handleSelect = ({ start, end }) => {    

        const { user } = this.props
        console.log('userId handleSelect: ', user.uid)
       
        const title = window.prompt('New Event name')
        if (title) 
        
        this.setState({
            events: [
            ...this.state.events,
                {
                    start,
                    end,
                    title,

                }
            ],  
        })
        console.log('this.setState: ', this.state.events)

    // getting last item from events array 
    let dataToAdd = this.state.events[(this.state.events.length - 1)]
    // convert array to object for firestore
    let data = {dataToAdd}
    console.log('data: ', data)
        
    // Add event to Firestore by user 
    db.collection("events").doc(user.uid)
    .collection("myEvents").doc().set({data}, { merge: true })   
    
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