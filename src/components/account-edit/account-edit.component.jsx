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
        console.log('edit this prop: ', this.props)
        this.state = {
            message:''
        }
        console.log('Edit this: ', this.props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
           message: event.target.value
        })
        console.log('handle change state: ', this.state)
    }

    handleSubmit = async (event) => {

        const { user } = this.props
        console.log('userId: ', user.uid);

        let data = {
            message: this.state.message
        }
        
        await db.collection("users").doc(user.uid).update(data)
            .then(function () {
                console.log('data: ', data)
                alert('Your account has been updated');
               

            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }

    render() {
        console.log('this.state.data: ', this.state.data)
        
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
                            value={this.state.message}
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
