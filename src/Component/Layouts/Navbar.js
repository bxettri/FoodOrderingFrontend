import React, { Component } from 'react'
import burg from '../assets/burger.jpg'
import './navbar.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';


export default class Navbar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {

      modal: false,
      modalres:false,
      modalbag: false,
      username: '',
      password: '',
      role: ''
   
      
    
    }

    this.toggle = this.toggle.bind(this);
    this.toggleres= this.toggleres.bind(this);

   
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleres() {
    this.setState({
      modalres: !this.state.modalres
    })
  }


  handlechange = (e) => {
    this.setState({
      [e.target.name]: e.target.value

    })
  }

  handleLogin = (e) =>{ 
    e.preventDefault();
    Axios.post('http://localhost:3002/users/login',this.state)
      .then((response)=>{
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        this.setState({
           role: response.data.role
       }) 
 }).catch((err) => console.log(err.response))


}
     
            
  
  
  render() {
    if (this.state.role === 'admin') {
      return <Redirect to='/admin' />
    } else if (this.state.role === 'customer') {
        return <Redirect to='/home' />

    }
    
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light" id="navbar">
          <a class="navbar-brand" href="#"><img alt="logo" id="logo" src={burg}/></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
             
            </ul>
            <form class="form-inline my-2 my-lg-0">
            <Button id="sign"  color="light"variant="success" onClick={this.toggle}>SignIn</Button>{' '}
            <Button id="siout"  color="dark"variant="success" onClick={this.toggleres}>SignUp</Button>{' '}
            
              <Modal isOpen={this.state.modal}>
                <ModalHeader toggle={this.toggle}><legend>Login</legend></ModalHeader>
                <ModalBody>
                  <form>
                    <legend><h3>Sign In</h3></legend>
                    <div className="form-group">
                      <label>Email address</label>
                      <input type="text" name="username" className="form-control" placeholder="Username"
                        value={this.state.username} onChange={this.handlechange} />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" name="password" className="form-control" placeholder="Enter password"
                        value={this.state.password} onChange={this.handlechange}  />
                    </div>
                    
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={this.handleLogin}>Submit</button>
                    <p className="forgot-password text-right">Forgot password?</p>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <p className="forgot-password "> Not registered yet? <a href="/register">sign up?</a></p>
                </ModalFooter>     
              </Modal>

              <Modal isOpen={this.state.modalres}>
                <ModalHeader toggle={this.toggleres}><legend>Register</legend></ModalHeader>      
                <ModalBody>
                  <form>
                  <legend><h3>Admin Login</h3></legend>
                    <div className="form-group">
                      <label>Email address</label>
                      <input type="text" name="username" className="form-control" placeholder="Username"
                        value={this.state.username} onChange={this.handlechange} />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" name="password" className="form-control" placeholder="Enter password"
                        value={this.state.password} onChange={this.handlechange}  />
                    </div>

                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                      </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary btn-block" onClick={this.handleLogin}>Submit</button>
                    <p className="forgot-password text-right"> Forgot password?</p>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <p className="forgot-password "> Not registered yet? <a href="/register">sign up?</a></p>
                </ModalFooter>          
              </Modal> 
            </form>
          </div>
        </nav>
      </div>
    )
  }
}

