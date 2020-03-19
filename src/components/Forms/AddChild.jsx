import React from 'react';
import { db, storage } from '../../firebase/firebase';
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


const storageRef = storage.ref();
const imagesRef = storageRef.child('images');

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
            parentId: this.props.user
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

        handleImageUpload = () => {
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
                    childPhoto: url
                });
            });
        }
        );
    };
    // handleImageChange(event) {
    //     this.setState({childPhoto: event.target.url});
    // }

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

            const data = this.state;
            console.log(data, 'data');

            let setDoc = db.collection('children').doc().set(data);

            this.setState({
                firstName: '',
                lastName: '',
                //childPhoto: null,
                url: '',
                progress: 0,
                bloodType: 'bloodDefault',
                birthday: new Date(),
                medications: '',
                allergies: '',
                bedtime: ''

            })
        //update here

    };
    render() {
        console.log(this.state, 'this state');
       // const { user } = this.props; //needed to render redux store

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
                                <div className="center">
                                    <div className="row">
                                        <progress value={this.state.progress} max="100" className="progress" />
                                    </div>

                                    <div className="file-field input-field">
                                        <div className="btn">
                                            <span>File</span>
                                            <input type="file" onChange={this.handleImageChange} />
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" type="text" />
                                        </div>
                                    </div>
                                    <a
                                    onClick={this.handleImageUpload}
                                    className="btn"
                                    >
                                    Upload
                                    </a>
                                    <br />
                                    <img
                                    className="responsive-img"
                                    src={this.state.url || "https://via.placeholder.com/400x300"}
                                    alt="Uploaded Images"
                                    height="300"
                                    width="400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <div className="group">
                                    <label className="label" type="text">Blood Type 
                                
                                <select value={this.state.bloodType.value} onChange={this.handleSelectChange}>
                                    <option value="bloodDefault">-- Select --</option>
                                    <option value="oneg">O negative</option>
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
                                <button>Add Child</button>
                            </div>
                        </div>
                    </form>
                </Paper>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(AddChild);