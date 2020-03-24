
import React from 'react';
import { db } from '../../firebase/firebase';
import { connect } from "react-redux";
import axios from 'axios';

import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './searchAccount.styles.css';
require('dotenv').config()

function mapStateToProps(state) {
    return {
        user: state.auth.user    
    };
}
class AccountSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            query:'',
            results: '',
            loading: false,
            message: ''
        }
    
        this.cancel = '';
        this.handleChange = this.handleChange.bind(this);
        this.fetchEmailSearchResults = this.fetchEmailSearchResults.bind(this);  
        this.handleClick = this.handleClick.bind(this);  
    }

    handleChange = (event) => {

        const query = event.target.value;
    
        this.setState({
            query: query,
            loading: true,
            message: ''
        }, () => {
            this.fetchEmailSearchResults(query)
        })
    
    }

    fetchEmailSearchResults = (query) =>{
        
        console.log("email: ", query)

        let searchUrl = `${process.env.REACT_APP_API_URL}/api/users/search/${query}`;

        // cancel previous request; see axios cancel token
        if(this.cancel !== ''){
            this.cancel.cancel();
        }
        
        // save new request for cancellation
        this.cancel = axios.CancelToken.source();
        
        axios.get(searchUrl, {
            // cancel toke use by axios
            cancelToken: this.cancel.token   
        })
        .then( response => {
            const resultNotFoundMsg = ! response.data ? 'No user found' : '';
        
            this.setState({
        
                results: response.data,
                message: resultNotFoundMsg, 
                loading: false
            })
        
        })
        .catch(error => {
            if( axios.isCancel(error) || error ) {
                this.setState({
                    loading: false, 
                    message: 'Sorry, email does not exist.'
                })   
            }
        })    
    }

    handleClick = async() => {
    

        const { user } = this.props
        const { results } = this.state;
    
        let data = {
            name: results.displayName, 
            email: results.email
        };

        const familyRef = await db.collection("users").doc(user.uid);

        familyRef.update({
            family: data    
        })
        .then(function() {
            if (window.confirm('User successfully added to family list.')) 
            {
                window.location.href='/account/view';
            };
            
        })
        .catch(function(error) {
            window.alert('Error updating document')
        });
    }

    renderEmailSearchResults = () => {
    
        const { results, message } = this.state;
        console.log(results);
        if(results) {
            return (
                <Container maxWidth='sm' className="">  
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
                        <Button variant="contained" id="add-family-button" onClick={this.handleClick}>Add to Family</Button>
                    </CardActions>
                </Container>
            )
        } else {
            if(results) {
            return (
            
                <Container maxWidth='sm'>  
                    <CardContent className="results-container">
                        <Typography className="title" color="textSecondary" gutterBottom>
                            User Found: 
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {message}
                        </Typography>
                    </CardContent>
                </Container>
            )
        }
        }
    }
    
        render() {
            const { query } = this.state;

            console.warn("warn this.state: ", this.state)
            return (
                <Container maxWidth='sm'>  
                    <CardContent className="search-container">
                    <form className='search-form' noValidate autoComplete="off" >
                    
                        <label className="search-label" htmlFor="search-email">
                            <input
                                type="text"
                                name="query"
                                value={query}
                                id="search-email"
                                placeholder="Search by email..."
                                onChange={this.handleChange}
                                
                            />
                            <SearchIcon className="search-icon" fontSize="large"  />   
                        </label>
                    </form>
                    {/* Results */}
                    <div>
                        {this.renderEmailSearchResults()}
                    </div>    
                </CardContent>
            </Container>


            )
        }
    }

export default connect(mapStateToProps)(AccountSearch)