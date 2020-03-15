import React from 'react';
import { db } from '../../firebase/firebase';
import FormInput from '../styles/FormInput/FormInput';
import DatePicker from 'react-datepicker';
//update to better date picker: https://github.com/clauderic/react-infinite-calendar
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/styles";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";


const styles = () => ({
    "@global": {
        body: {
        backgroundColor: "#fff"
        }
    },
    paper: {
        marginTop: 100,
        display: "flex",
        padding: 20,
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#f50057"
    },
    form: {
        marginTop: 1
    },
    errorText: {
        color: "#f50057",
        marginBottom: 5,
        textAlign: "center"
    }
});

class AddChild extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.auth);

        this.state = {
            firstName: '',
            lastName: '',
            childPhoto: '',
            bloodType: 'bloodDefault',
            birthday: new Date(),
            allergies: '',
            medications: '',
            bedtime: '',
            parentId: this.props
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

        handleSelectChange(event) {
            this.setState({bloodType: event.target.value});
        }

        handleDateChange = (date) => {
            const birthday = this.state.birthday;

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

            let setDoc = db.collection('children').doc().set(data);

            this.setState({
                firstName: '',
                lastName: '',
                childPhoto: '',
                bloodType: 'bloodDefault',
                birthday: new Date(),
                medications: '',
                allergies: '',
                bedtime: ''

            })
        //update here

    };
    render() {
        // const { classes } = this.state;
        // console.log(this.props, 'props');
        console.log(this.state, 'this state');
        
        const { user } = this.props; //needed to render redux store
        console.log(this.props, 'user');
        return (
                <Container component="main" maxWidth="xs">
                    <Paper className={styles.paper}>
                    <Avatar className={styles.avatar}>
                        
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Child Details
                    </Typography>
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

                        <div className="field">
                            <div className="control">
                                <div className="group">
                                    <label className="label" type="text">Blood Type 
                                
                                <select value={this.state.bloodType.value} onChange={this.handleSelectChange}>
                                    <option value="bloodDefault">-- Select --</option>
                                    <option value="opos">O positive</option>
                                    <option value="aneg">A negative</option>
                                    <option value="apos">A positive</option>
                                    <option value="bneg">B negative</option>
                                    <option value="bpos">B positive</option>
                                    <option value="abneg">AB negative</option>
                                    <option value="abpos">AB positive</option>
                                </select>
    
                                </label>
                            </div>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <FormInput
                                    className="input" 
                                    name="medications" 
                                    component="input" 
                                    type="text" 
                                    value={this.state.medications}
                                    onChange={this.handleChange}
                                    label="medications"/>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <FormInput
                                    className="input" 
                                    name="allergies" 
                                    component="input" 
                                    type="text" 
                                    value={this.state.allergies}
                                    onChange={this.handleChange}
                                    label="allergies"/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <FormInput
                                    className="input" 
                                    name="bedtime" 
                                    component="input" 
                                    type="text" 
                                    value={this.state.bedtime}
                                    onChange={this.handleChange}
                                    label="Bedtime"/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                {/* <label className="label">Birthday</label> */}
                                <DatePicker
                                    dateFormat="MM/dd/yyyy"
                                    time={false}
                                    //className="input" 
                                    name="birthday" 
                                    component="date" 
                                    type="date" 
                                    selected={this.state.birthday}
                                    value={this.state.birthday}
                                    onChange={this.handleDateChange}
                                    label="Birthday"
                                />
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <Button>Add Child</Button>
                            </div>
                        </div>
                    </form>
                </Paper>
            </Container>
        );
    }
}



export default AddChild;