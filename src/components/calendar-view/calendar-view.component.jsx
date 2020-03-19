import React from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import "react-big-calendar/lib/css/react-big-calendar.css";
// import _ from 'lodash'

const localizer = momentLocalizer(moment);

const propTypes = {}

class MyCalendar extends React.Component {
    constructor(...args) {
        super(...args);
    
        this.state = {
            events: []
     
        }   
    //  this.handleSelect = this.handleSelect.bind(this)   
    
      
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
            const { localizer } = this.props
            return (
                <div>
                    <Calendar
                        selectable
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView={Views.WEEK}
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

export default MyCalendar;