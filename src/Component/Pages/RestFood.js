import React, { Component } from 'react'
import UserNavbar from '../User/UserNavbar'; 
import FoodAvaibale from './Foodavaibale'

export default class  extends Component {
  render() {
    return (
      <div>
             <UserNavbar />
             <FoodAvaibale />
      </div>
      
    )
  }
}
