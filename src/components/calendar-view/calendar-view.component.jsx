import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import { db } from '../../firebase/firebase';
import ExampleControlSlot from './ExampleControlSlot'
import moment from 'moment';
import Modal from 'react-modal';

import "react-big-calendar/lib/css/react-big-calendar.css";
import './calendar-view.styles.css';

const localizer = momentLocalizer(moment);

const propTypes = {}

class CalendarView extends React.Component {
    
    constructor(...args) {
        super(...args)

        this.state = { events: [], description: '' }
    }

    // handleDate = ({ start, end }) => {
    //     <form>
    //         <input
    //         className="input" 
    //         name="eventTitle" 
    //         component="input" 
    //         type="text" 
    //         value={this.state.title}
    //         onChange={this.handleChange}
    //         label="Event Title"/>
                            
    //     </form>
    // }
handleSelect = ({ start, end }) => {
  //set model to true
    this.setState({
        modalIsOpen: true,
        start,
        end
    });
}

renderModal = () => {
    if (!this.state.modalIsOpen) return;
    return(
        <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
        >

            <h2>Add event</h2>
            <form onSubmit={this.onFormSubmit}>
                <input   
                    className="input" 
                    name="title" 
                    component="input" 
                    type="text" 
                    value={this.state.title}
                    //onChange={this.handleChange}
                    label="Title"/>


                <input type="submit" value="Submit" /><br />
                <button onClick={this.closeModal}>close</button>
            </form>
        </Modal>
    );
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
                style={{ height: "100vh", width: "80vw" }}
                //onSelectSlot={(data) => {console.log(data)}} //create function here to add form
                selectable
                localizer={localizer}
                events={this.state.events}
                defaultView={Views.MONTH}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date(2020, 3, 12)}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={this.handleSelect}
            />
                <button onClick={this.openModal}>Open Modal</button>
                {this.renderModal()}
        </>
        )
    }
}

CalendarView.propTypes = propTypes

export default CalendarView;