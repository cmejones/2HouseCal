import React from 'react';

import FormInput from '../styles/FormInput/FormInput';
import CustomButton from '../styles/CustomButton/CustomButton';

import { auth, createUserProfileDocument } from '../../firebase/firebase';

//import './sign-up.styles.css';

class SignUp extends React.Component {
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
            
            this.setState({
                displayName: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error(error);
        }
    };


    render() {
        const { displayName, firstName, lastName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>Sign up for an Account</h2>
                <span>By creating an account, you will be able to utilize all of the 2HouseCal features!</span>
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
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
                </div>
        )
    
    }
}

export default SignUp;