
import React from 'react';
import { connect } from "react-redux";
import { db } from '../../firebase/firebase';
//import axios from 'axios';

import SearchIcon from '@material-ui/icons/Search';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
        this.cancel = '';
        this.handleChange = this.handleChange.bind(this);
        this.fetchEmailSearchResults = this.fetchEmailSearchResults.bind(this);
        
    }

    handleChange = (event) => {
        event.preventDefault();

        //const query = event.target.value;
        const email = event.target.value;
        console.log(email);
        this.setState({
            email: email,
            //query: query,
            loading: true
            // message: ''
        }, () => {
            this.fetchEmailSearchResults(email)
        });
    }


    fetchEmailSearchResults = (event) => {
       // event.preventDefault();

        //console.log("email: ", query)
        const email = this.state.email;

        const usersRef = db.collection("users").where("email", "==", email);
    
        usersRef.get()
            //add cancel function here
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    //console.log(doc.id, '=>', doc.data());
                    if(doc.exists) {
                        const data = doc.data();
                        console.log(data.email);
                        
                    } else { //not working
                        alert('no such email')
                        console.log('no doc')
                    }
                    this.setState({
                        email: email,
                        loading: false
                })
                //.catch(function(error) {
               // console.log('Error getting user by email', error);
            })

            })
            //})
        }

        renderEmailSearchResults = () => {
            console.log(this.state);
        const { results } = this.state;
        console.log(results);
        if(results) {
            return (
                <Card className="root">
        <CardContent>
        <Typography className="title" color="textSecondary" gutterBottom>
            User Found: 
        </Typography>
        <Typography variant="h5" component="h2">
                email: {results.email}
        </Typography>
        <Typography className="pos" color="textSecondary">
            username: {results.displayName}
        </Typography>
        
        </CardContent>
        <CardActions>
            <Button size="medium">Add Family</Button>
        </CardActions>
        </Card>
            )
        }
    };
    
        render() {
            //const { query } = this.state;
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
                {/* Results */}
                <div className="results-container">
                    {this.renderEmailSearchResults()}
                </div>
            </div>
            )
        }
    }

export default connect(mapStateToProps)(AccountSearch)