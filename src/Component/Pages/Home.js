import React, { Component } from 'react'
import UserNavbar from '../User/UserNavbar';
import Category from './Category';
import Poppular from './Poppular';
import Restuarant from './Restuarant';
import Footer from '../Layouts/Foot';
import ResturantFood from './ResturantFood';

export default class Home extends Component {
    render() {
        return (
            <div>
                <UserNavbar />
                <Category />
                <Poppular />
                <hr/>
                <Restuarant/>
                <Footer />
            </div>
        )
    }
}
