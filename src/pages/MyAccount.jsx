import React, { Component } from 'react';
import { db } from '../firebase/firebase';
import { connect } from 'react-redux';
import MyChild from '../components/MyChild';
import Header from '../components/header/header.component';
import Sidenav from '../components/header/sidebar';
import '../index.css';

function mapStateToProps(state) { //need to render redux store
    return {
        user: state.auth.user.uid
       // userName: state.auth.user.firstName + state.auth.user.lastName
    };
}

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            isLoading: true
        }
    }
    async getChildren() {
        
    }
    componentDidMount() {
        let parentId = this.props.user; //set parentId to logged in user

        const childrenRef = db.collection('children').where('parentId', '==', parentId);
    
        childrenRef.get()
        .then(snapshot => {
            let children = [];
            snapshot.forEach(doc => {
                children.push({
                    id:doc.id, //child id
                    ...doc.data()
                });
            });
            this.setState({
                children: children,
                isLoading: false
            })
        })
        .catch(err => {
            console.log('error getting children information', err);
        })
    }

    render() {
        
        const myChildren = this.state.children.map((child) => {
            return <MyChild key={child.id} {...child} />
        });

        return (
            this.state.isLoading ? <div>Loading...</div> :
            <div className="dashboard">
                <Header />
                <Sidenav />

                <div className="container">
                    <div className="row">
                        {myChildren}
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(MyAccount);