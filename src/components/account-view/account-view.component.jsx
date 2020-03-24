import React from 'react';
import Header from '../header/header.component';
import { connect } from "react-redux";
import { db } from '../../firebase/firebase';

import Container from '@material-ui/core/Container';
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
            family: [],
            familyMembers: []
        }
    }

    async componentDidMount() {
        const { user } = this.props
        console.log('userId: ', user.uid)
        
        const userRef = await db.collection('users').doc(user.uid)

        await userRef.get()
            .then(doc => {
                if (doc.exists) {
                    console.log("User data: ", doc.data())
                    this.setState({
                        data: doc.data(),
                        family: doc.data(),
                        familyMembers: doc.data().family
                    })
                } else {
                    console.log('No such document!')
                }
            
            }).catch(function (error) {
                console.log("Error getting document: ", error);
        })  
        //this.getFamilyMembers();
    }

    // async getFamilyMembers() {
    //     let parentId = this.props.user.uid;
    //     if(parentId) {
    //         const familyRef = await db.collection('users').where('parentId', '==', parentId)

    //     await familyRef.get()
    //     .then(snapshot => {
    //         let familyMembers = [];
    //         snapshot.forEach(doc => {
    //             const { displayName, email} = doc.data().family;
    //             familyMembers.push({
    //                 id:doc.id,
    //                 displayName: displayName,
    //                 email: email
                    
    //             });
    //         });
    //         this.setState ({
    //             familyMembers: familyMembers
    //         })
    //         //console.log(this.state.familyMembers);
    //     })
        
    //     .catch(err => {
    //         console.log('error getting family information', err);
    //     })
    //     }
    // }

    render() {
        const familyMembers  = this.state.familyMembers;

        return (
            <div>
                <Header />

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
                                return `${family.email}`})}
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