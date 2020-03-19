import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
// import events from '../events'
import ExampleControlSlot from './ExampleControlSlot'
import moment from 'moment';

import "react-big-calendar/lib/css/react-big-calendar.css";
import './calendar-view.styles.css';

const localizer = momentLocalizer(moment);

const propTypes = {}

class CalendarView extends React.Component {
    
    constructor(...args) {
        super(...args)

        this.state = { events: [] }
    }

    handleSelect = ({ start, end }) => {
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
    }

    render() {
        console.log(this.state);
        //const { localizer } = this.props
        return (
        <>
            <ExampleControlSlot.Entry waitForOutlet>
                <strong>
                    Click an event to see more info, or drag the mouse over the calendar
                    to select a date/time range.
                </strong>
            </ExampleControlSlot.Entry>
            <Calendar
                selectable
                localizer={localizer}
                events={this.state.events}
                defaultView={Views.MONTH}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date(2020, 3, 12)}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={this.handleSelect}
            />
        </>
        )
    }
}

CalendarView.propTypes = propTypes

export default CalendarView;