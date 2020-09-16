import React, { Component } from 'react'
import UserNavbar from '../User/UserNavbar'; 
import FoodAvaibale from './Foodavaibale'
import Footer from '../Layouts/Foot';
export default class  extends Component {
  render() {
    return (
      <div>
             <UserNavbar />
             <FoodAvaibale />
             <br/>
             <Footer/>
      </div>
      
    )
  }
}
