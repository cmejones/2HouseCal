import React from 'react';
import { db } from '../../utils/auth';
import FormInput from '../styles/FormInput/FormInput';
import DatePicker from 'react-datepicker';
//update to better date picker: https://github.com/clauderic/react-infinite-calendar
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
//import { withStyles } from "@material-ui/styles";

import Avatar from "@material-ui/core/Avatar";
//import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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

class UpdateChild extends React.Component {
    constructor(props) {
        super(props);
        console.log('edit', this.props);

    //     this.state = {
    //         firstName: '',
    //         lastName: '',
    //         childPhoto: '',
    //         bloodType: 'bloodDefault',
    //         birthday: new Date(),
    //         allergies: '',
    //         medications: '',
    //         bedtime: '',
    //         parentId: this.props.user
    //     };
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleDateChange = this.handleDateChange.bind(this);
    //     this.handleSelectChange = this.handleSelectChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }
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
            let id = '';//get DocId of child

            let childRef = db.collection('children').doc(id);

            let updateDoc = childRef.update(data);

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
        console.log(this.state, 'this state');
       // const { user } = this.props; //needed to render redux store

        return (
                <Container component="main" maxWidth="xs">
                    <Paper className={styles.paper}>
                    <Avatar className={styles.avatar}>
                        
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Update Child Details
                    </Typography>
                    <form className="form" onSubmit={this.handleSubmit}>
          

                        <div className="field">
                            <div className="control">
                                <button>Update Information</button>
                            </div>
                        </div>
                    </form>
                </Paper>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(UpdateChild);
