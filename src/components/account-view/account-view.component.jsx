import React from 'react';
import { connect } from "react-redux";
import { db } from '../../firebase/firebase';

import './account-view.styles.css';

class AccountView extends React.Component {
    
    componentDidMount() {

        const { user } = this.props
        console.log('userId: ', user.uid)
        
        const userRef = db.collection('users').doc(user.uid)
       
        userRef.get()
            .then(snapshot => {
                if (snapshot.exists) {
                    console.log("User data: ", snapshot.data)
                    this.setState({
                        ...snapshot.data
                    })
                } else {
                    console.log('No such document!')
                }
               
            }).catch(function (error) {
                console.log("Error getting document: ", error);
            })            
    }
    
    render() {
        
        const { user } = this.props;
        console.log('render props: ', this.props)
        return (
            <div>
                <div className='userProfileView'>
                    <h1>This is the account view page</h1>
                    <p>{user.email}</p>
                    <p>{user.uid}</p>
                    <p>{user.displayName}</p>
                   
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) { //need to render redux store
    return {

        user: state.auth.user
    };

}



export default connect(mapStateToProps)(AccountView);