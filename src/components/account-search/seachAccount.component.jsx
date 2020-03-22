import React from 'react';
import { connect } from "react-redux";
import { db } from '../../firebase/firebase';


import SearchIcon from '@material-ui/icons/Search';

import './searchAccount.styles.css'

function mapStateToProps(state) {
    return {
        user: state.auth.user
        
    };
}

class AccountSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            email:'',
            results: '',
            loading: false,
            message: ''
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.fetchEmailSearchResults = this.fetchEmailSearchResults.bind(this);
        
    }

   handleChange = (event) => {

        const email = event.target.value;
        console.log(email);
        this.setState({
            email: email,
            loading: true,
            message: ''
        });
        
    }

    async fetchEmailSearchResults(email){
   
        console.log("email: ", email)

        const usersRef = await db.collection("users").where("email", "==", email);
    
        usersRef.get()
            .then(function(querySnapshot) {
                if(querySnapshot) {
                    console.log(querySnapshot);
                    this.setState({
                        email: email,
            
                })
                 
                } else {
                    console.log('No user found!')
                }
                })
            .catch(err => {
                console.log('Error getting user by email', err);
            });

            console.log("this.state after query:", this.state)
            
        }
       
        render() {
            const { email } = this.state;

            console.warn("warn this.state: ", this.state)
            return (
            <div className="container">
                <form className='search-form' noValidate autoComplete="off" onSubmit={this.fetchEmailSearchResults}>
                
                    <label className="search-label" htmlFor="search-email">
                        <input
                            type="text"
                            name="email"
                            value={email}
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