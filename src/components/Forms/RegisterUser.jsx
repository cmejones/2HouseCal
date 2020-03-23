import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/index";
import FormInput from '../styles/FormInput/FormInput';
import CustomButton from '../styles/CustomButton/CustomButton';
import { auth, createUserProfileDocument } from '../../firebase/firebase';
import { withStyles } from "@material-ui/styles";

import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
    "@global": {
        body: {
        backgroundColor: "#F7EEDF"
        }
    },
    paper: {
        marginTop: 50,
        display: "flex",
        padding: 20,
        flexDirection: "column",
    },
    form: {
        marginTop: 1
    },
    errorText: {
        color: "#f50057",
        marginBottom: 5,
        textAlign: "center"
    },
    header: {
        color:"#4F3D16",
        paddingTop: 15
    }
});

class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '', 
            confirmPassword: ''
        }
    }


    handleChange = event => {
        const { name, value } = event.target

        this.setState({ [name]: value });
        console.log(this.state);
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            await createUserProfileDocument(user, { displayName })

        } catch (error) {
            console.error(error);
        }
    };

    handleLogin = () => {
        const { dispatch } = this.props;
        const { email, password } = this.state;

        dispatch(loginUser(email, password));
    };



    render() {
        const { classes, isAuthenticated } = this.props;
        const { displayName, firstName, lastName, email, password, confirmPassword } = this.state;
        if (isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            return (
            
                <div className='sign-up'>
                    <Typography className={classes.header} component="h1" variant="h3" >Sign up for an Account</Typography>
                    <Typography className={classes.header}>By creating an account, you will be able to utilize all of the 2HouseCal features!</Typography>
                    <Container className="col s12 m6" component="main" maxWidth="xs">
                        <Paper className={classes.paper}>
                            <form className='sign-up-form' onSubmit={this.handleSubmit} >
                                <FormInput
                                    type='text'
                                    name='firstName'
                                    value={firstName}
                                    onChange={this.handleChange}
                                    label='First Name'
                                    required
                                />

                                <FormInput
                                    type='text'
                                    name='lastName'
                                    value={lastName}
                                    onChange={this.handleChange}
                                    label='Last Name'
                                    required
                                />

                                <FormInput
                                    type='text'
                                    name='displayName'
                                    value={displayName}
                                    onChange={this.handleChange}
                                    label='Display Name'
                                    required
                                />

                                <FormInput
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={this.handleChange}
                                    label='Email'
                                    required
                                />

                                <FormInput
                                    type='password'
                                    name='password'
                                    value={password}
                                    onChange={this.handleChange}
                                    label='Password'
                                    required
                                />
                            
                                <FormInput
                                    type='password'
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={this.handleChange}
                                    label='Confirm Password'
                                    required
                                />

                                <CustomButton type='submit'>SIGN UP</CustomButton>
                            </form>
                        </Paper>
                    </Container>
                    </div>
            )
        }
    }
}
function mapStateToProps(state) {
    console.log(state, 'state');
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default withStyles(styles)(connect(mapStateToProps)(SignUp));