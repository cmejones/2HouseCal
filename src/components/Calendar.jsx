import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import './calendar.styles.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

class MyCalendar extends React.Component {
    constructor() {
        super();
    }
    state = {
        events: [
            {
                start: new Date(),
                end: new Date(moment().add(1, "days")),
                title: "Testing add events"
            }
        ],
        ...this.props
    }
    render() {
        return (
            <div>
                <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={this.state.events}
                    style={{ height: "100vh", width: "80vw" }}
                    selectable
                    onSelectSlot={(data) => {console.log(data)}} //create function here to add form
                />
            </div>
        )
    }
}
export default MyCalendar;