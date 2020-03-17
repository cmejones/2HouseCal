import React from 'react';
import { db } from '../firebase/firebase';

import { connect } from 'react-redux';



function mapStateToProps(state) { //need to render redux store
    return {
        user: state.auth.user.uid
       // userName: state.auth.user.firstName + state.auth.user.lastName
    };
}

// function getChildren() {
//     const children = [];
//     db.collection('children') //add where clause for parentid
//         .get()
//         .then(function(querySnapshot) {
//             querySnapshot.forEach(function(doc) {
//                 children.push({
//                     id:doc.id,
//                     ...doc.data()
//             });
//                 console.log(doc.id, "=>", doc.data());
//                 // this.setState = {
//                 //     id: doc.id,
//                 //     data: doc.data()
//                 // }
//                 return children
//             });            
//         })
//         .catch(function(error) {
//             console.log('error getting documents: ', error);
//         });
// }



class MyChild extends React.Component {
    constructor(props) {
        super(props);
        console.log('edit', this.props);
        this.state = {
            children: []
        }
    }


    componentDidMount() {
            function getChildren() {
            console.log('here');

            const childrenRef = db.collection('children');
            let children = [];
            let allChildren = childrenRef.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    children.push({
                        id:doc.id,
                        ...doc.data()
                    });
                    console.log(doc.id, '=>', doc.data()); //showing children
                    console.log(children, 'children')
                });
            })
            .catch(err => {
                console.log('error getting children information', err);
            })
            console.log(children);
            return allChildren;
        }
    }
//     componentDidMount() {
//         let allChildren = getChildren();
        
//         this.setState({
//             children: allChildren 
//             //this is empty; 
        
//         });
//         console.log(this.state);

// }

        render() {
            console.log(this.state);
            //const allChildren = this.state;
            return (
                <section className='display-item'>
                    <div className="wrapper">
                        {/* <div>{allChildren}</div> */}
                        <div>hello</div>
                    </div>
                </section>
            );
        }

    
}

export default connect(mapStateToProps)(MyChild);