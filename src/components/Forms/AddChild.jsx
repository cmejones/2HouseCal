import React from 'react';
import { Redirect } from 'react-router';
import { db, storage } from '../../firebase/firebase';
import FormInput from '../styles/FormInput/FormInput';
import DatePicker from 'react-datepicker';
//update to better date picker: https://github.com/clauderic/react-infinite-calendar
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
//import { withStyles } from "@material-ui/styles";

import Button from "@material-ui/core/Button";
// TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

//TO DO: error handling; image will override previous image if it has the same name

const storageRef = storage.ref();
storageRef.child('images');

function mapStateToProps(state) { //need to render redux store
    return {
        user: state.auth.user.uid,
        userName: state.auth.user.firstName + state.auth.user.lastName
    };

}
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

        this.state = {
            firstName: '',
            lastName: '',
            childPhoto: null,
            url: '',
            progress: 0,
            bloodType: 'bloodDefault',
            birthday: new Date(),
            allergies: '',
            medications: '',
            bedtime: '',
            parentId: this.props.user,
            redirectToReferrer: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this); //image
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

        handleImageChange = e => {
            if (e.target.files[0]) {
                const childPhoto = e.target.files[0];
                this.setState(() => ({ childPhoto }));     
            }
        };

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
            console.log(this.state, "handle change");
        }

        handleSubmit = async event => {
            event.preventDefault();
            const { childPhoto } = this.state;
            const uploadTask = storage.ref(`images/${childPhoto.name}`).put(childPhoto);
            uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress });
            },
            error => {
                // Error function ...
                console.log(error);
            },
            () => {
                // complete function ...
                storage
                .ref("images")
                .child(childPhoto.name)
                .getDownloadURL()
                .then(url => {
                    this.setState({ 
                        url,
                        childPhoto: null
                    });
                    return db.collection('children').doc().set(this.state)
                    .then (() => 
                        this.setState({
                            firstName: '',
                            lastName: '',
                            childPhoto: null,
                            url: '',
                            progress: 0,
                            bloodType: 'bloodDefault',
                            birthday: new Date(),
                            medications: '',
                            allergies: '',
                            bedtime: '',
                            redirectToReferrer: true
                                    
                        }))
                    })
                });
            };
        
    
    render() {
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect to="/myAccount" />
        }
        //console.log(this.state, 'this state');
       // const { user } = this.props; //needed to render redux store

        return (
            <Container component="main" maxWidth="xs">
                <div className="card">
                    <Paper className={styles.paper}>
                        <Typography component="h1" variant="h5">
                            Add Child Details
                        </Typography>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <div className="field">
                                <div className="control">
                                    <FormInput
                                        required
                                        className="form-input" 
                                        name="firstName" 
                                        component="" 
                                        type="text" 
                                        value={this.state.firstName}
                                        onChange={this.handleChange}
                                        label="First Name"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <FormInput
                                        className="form-input" 
                                        name="lastName" 
                                        component="input" 
                                        type="text" 
                                        value={this.state.lastName}
                                        onChange={this.handleChange}
                                        label="Last Name"
                                    />
                                </div>
                            </div>

                            <div className="field center">
                                <div className="file-field">
                                    <Button className="waves-effect orange accent-2">
                                        <input type="file" onChange={this.handleImageChange} />
                                        Browse for Image
                                    </Button>
                                    <div className="">
                                        <input className="file-path validate" type="text" />
                                    </div>
                                </div>
                                <img
                                    className="responsive-img"
                                    src={this.state.childPhoto ? URL.createObjectURL(this.state.childPhoto) : "https://via.placeholder.com/400x300"}
                                    alt="Uploaded Images"
                                    height="300"
                                    width="400"
                                />
                            </div>

                            <div className="field">
                                <div className="control">
                                    <div className="group label">
                                        <label className="label-inner" type="text">Blood Type                               
                                            <select required value={this.state.bloodType.value} onChange={this.handleSelectChange}>
                                                <option value="bloodDefault">-- Select --</option>
                                                <option value="O negative">O negative</option>
                                                <option value="O positive">O positive</option>
                                                <option value="A negative">A negative</option>
                                                <option value="A positive">A positive</option>
                                                <option value="B negative">B negative</option>
                                                <option value="B positive">B positive</option>
                                                <option value="AB negative">AB negative</option>
                                                <option value="AB positive">AB positive</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <FormInput
                                        required
                                        className="form-input" 
                                        name="medications" 
                                        component="input" 
                                        type="text" 
                                        value={this.state.medications}
                                        onChange={this.handleChange}
                                        label="medications"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <FormInput
                                        required
                                        className="form-input" 
                                        name="allergies" 
                                        component="input" 
                                        type="text" 
                                        value={this.state.allergies}
                                        onChange={this.handleChange}
                                        label="allergies"
                                    />
                                </div>
                            </div>
                            
                            <div className="field">
                                <div className="control">
                                    <FormInput
                                        required
                                        className="form-input" 
                                        name="bedtime" 
                                        component="input" 
                                        type="text" 
                                        value={this.state.bedtime}
                                        onChange={this.handleChange}
                                        label="Bedtime"
                                    />
                                </div>
                            </div>
                            
                            <div className="field">
                                <div className="control">
                                    <div className="group label">
                                        <label className="label-inner">Birthday
                                        </label>
                                        <div>
                                            <DatePicker
                                                dateFormat="MM/dd/yyyy"
                                                time={false}
                                                className="form-input" 
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
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button className="newSubmit waves-effect orange accent-2">ADD CHILD</button>
                                    <div className="row">
                                        <progress value={this.state.progress} max="100" className="progressBar" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Paper>
                </div>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(AddChild);