import React from 'react';
import Header from '../header/header.component';
import { connect } from "react-redux";
import { db } from '../../firebase/firebase';

import Container from '@material-ui/core/Container';
import ProfileMenu from '../menu-profile/menu-profile.component'
import AccountSearch from '../account-search/searchAccount.component';
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
            data: [],
        }
    }
    
    componentDidMount() {

        const { user } = this.props
        console.log('userId: ', user.uid)
        
        const userRef = db.collection('users').doc(user.uid)

        userRef.get()
            .then(doc => {
                if (doc.exists) {
                    console.log("User data: ", doc.data())
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
        console.log(this.state.data)

        const family = this.state.data.map((family) => {
            return <ul>
                <li>
                    {family.name}
                </li>
            </ul>});

        console.log('this.state.data: ', this.state.data)
        return (
            <div>
                <Header />
                <ProfileMenu />
                <Container maxWidth='sm' >  
                    <div className='userProfileView'>
                        <div className='profile-header'>
                            <h5>Account Info</h5>
                        </div>
                        <hr />
                        <p>username: {this.state.data.displayName}</p>
                        <p>email: {this.state.data.email}</p>
                        <p>Account members: {family}</p>
                    </div>   
                </Container>
                <AccountSearch />
            </div>
        )
    }
}

export default connect(mapStateToProps)(AccountView);