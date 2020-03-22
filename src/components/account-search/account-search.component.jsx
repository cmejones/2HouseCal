import React from 'react';
import { connect } from "react-redux";
import { db } from '../../firebase/firebase';

import TextField from '@material-ui/core/TextField';

import './account-search.styles.css'

function mapStateToProps(state) {
    return {
        user: state.auth.user
        
    };
}

class AccountSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            users: [],
            filtered: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        console.log("i'm here")
        let users = []
        db.collection("users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log("doc data: ", doc.data());
                users.push(...doc.data());
                this.setState({
                    ...doc.data(),
                    filtered: this.props.users
            })
            })  
            console.log('users: ', users)  
          
           
        })
      
    console.log('componentDidMount setState: ', this.state)

    }

   handleChange(e){
        e.preventDefault();

        let usersList = []
        let filteredList = []

        if(e.target.value !== ""){
            usersList = this.props.users;

            filteredList = usersList.filter(user => {
                const lc = user.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            })
        } else {
            filteredList = this.props.users;
        }
        this.setState({
            filtered: filteredList
        })
    }

   handleSubmit(e){
        e.preventDefault();
        const usersRef = db.collection('users').where('email', '==', this.email.value)
    
        usersRef.get()
            .catch(err => {
                console.log('error getting user information', err);
            })
        }
       
        render() {
            return (
            <div>
                <form className='search-form' noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <TextField 
                id="standard-basic" 
                label="Search by email..." 
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
                />
                </form>
            </div>
           
        )
        }
    }

export default connect(mapStateToProps)(AccountSearch)