import React, { Component } from 'react'
import UserNavbar from '../User/UserNavbar';
import Category from './Category';
import Poppular from './Poppular';
import Restaurant from './Restuarant';
import Footer from '../Layouts/Foot';

export default class Home extends Component {
    render() {
        return (
            <div>
                <UserNavbar />
                <Category />
                <Poppular />
                <hr/>
                <Restaurant/>
                <Footer />
            </div>
        )
    }
}
