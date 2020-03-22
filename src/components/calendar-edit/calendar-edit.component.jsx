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
import '../calendar-view/calendar-view.styles.css';

const localizer = momentLocalizer(moment);

const propTypes = {}

function mapStateToProps(state) { //need to render redux store
    return {
        user: state.auth.user.uid
       // userName: state.auth.user.firstName + state.auth.user.lastName
    };
}


class CalendarEdit extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = { 
            events:[],
            parentId: this.props.user
        }

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEventSelect = this.handleEventSelect.bind(this);
    }

    updateEvents() {
        let parentId = this.props.user;
        if(parentId) {
        const eventsRef = db.collection('events').where('parentId', '==', parentId)
        //const eventsRef = db.collection('events')
    
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
                //console.log(events, 'events')
            });
        
            this.setState({
                events: events
            })
        })
        
        .catch(err => {
            console.log('error getting event information', err);
        })
        }
    }

    componentDidMount() {
        //let parentId = this.props.user;
        //const eventsRef = db.collection('events').where('parentId', '==', parentId)
        this.updateEvents();
        Modal.setAppElement('main');
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
        //console.log(this.state);
        return(
            <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Calender Modal"
            >

                <p><strong>ADD EVENT</strong></p>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field col s6">
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
                    <div className="input-field col s6">
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

                    <div className="input-field col s6">
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

//here for editing

    handleEventSelect (props) {
        const id = props.id;
        const eventRef = db.collection('events').doc(id);
        
        eventRef.get().then (doc => {
            if(doc.exists) {
                //console.log('event', doc.data());
                const data = doc.data();
                this.setState({
                    modalEditIsOpen: true,
                    id: id,
                    start: data.start.toDate(),
                    end: data.end.toDate(),
                    title: data.title
                })
            } else {
                console.log('error');
            }
        });
        console.log(this.state);
    }
    
    renderEditModal = () => {
        if (!this.state.modalEditIsOpen) return;
       // console.log(this.state);
        //console.log('here');
        return(
            <Modal
            isOpen={this.state.modalEditIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Calender Edit Modal"
            >

                <p><strong>UPDATE EVENT</strong></p>
                <form onSubmit={this.handleUpdate}>
                    <div className="input-field col s6">
                        <FormInput    
                            required                     
                            placeholder="Event Title"
                            className="validate" 
                            name="title" 
                            component="input" 
                            type="text" 
                            value={this.props.title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field col s6">
                        <label>Start</label>
                        <DatePicker
                            dateFormat="MM/dd/yyyy"
                            //time={false}
                            //className="input" 
                            name="start" 
                            component="date" 
                            type="date" 
                            selected={this.props.start}
                            value={this.props.start}
                            onChange={this.handleDateChange}
                            label="Start"
                        />
                    </div>

                    <div className="input-field col s6">
                        <label>End</label>
                        <DatePicker
                            dateFormat="MM/dd/yyyy"
                            //time={false}
                            //className="input" 
                            name="end" 
                            component="date" 
                            type="date" 
                            selected={this.props.end}
                            value={this.props.end}
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

//end editing 
    handleChange = (event) => {
        event.preventDefault();
    
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
        //console.log(this.state, "handle change");
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
        //console.log(this.state)
        //add each field here or events will be nested in db
        const data = {
            title: this.state.title,
            start: this.state.start,
            end: this.state.end,
            parentId: this.state.parentId
        }
        //console.log(data, 'data');

        db.collection('events').doc().set(data);

        this.setState({
            modalIsOpen: false
        })
        this.updateEvents();
    };

    render() {
        if (this.props.user) {
            this.updateEvents();
            //set this here to make sure site has userid before displaying events
        }
        return (
        <>
            <Calendar
                popup={false}
                onSelectEvent={this.handleEventSelect.bind(this.id)}
                style={{ height: "100vh", width: "auto" }}
                selectable
                localizer={localizer}
                events={this.state.events}
                defaultView={Views.MONTH}
                startAccessor='start'
                endAccessor='end'
                scrollToTime={new Date()}
                defaultDate={new Date()}
                //onSelectEvent={event => alert(event.title)}
                onSelectSlot={this.handleSelect}
                //components={{ event: Event}}
            />
            {/* hidden hyperlink */}
                <a onClick={this.openModal}></a>
                {this.renderModal()}
        </>
        )
    }
}

CalendarEdit.propTypes = propTypes

export default connect(mapStateToProps)(CalendarEdit);