import React from 'react';
import { db } from '../firebase/firebase';

import { connect } from 'react-redux';


function mapStateToProps(state) { //need to render redux store
    return {
        user: state.auth.user.uid
       // userName: state.auth.user.firstName + state.auth.user.lastName
    };
}

class MyChild extends React.Component {
    constructor(props) {
        super(props);
        console.log('edit', this.props);
        this.state = {
            children: []
        }
    }

    async getChildren() {
        
    }
    componentDidMount() {
        //console.log('here');

        const childrenRef = db.collection('children')
    
        let allChildren = childrenRef.get()
        .then(snapshot => {
            //console.log(snapshot);
            let children = [];
            snapshot.forEach(doc => {
                children.push({
                    id:doc.id,
                    ...doc.data()
                });
                console.log(doc.id, '=>', doc.data()); //showing children
                console.log(children, 'children')
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
            // let link = '/products/' + this.props.productId;
            let editLink = '/updateChild/' + this.props.id;

            console.log(this.state);
            //const myChildren = this.state;

            return (
                <div className="col s12 m6 l4">
    
                    {/* <a href={link}> */}
                        <div className="card medium" key={this.state.id} id={this.state.id}>
                        <div className="card-image">
                            <img className="product-image pos-rel responsive-img" alt={this.state.firstName} src={`${this.state.childPhoto}`} />
                        </div>
                        
                        <div className="card-content">
                            <div className="card-title">
                                {this.state.firstName} {this.state.lastName}
                            </div>
                            
                            <div className="" key={this.state.id}>
                                {/* <p>Birthday: {this.props.birthday}</p> */}
                                <p>Blood Type: {this.state.bloodType}</p>
                                <p>Allergies: {this.state.allergies}</p>
                                <p>Medications: {this.state.medications}</p>
                                <p>Bedtime: {this.state.bedtime}</p>
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