import React, { Component } from 'react'
import {Container,FormText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { Link,Redirect} from 'react-router-dom';
import Axios from 'axios';

export default class AdminLogin extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
    
            username: '',
          password: '',
          isLoggedIn: false,
          admin:false,
          
        
        }
    
       
       
      }
    
    
      handlechange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
    
        })
      }
    
      handleLogin = (e) =>{
    
     
        e.preventDefault();
        Axios.post('http://localhost:3002/admin/login',this.state)
          .then((response)=>{
            console.log(response);
            localStorage.setItem('token', response.data.token)
                  this.setState({
                    username: '',
                    password: '',
                    isLoggedIn: true,
                   
                 
                   
                 
                    
                }) 
    
    
        }).catch((err) => console.log(err.response))
    
    
        }
      
      
      
      render() {
    
       
      
       if(this.state.isLoggedIn){
          return <Redirect to='/admin'/>
      }       
          
        return (
            <div>
                 <Container>
               
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
               
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            </Container>
                
            </div>
        )
    }
}
