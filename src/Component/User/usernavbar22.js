import React, { Component, useState } from 'react'
import '../Layouts/navbar.css';
import '../User/usernavbar.css';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Container } from 'reactstrap';
import useravatar from '../assets/user.svg';
import bagavatar from '../assets/shopping-bag.svg';
import Axios from 'axios';
import { withRouter } from 'react-router';
import ViewCart from '../ViewCart';
import Cart from './Cart';


export default class Navbar extends React.Component {
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

    this.toggle = this.toggle.bind(this);
    this.togglebag = this.togglebag.bind(this);
  }

  toggle() {

    this.setState({
      modal: !this.state.modal

    })

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

  handlechange = (e) => {
    this.setState({
      [e.target.name]: e.target.value

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
          <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">Food</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                </li>
                <li class="nav-item">
                  Home
                </li>
                <li class="nav-item dropdown">
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <div class="dropdown">
                  <button class="dropbtn"><img src={useravatar} /></button>
                  <div class="dropdown-content">
                    <a class="btn btn-primary" href='/profile'>Profile Update</a>
                    <a class="btn btn-success" href='/order'>View order</a>
                    <a type="button" color="warning" onClick={this.handleLogout}>Logout</a>
                  </div>
                </div>
                <img src={bagavatar} id="bag" onClick={this.togglebag} />
              </form>
            </div>
          </nav>

          <Modal isOpen={this.state.modal}>
            <div class="dropdown-content">
              <a href='/profile'>Profile update</a><br />
              <a href='/order'>Profile update</a><br />
              <a onClick={this.handleLogout}>Logout</a>
            </div>
          </Modal>

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



