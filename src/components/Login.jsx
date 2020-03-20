import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import { withStyles } from "@material-ui/styles";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";


// import { auth, signInWithGoogle } from '../firebase/firebase';


const styles = () => ({
    "@global": {
        body: {
        backgroundColor: "#F7EEDF"
        }
    },
    paper: {
        marginTop: 100,
        display: "flex",
        padding: 20,
        flexDirection: "column",
        alignItems: "center"
    },
    logo: {
        marginTop: 0,
        display: "flex",
        padding: 0,
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
    },
    header: {
        color:"#4F3D16",
        paddingTop: 15
    }
});

class Login extends Component {
    state = { email: "", password: "" };

    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };

    handleSubmit = () => {
        const { dispatch } = this.props;
        const { email, password } = this.state;

        dispatch(loginUser(email, password));
    };

    render() {
        const { classes, loginError, isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            return (
                <div className="row">
                    <Container className="col m6 hide-on-small-only">
                        
                            <div className={classes.logo}><img className='responsive-img home-logo' src="https://firebasestorage.googleapis.com/v0/b/housecal-4ff38.appspot.com/o/2HouseCalLogoLg.png?alt=media&token=257a6cc6-2801-40f2-b7b4-7329258ea1df" />
                            </div>
                    </Container>
                    <Container className="show-on-small hide-on-med-and-up">
                        
                        <Typography component="h1" variant="h3" className={classes.header}>
                            2HouseCal
                        </Typography>
                        
                    </Container>
                    <Container className="col s12 m6" component="main" maxWidth="xs">
                        <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={this.handleEmailChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={this.handlePasswordChange}
                        />
                        {loginError && (
                            <Typography component="p" className={classes.errorText}>
                                Incorrect email or password.
                            </Typography>
                        )}
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleSubmit}
                            >
                                Sign In
                            </Button>
                        </Paper>
                        <Typography component="h1" variant="h5">Need an account? <a href="/register">Register here!</a>
                        </Typography>
                        {/* Removing google sign in until can figure out how to put in redux */}
                        {/* <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {' '}
                            Sign in with Google{' '}
                        </CustomButton> */}
                    </Container>
                </div>
            );
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

export default withStyles(styles)(connect(mapStateToProps)(Login));