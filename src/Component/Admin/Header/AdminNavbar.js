import React, { Component, useState } from 'react'

import '../../Admin/Header/adminnavbar.css';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem ,NavbarText,Container,Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter, buttonLabel, Row, Col} from 'reactstrap'

import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router';




export default class AdminNavbar extends Component {


  constructor(props) {
    super(props)

    this.state = {
    
      user: [],
      

      config: {
        headers: { 'Authorization': `Bearer  ${localStorage.getItem('token')}` }
      },
    }
  
  }


  handleChange = (e) => {
    this.setState(
        { [e.target.name]: e.target.value }
    )
}


  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  toggle1 = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.clear();
    if (localStorage.getItem('token') == null) {
      window.location.reload(false)
    }
  }



  render() {
    if (localStorage.getItem('token')) {
      return (
  
    <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/admin">Foodista</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {/* <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem> */}
               <NavItem>
                <NavLink href="/addresturant/">Restaurant</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/addfood/">Food</NavLink>
              </NavItem> 
              {/* <NavItem>
                <NavLink href="/Dashboard">Dashboard</NavLink>
              </NavItem> */}
   
            </Nav>
            <div>
            <Button className="bg-light text-dark" onClick={this.handleLogout}>Logout</Button>
              </div>
            
            </Collapse>
        </Navbar>



</div>
)

    }
     }
}


