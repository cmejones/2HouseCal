import React from 'react';
import Header from '../header/header.component';
import Sidenav from '../header/sidebar';
import { connect } from "react-redux";
import { db } from '../../firebase/firebase';

import Container from '@material-ui/core/Container';
//import AccountSearch from '../account-search/searchAccount.component';
import AccountSearch from '../account-search/searchAccountFB';
import './account-view.styles.css';

function mapStateToProps(state) { //need to render redux store
    return {
        user: state.auth.user
    };
}

class AccountView extends React.Component {
    constructor(props) {
        super(props);
        //console.log('edit this prop: ', this.props)
        this.state = {
            data: [],
           // family: [],
            familyMembers: []
        }
    }

    async componentDidMount() {
        const { user } = this.props
        //console.log('userId: ', user.uid)
        
        const userRef = await db.collection('users').doc(user.uid)

        await userRef.get()
            .then(doc => {
                if (doc.exists) {
                    console.log("User data: ", doc.data())
                    this.setState({
                        data: doc.data(),
                        //family: doc.data(),
                        familyMembers: doc.data().family
                    })
                } else {
                    console.log('No such document!')
                }
            
            }).catch(function (error) {
                console.log("Error getting document: ", error);
        })  
    }


    render() {
        const familyMembers  = this.state.familyMembers;
        //console.log('array', this.state.familyMembers);

        return (
            <div>
                <Header />
                <Sidenav />

                <Container maxWidth='sm'>  
                    <div className="card">
                        <div className='userProfileView'>
                            <div className='profile-header'>
                                <h5>Account Info</h5>
                            </div>
                            <hr />
                            <p>username: {this.state.data.displayName}</p>
                            <p>email: {this.state.data.email}</p>
                            <p>Account members: {familyMembers.map((family) => {
                                return `${family.email}; `})}
                            </p>
                        </div>  
                    </div> 
                </Container>
                <AccountSearch />
            </div>
        )
    }
}

export default connect(mapStateToProps)(AccountView);