import React, { Component } from 'react'
import UserNavbar from '../User/UserNavbar';
import Category from './Category';
import Poppular from './Poppular';
import Restuarant from './Restuarant';
import Footer from '../Layouts/Foot';
import ResturantFood from './ResturantFood';
import { Container } from 'reactstrap';

export default class Home extends Component {

    


   
    render() {
        return (
            <div>
                <div>
                <UserNavbar />
               
                {/* <Category /> */}
                <Poppular />
                <Restuarant />
                <ResturantFood />
                <Footer />
                </div>
            </div>
        )
    }
}
