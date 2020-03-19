import React from 'react';
import { connect } from "react-redux";
import { db } from '../../firebase/firebase';


import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import ProfileMenu from '../menu-profile/menu-profile.component'
import './account-delete.styles.css';

function mapStateToProps(state) { 
    return {
        user: state.auth.user
    };
}

class AccountDelete extends React.Component {
    constructor(props) {
        super(props);
        console.log('edit this prop: ', this.props)
        this.state = {
            data: [],
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
       
        const { user } = this.props
        console.log('userId: ', user.uid);

        db.collection("users").doc(user.uid).delete()
            .then(function () {
                alert('Your account has been deleted');
                this.setState = {
                    user: []
                }
                
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
                    <h4>Delete Account?</h4>
                    <Button variant="contained" color="secondary" onClick={this.handleClick}>Delete</Button>
                    
      

                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AccountDelete);
