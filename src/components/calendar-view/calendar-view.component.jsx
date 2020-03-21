import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import { db } from '../../firebase/firebase';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import FormInput from '../styles/FormInput/FormInput';
//update to better date picker: https://github.com/clauderic/react-infinite-calendar
import 'react-datepicker/dist/react-datepicker.css';

import "react-big-calendar/lib/css/react-big-calendar.css";
import './calendar-view.styles.css';

const localizer = momentLocalizer(moment);

const propTypes = {}
//const events = [];

function mapStateToProps(state) { //need to render redux store
    return {
        user: state.auth.user.uid
       // userName: state.auth.user.firstName + state.auth.user.lastName
    };
}

class CalendarView extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = { 
            events:[],
            parentId: this.props.user
        }

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
   // this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateEvents() {
        const eventsRef = db.collection('events')
    
        eventsRef.get()
        .then(snapshot => {
            let events = [];
            snapshot.forEach(doc => {
                const { start, end , ...data } = doc.data();
                events.push({
                    id:doc.id,
                    start: start.toDate(),
                    end: end.toDate(),
                    ...data
                });
                //console.log(doc.id, '=>', doc.data()); //showing children
                console.log(events, 'events')
            });
        
            this.setState({
                events: events
            })
        })
        .catch(err => {
            console.log('error getting children information', err);
        })
    }

    componentDidMount() {
        //console.log('here');
        let parentId = this.props.user;
        console.log(this.props, 'user');
        //const eventsRef = db.collection('events').where('parentId', '==', parentId)
        this.updateEvents();
    }

    handleSelect = ({ start, end }) => {
        console.log(this.state);
    //set model to true
        this.setState({
            modalIsOpen: true,
            start: start,
            end: end
        });
    }

    renderModal = () => {
        if (!this.state.modalIsOpen) return;
        console.log(this.state);
        return(
        
            <Modal
            //appElement={el}
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Calender Modal"
            >

                <p><strong>ADD EVENT</strong></p>
                <form onSubmit={this.handleSubmit}>
                    <div class="input-field col s6">
                        <FormInput    
                            required                     
                            placeholder="Event Title"
                            className="validate" 
                            name="title" 
                            component="input" 
                            type="text" 
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div class="input-field col s6">
                        <label>Start</label>
                        <DatePicker
                            dateFormat="MM/dd/yyyy"
                            //time={false}
                            //className="input" 
                            name="start" 
                            component="date" 
                            type="date" 
                            selected={this.state.start}
                            value={this.state.start}
                            onChange={this.handleDateChange}
                            label="Start"
                        />
                    </div>

                    <div class="input-field col s6">
                        <label>End</label>
                        <DatePicker
                            dateFormat="MM/dd/yyyy"
                            //time={false}
                            //className="input" 
                            name="end" 
                            component="date" 
                            type="date" 
                            selected={this.state.end}
                            value={this.state.end}
                            onChange={this.handleDateChange}
                            label="End"
                        />
                    </div>


                    <input className="btn" type="submit" value="Add Event" /><br />
                    <br /><button className="btn" onClick={this.closeModal}>Close</button>
                </form>
            </Modal>
        );
    }  

    handleChange = (event) => {
        event.preventDefault();
    
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
        console.log(this.state, "handle change");
    }

    handleDateChange = (date) => {
        const start = this.state.start;
        const end = this.state.end;

        this.setState({
            start: start,
            end: end
        })
    }

    handleSubmit = async event => {
        event.preventDefault();
        console.log(this.state)
        //add each field here or events will be nested in db
        const data = {
            title: this.state.title,
            start: this.state.start,
            end: this.state.end,
            parentId: this.state.parentId
        }
        console.log(data, 'data');

        let setDoc = db.collection('events').doc().set(data);

        this.setState({
            modalIsOpen: false

        })
        this.updateEvents();
    };

    render() {

        //const { localizer } = this.props
        return (
        <>
            <Calendar
                style={{ height: "100vh", width: "auto" }}
                selectable
                localizer={localizer}
                events={this.state.events}
                defaultView={Views.MONTH}
                startAccessor='start'
                endAccessor='end'
                scrollToTime={new Date()}
                defaultDate={new Date()}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={this.handleSelect}
            />
            {/* hidden hyperlink */}
                <a onClick={this.openModal}></a>
                {this.renderModal()}
        </>
        )
    }
}

CalendarView.propTypes = propTypes

export default connect(mapStateToProps)(CalendarView);