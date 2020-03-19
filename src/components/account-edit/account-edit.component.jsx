import React from 'react';
import { connect } from "react-redux";
import { db } from '../../firebase/firebase';


import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import ProfileMenu from '../menu-profile/menu-profile.component'

import './account-edit.styles.css'

function mapStateToProps(state) {
    return {
        user: state.auth.user
        
    };
}

class AccountEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message:''
        }
       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        const { user } = this.props
        console.log('userId componentDidMount: ', user.uid)

        db.collection('users').doc(user.uid).get()
            .then(doc => {
                if (doc.exists) {
                    console.log("User data - componentDidMount: ", doc.data())
                    const data = doc.data()
                    this.setState({
                        message: data.message
                    
                    })
                } else {
                    console.log('No such document!')
                }

            }).catch(function (error) {
                console.log("Error getting document: ", error);
            })
    }

    handleChange(event) {
        event.preventDefault();
        
        this.setState = {
            message: event.target.value
        }
       
        console.log('message to be submitted: ', this.state.message)
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { user } = this.props
        console.log('userId handleSubmit: ', user.uid);

        let data = this.state;

        const userRef = db.collection("users").doc(user.uid)
        userRef.update(data)
            .then(() => {
                this.setState({
                    message: data.message
                })
                console.log('message: ', data.message)
                alert('Your account has been updated');
               

            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
       
       
    }

    render() {
        console.log('this.state.data-render: ', this.state)
        
        return (
            <div>
                <ProfileMenu />
                <Container maxWidth='sm'>
                    <h4>This is the account edit view</h4>
                    <form className='account-edit-form' onSubmit={this.handleSubmit}>
                        <label>
                            message:
                        <input
                            type='text'
                            name='message'
                            value={this.state.value}
                            onChange={this.handleChange}
                            required
                            />
                        </label>
                        <Button variant="contained" color="secondary" type='submit'>Save Changes</Button>
                    </form>    
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AccountEdit);

