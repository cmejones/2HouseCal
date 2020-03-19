import React from 'react';
import { connect } from "react-redux";
import { db } from '../../firebase/firebase';

import Container from '@material-ui/core/Container';
import ProfileMenu from '../menu-profile/menu-profile.component'
import './account-view.styles.css';

function mapStateToProps(state) { //need to render redux store
    return {
        user: state.auth.user
    };
}
class AccountView extends React.Component {
    constructor(props) {
        super(props);
        console.log('edit this prop: ', this.props)
        this.state = {
            data: []
        }
    }
    
    componentDidMount() {
        console.log('here');

        //const { user } = this.props
        console.log('userId: ', this.props.user.uid)
        let id = this.props.user.uid;
        console.log(id);
        
        const userRef = db.collection('users').doc(id)
        //console.log(userRef);
    
        userRef.get()
            .then(doc => {
                if (doc.exists) {
                    console.log("User data: ", doc.data());
                    const data = doc.data();
                    console.log(data, 'data');
                    this.setState({
                        data: doc.data()
                    })
                } else {
                    console.log('No such document!')
                }
            
            }).catch(function (error) {
                console.log("Error getting document: ", error);
            })            
    }
    
    render() {
        console.log('this.state.data: ', this.state)
        return (
            <div>
                <ProfileMenu />
                <h1>Your Account</h1>
                <Container maxWidth='sm' >  
                    <div className='userProfileView'>
                        <p>username: {this.state.data.displayName}</p>
                        <p>email: {this.state.data.email}</p>
                        <p>message: {this.state.data.message}</p>
                    </div>   
                </Container>
            </div>

        )
    }
}

export default connect(mapStateToProps)(AccountView);