import React, { Component, useState } from 'react'
import '../Layouts/navbar.css';
import '../User/usernavbar.css';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem ,NavbarText,Container,Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter, buttonLabel, Row, Col} from 'reactstrap'
import useravatar from '../assets/user.svg';
import bagavatar from '../assets/shopping-bag.svg';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router';
import ViewCart from '../ViewCart';
import Cart from './Cart';


export default class Navigation extends Component {


  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      modalbag: false,
      user: [],
      food: '',
      totalprice: '',
      quanity: '',
      cart: [],

      config: {
        headers: { 'Authorization': `Bearer  ${localStorage.getItem('token')}` }
      },
    }
    this.togglebag = this.togglebag.bind(this);
  }
  togglebag() {
    this.setState({
      modalbag: !this.state.modalbag
    })
  }
  componentDidMount() {

    Axios.get(`http://localhost:3002/cart/mycart`, this.state.config)
      .then((response) => {
        console.log(response.data);
        const data = response.data
        this.setState({
          cart: data
        })
      }).catch((err) => console.log(err.response))
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
          <NavbarBrand href="/home">Foodista</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {/* <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink href="/about/">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Registration/">Registration</NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink href="/Dashboard">Dashboard</NavLink>
              </NavItem> */}
   
            </Nav>
            <div>
              
              <Container>
              <UncontrolledDropdown>
              <DropdownToggle  color="light">
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <NavLink href="/order/">View order</NavLink>
                </DropdownItem>
                <DropdownItem>
                <NavLink href="/profile/">Profile Update</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <NavLink onClick={this.handleLogout}>Logout</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
             <form class="form-inline my-2 my-lg-0">
            
                {/* <div class="dropdown">
                  <button class="dropbtn"><img src={useravatar} /></button>
                  <div class="dropdown-content">
                    <a class="btn btn-primary" href='/profile'>Profile Update</a>
                    <a class="btn btn-success" href='/order'>View order</a>
                    <a type="button" color="warning" onClick={this.handleLogout}>Logout</a>
                  </div>
                </div> */}
                <img src={bagavatar} id="bag" onClick={this.togglebag} />
              
              </form>
              </Container>
              </div>
            
            </Collapse>
        </Navbar>


<Modal isOpen={this.state.modalbag}>
  <ModalHeader toggle={this.togglebag}><legend>My bag</legend></ModalHeader>
  <ModalBody>
    <Cart />
  </ModalBody>
  <ModalFooter>
    <h2>Total amount: $1 .0</h2>
  </ModalFooter>
</Modal>
</div>
)

    }
     }
}


