import React from 'react';
import { connect } from "react-redux";
import axios from 'axios';

import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
            query:'',
            results: '',
            loading: false,
            message: ''
        }
    
        this.cancel = '';
        this.handleChange = this.handleChange.bind(this);
        this.fetchEmailSearchResults = this.fetchEmailSearchResults.bind(this);    
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

        let searchUrl = `https://api-2housecal.herokuapp.com/api/users/search/${query}` 

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
            console.log(response.data);
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

    renderEmailSearchResults = () => {
        const { results, message } = this.state;
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
                        <Button id="add-family-button" size="medium" color="#BEC357">Add Family</Button>
                    </CardActions>
                </Card>
            )
        } else {
            return (
              
                <Card className="root">
                <CardContent>
                  <Typography className="title" color="textSecondary" gutterBottom>
                    User Found: 
                  </Typography>
                  <Typography variant="h5" component="h2">
                   {message}
                   </Typography>
                  </CardContent>
                  </Card>
            )
        }
    };
       
        render() {
            const { query } = this.state;

            console.warn("warn this.state: ", this.state)
            return (
            <div className="container">
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
                <div className="results-container">
                {this.renderEmailSearchResults()}
                </div>
            </div>
           
        )
        }
    }

export default connect(mapStateToProps)(AccountSearch)