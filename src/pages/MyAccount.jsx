import React, { Component } from 'react';
import { db } from '../firebase/firebase';

import { connect } from 'react-redux';

//import '../components/products/products.css';
import MyChild from '../pages/MyChild';


class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            isLoading: true
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
                children: children,
                isLoading: false
            })
        })
        .catch(err => {
            console.log('error getting children information', err);
        })
    }

    render() {

    
        
        const { isLoading, children } = this.state;
        console.log(this.state);
        
        const myChildren = this.state.children.map((child) => {
            return <MyChild key={child.id} {...child} />
        });

        return (
            this.state.isLoading ? <div>I am loading</div> :
            <div className="dashboard">

                <div className="container">
                    <div className="row">
                        {myChildren}
                        {/* {products.map(product => ( */}
                            {/* <ProductList
                                key={product.id}
                                id={product.id}
                                name={product.name} 
                                type={product.type} 
                                category={product.category} 
                                subTitle={product.subTitle}
                                imageUrl={product.imageUrl} 
                                description={product.description} 
                                size={product.size}
                                price={product.price} /> */}
                        {/* ))} */}

                    </div>
                </div>
            </div>

        );
    }
}
export default MyAccount;