import React from 'react';
import { connect } from "react-redux";
import { db } from '../../firebase/firebase';


import SearchIcon from '@material-ui/icons/Search';

import './searchAccount.styles.css'

function mapStateToProps(state) {
    return {
        user: state.auth.user.uid
        
    };
}

class AccountSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email:'',
            parentId: this.props.user, //adding so we can assign primary parent id to this user
            // results: '',
            // message: '',
            loading: false
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.fetchEmailSearchResults = this.fetchEmailSearchResults.bind(this);
        
    }

    handleChange = (event) => {
        event.preventDefault();

        const email = event.target.value;
        console.log(email);
        this.setState({
            email: email,
            loading: true
            // message: ''
        });
    }


    fetchEmailSearchResults = (event) => {
        event.preventDefault();

        console.log("email: ", this.state.email)
        const email = this.state.email;

        const usersRef = db.collection("users").where("email", "==", email);
    
        usersRef.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    //console.log(doc.id, '=>', doc.data());
                    if(doc.exists) {
                        const data = doc.data();
                        console.log(data.email);
                    } else {
                        alert('no such email')
                        console.log('no doc')
                    }
                })
                //.catch(function(error) {
               // console.log('Error getting user by email', error);
            })
            this.setState({
                email: email,
                loading: false
            })
            //})
        }
    
        render() {
            const email  = this.state.email;
            //console.log(this.state.email);
            //console.warn("warn this.state: ", this.state.email)
            return (
                <div className="container">
                    <form className='search-form' noValidate autoComplete="off" onSubmit={this.fetchEmailSearchResults}>
                    
                        <label className="search-label" htmlFor="search-email">
                            <input
                                type="text"
                                name="email"
                                value={this.state.email}
                                id="search-email"
                                placeholder="Search by email..."
                                onChange={this.handleChange}
                                
                            />
                            <SearchIcon className="search-icon" fontSize="large"  />   
                        </label>
                    </form>
                </div>
            )
        }
    }

export default connect(mapStateToProps)(AccountSearch)