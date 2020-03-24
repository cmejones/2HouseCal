import React from 'react';
import AddChild from '../components/Forms/AddChild';
import Header from '../components/header/header.component';
import Sidenav from '../components/header/sidebar';

const AddChildForm = () => (
    <div className='flex-container wrap'>
        <Header />
        <Sidenav />
        <AddChild />
    </div>
);

export default AddChildForm;