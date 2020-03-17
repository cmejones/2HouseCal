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
        console.log('here');

        const childrenRef = db.collection('children')
    
        let allChildren = childrenRef.get()
        .then(snapshot => {
            console.log(snapshot);
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
            const {  children } = this.state;
        
            const myChildren = this.state.children.map((child) => {
            return <div key={child.id} {...child}></div>
        });
            console.log(this.state);
            //const allChildren = this.state;
            return (
                <section className='display-item'>
                    <div className="wrapper">
                        <div>{myChildren}</div>
                        <div>hello</div>
                    </div>
                </section>
            );
        }

    
}

export default connect(mapStateToProps)(MyChild);