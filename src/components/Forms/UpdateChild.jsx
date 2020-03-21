import React from 'react';
import { Redirect } from 'react-router';
import { db } from '../../firebase/firebase';
import FormInput from '../styles/FormInput/FormInput';
//import moment from 'moment';
import DatePicker from 'react-datepicker';
//update to better date picker: https://github.com/clauderic/react-infinite-calendar
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
//import { withStyles } from "@material-ui/styles";
import Header from '../header/header.component';

//import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

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

class UpdateChild extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            firstName: '',
            lastName: '',
            childPhoto: '',
            bloodType: 'bloodDefault',
            birthday: new Date(),
            allergies: '',
            medications: '',
            bedtime: '',
            parentId: this.props.user,
            redirectToReferrer: false
        };
        //console.log('edit', this.props);

        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this); //image
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //console.log('here');
        const id = this.props.match.params.id;
        
        const childRef = db.collection('children').doc(id);
    
        childRef.get().then (doc => {
            if (doc.exists) {
                console.log('child exists!', doc.data());
                const data = doc.data();
                this.setState({
                    isLoading: false,
                    id: id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    childPhoto: data.url,
                    bloodType: data.bloodType,
                    birthday: data.birthday.toDate(),
                    medications: data.medications,
                    allergies: data.allergies,
                    bedtime: data.bedtime,
                    url: data.url
                })            
            } else {
                console.log('no doc');
            }

        }).catch(function(error) {
            console.log("error getting child", error)
        })
    }
    
    handleImageChange(event) {
        this.setState({childPhoto: event.target.url});
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
        console.log(this.props);
        let id = this.state.id;

        let childRef = db.collection('children').doc(id);

        childRef.update(data);

        this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            childPhoto: data.url,
            bloodType: data.bloodType,
            birthday: data.birthday,
            medications: data.medications,
            allergies: data.allergies,
            bedtime: data.bedtime,
            id: data.id,
            redirectToReferrer: true

        })

    };
    render() {
        //console.log(this.state.birthday)
        //console.log(this.state);
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect to="/myAccount" />
        }
        return (
            <>
            <Header />
            <Container component="main" maxWidth="xs">
                <Paper className={styles.paper} className="card">
                    <Typography component="h1" variant="h5">
                        Update Child Details
                    </Typography>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="field">
                            <div className="control">
                                <div className="center">
                                    {/* <div className="row">
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
                                    <br /> */}
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
                                <div className="group">
                                    <label className="label" type="text">Blood Type 
                                
                                <select value={this.state.bloodType} onChange={this.handleSelectChange}>
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
                                <DatePicker
                                    dateFormat="MM/dd/yyyy"
                                    time={false}
                                    
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
                                <button className="newSubmit waves-effect orange accent-2">Update Information</button>
                            </div>
                        </div>
                    </form>
                </Paper>
            </Container>
            </>
        );
    }
}

export default connect(mapStateToProps)(UpdateChild);
