import React from 'react';
import CalendarView from './calendar-view/calendar-view.component';
//import { Calendar, momentLocalizer } from 'react-big-calendar';
//import moment from 'moment';
//import "react-big-calendar/lib/css/react-big-calendar.css";
//const localizer = momentLocalizer(moment);


class MyCalendar extends React.Component {
    // constructor() {
    //     super();
    // }
    // state = {
    //     events: [
    //         {
    //             start: new Date(),
    //             end: new Date(moment().add(1, "days")),
    //             title: "Testing add events"
    //         }
    //     ],
    //     ...this.props
    // }
    render() {
        return (
            <div>
                <CalendarView />
            </div>
        )
    }
}
export default MyCalendar;