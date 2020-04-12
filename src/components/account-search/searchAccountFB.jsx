
import React from 'react';
import { connect } from "react-redux";
import { db } from '../../firebase/firebase';
import firebase from 'firebase/app';

import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './searchAccount.styles.css';

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
            displayName: '',
            results: '',
            family: [],
            loading: false
        }
        //this.cancel = '';
        this.handleChange = this.handleChange.bind(this);
        this.fetchEmailSearchResults = this.fetchEmailSearchResults.bind(this);
        console.log(this.state);
    }


    handleChange = (event) => {
        event.preventDefault();
        const results = '';
        const email = event.target.value;
            this.setState({
            email: email,
            loading: true,
            results: '' //put empty string here to force only actual results to display
        }, () => {
            this.fetchEmailSearchResults(email)
        });
        console.log('new state', this.state);
    }


    fetchEmailSearchResults(email) {
        if(email) {
            let usersRef = db.collection("users").where("email", "==", email);
    
            usersRef.get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    this.setState({
                        results: documentSnapshot.data(),
                        loading:false
                    })
                })
            })
        }
    }

    handleClick = async() => {
        console.log(this.props);
        const { user } = this.props
        const { results } = this.state;
        const family = [];
    
        let data = {
            name: results.displayName, 
            email: results.email
        };
        console.log(data);

        const familyRef = await db.collection("users").doc(user);
        familyRef.update({
            family: firebase.firestore.FieldValue.arrayUnion(data)

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

    keyPressed = ({ key }) => {
        // Capture search on Enter key
        if (key === "Enter") {
        this.fetchEmailSearchResults()
        }
    }
    renderEmailSearchResults = () => {
    
        const { results, message } = this.state;
        //console.log(results);
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
            return (
                <Container maxWidth='sm'> 
                    <div className="card">
                        <CardContent className="search-container">
                            <div className='profile-header'>
                                <h5>Add account members</h5>
                            </div>
                            <hr />
                            <form className='search-form' noValidate autoComplete="off" onSubmit={this.fetchEmailSearchResults}>
                            
                                <label className="search-label" htmlFor="search-email">
                                    <input
                                        type="text"
                                        name="email"
                                        value={this.state.email}
                                        id="search-email"
                                        placeholder="Search by email..."
                                        onChange={this.handleChange}
                                        onKeyPress={this.keyPressed}
                                        
                                    />
                                    <SearchIcon className="search-icon" fontSize="large"  />   
                                </label>
                            </form>
                        {/* Results */}
                        <div>
                            {this.renderEmailSearchResults()}
                        </div>    
                    </CardContent>
                </div>
            </Container>
            )
        }
    }

export default connect(mapStateToProps)(AccountSearch)
