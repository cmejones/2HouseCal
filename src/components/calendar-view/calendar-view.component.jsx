import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import { db } from '../../firebase/firebase';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
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

    async getEvents() {}

    componentDidMount() {
        //console.log('here');
        let parentId = this.props.user;
        console.log(this.props, 'user');
        //const eventsRef = db.collection('events').where('parentId', '==', parentId)
        const eventsRef = db.collection('events')
    
        eventsRef.get()
        .then(snapshot => {
            let events = [];
            snapshot.forEach(doc => {
                events.push({
                    id:doc.id,
                    ...doc.data()
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

                <h2>Add event</h2>
                <form onSubmit={this.handleSubmit}>
                    <input   
                        className="input" 
                        name="title" 
                        component="input" 
                        type="text" 
                        value={this.state.title}
                        onChange={this.handleChange}
                        label="Title"/>
                    
                    <DatePicker
                        dateFormat="MM/dd/yyyy"
                        //time={false}
                        //className="input" 
                        name="startDate" 
                        component="date" 
                        type="date" 
                        selected={this.state.start}
                        value={this.state.start}
                        onChange={this.handleDateChange}
                        label="Start"
                    />
                    <DatePicker
                        dateFormat="MM/dd/yyyy"
                        //time={false}
                        //className="input" 
                        name="endDate" 
                        component="date" 
                        type="date" 
                        selected={this.state.end}
                        value={this.state.end}
                        onChange={this.handleDateChange}
                        label="End"
                    />


                    <input type="submit" value="Submit" /><br />
                    <button onClick={this.closeModal}>close</button>
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

    };

    render() {

        //const { localizer } = this.props
        return (
        <>
            <Calendar
                style={{ height: "100vh", width: "60vw" }}
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