import React from 'react';
import { db } from '../../firebase/firebase';
import FormInput from '../styles/FormInput/FormInput';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// import Moment from 'moment'
// import momentLocalizer from 'react-widgets-moment';
// import DateTimePicker from 'react-widgets/lib/DateTimePicker';

//let { DateTimePicker } = ReactWidgets;
// Moment.locale('en')
// momentLocalizer()

// let formatter = momentLocalizer();

// () => {
//   const [startDate, setStartDate] = useState(new Date());
//   return (
//     <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
//   );
// };

class AddChild extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            childPhoto: '',
            bloodType: '',
            birthday: moment()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

        handleDateChange = (date) => {
            this.setState({
                birthday: date
            })
        }
        
        handleChange = (event) => {
            event.preventDefault();
        
            const { name, value } = event.target
            this.setState({
                [name]: value
            })
        }

        handleSubmit = async event => {
            event.preventDefault();

            const data = this.state;

             db.collection('children').doc().set(data);

        //update here

    };
    render() {
        // const { firstName, lastName, birthday, bloodType, childPhoto } = this.state;
        console.log(this.state, 'this state');

        return (
            <div className="App">

                <div className="container">
                    <h2 className="title">Enter Child Details</h2>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="field">
                            <div className="control">
                                {/* <label className="label">First Name</label> */}
                                <FormInput
                                    className="input" 
                                    name="firstName" 
                                    component="input" 
                                    type="text" 
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                    label="First Name"/>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <FormInput
                                    className="input" 
                                    name="lastName" 
                                    component="input" 
                                    type="text" 
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                    label="Last Name"/>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <FormInput
                                    className="input" 
                                    name="childPhoto" 
                                    component="input" 
                                    type="text" 
                                    value={this.state.childPhoto}
                                    onChange={this.handleChange}
                                    label="Child Photo"/>
                            </div>
                        </div>

                        {/* <div className="field">
                            <div className="control">
                                <label className="label">Blood Type</label>
                                <div className="select">
                                <input
                                    className="input" 
                                    name="bloodType"
                                    value={this.state.bloodType}
                                    onChange={this.handleChange} 
                                    component="select">
                                    <option />
                                    <option value="oneg">O negative</option>
                                    <option value="opos">O positive</option>
                                    <option value="aneg">A negative</option>
                                    <option value="apos">A positive</option>
                                    <option value="bneg">B negative</option>
                                    <option value="bpos">B positive</option>
                                    <option value="abneg">AB negative</option>
                                    <option value="abpos">AB positive</option>
                                </input>
                                </div>
                            </div>
                        </div> */}

                        <div className="field">
                            <div className="control">
                                <DatePicker
                                    //editFormat={formatter}
                                    //defaultValue={new Date()}
                                    dateFormat="MM/DD/YYYY"
                                    time={false}
                                    className="input" 
                                    name="birthday" 
                                    component="date" 
                                    type="date" 
                                    //selected={birthday}
                                    value={this.state.birthday}
                                    onChange={this.handleDateChange}
                                    label="Birthday"
                                />
                            </div>
                        </div>

                        {/* <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                <Field name="saveDetails" id="saveDetails" component="input" type="checkbox"/>
                                Save Details
                                </label>
                            </div>
                        </div> */}

                        {/* <div className="field">
                            <div className="control">
                                <label className="label">Message</label>
                                <Field className="textarea" name="message" component="textarea" />
                            </div>
                        </div> */}

                        <div className="field">
                            <div className="control">
                                <button className="button is-link">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default AddChild;