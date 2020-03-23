import React from 'react';
import { db } from '../firebase/firebase';
import moment from 'moment';

import { connect } from 'react-redux';
import '../index.css';


function mapStateToProps(state) { //need to render redux store
    return {
        user: state.auth.user.uid
       // userName: state.auth.user.firstName + state.auth.user.lastName
    };
}

class MyChild extends React.Component {
    constructor(props) {
        super(props);
        //console.log('edit', this.props);
        this.state = {
            children: []
        }
    }

    async getChildren() {}

    componentDidMount() {
        //console.log('here');
        let parentId = this.props.user;
        //console.log(this.props, 'user');
        const childrenRef = db.collection('children').where('parentId', '==', parentId)
    
        childrenRef.get()
        .then(snapshot => {
            //console.log(snapshot);
            let children = [];
            snapshot.forEach(doc => {
                children.push({
                    id:doc.id,
                    ...doc.data()
                });
                //console.log(doc.id, '=>', doc.data()); //showing children
                //console.log(children, 'children')
            });
        
            this.setState({
                children: children
            })
        })
        .catch(err => {
            console.log('error getting children information', err);
        })
    }

        render() {
            let editLink = '/updateChild/' + this.props.id;

            //console.log(this.state);

            return (
                <div className="col s12 m6 l4">
    
                    {/* <a href={link}> */}
                        <div className="card medium" key={this.props.id} id={this.props.id}>
                        <div className="card-image">
                            <img className="responsive-img" alt={this.props.firstName} src={`${this.props.url}`} />
                        </div>
                        
                        <div className="card-content">
                            <div className="card-title">
                                {this.props.firstName} {this.props.lastName}
                            </div>
                            
                            <div className="" key={this.props.id}>
                                <p>Birthday: {moment(this.props.birthday.toDate()).calendar()}</p>
                                <p>Blood Type: {this.props.bloodType}</p>
                                <p>Allergies: {this.props.allergies}</p>
                                <p>Medications: {this.props.medications}</p>
                                <p>Bedtime: {this.props.bedtime}</p>
                            </div>
                        </div>
        
                    </div>
                {/* </a> */}
                <div><a href={editLink}>Edit</a></div>
        
            </div>
        );
    }
}
export default connect(mapStateToProps)(MyChild);