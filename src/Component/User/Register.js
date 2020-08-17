import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, FormText } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            address: '',
            phone:'',
            email:'',
            username: '',
            password: '',
            isRegistered: false
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = (e) => {
        e.preventDefault();
        console.log(this.state);

        axios.post('http://localhost:3002/users/signup', this.state)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token)
                this.setState({
                    name: '',
                    address: '',
                    phone:'',
                    email:'',
                    username: '',
                    password: '',
                    isRegistered: true
                });

            }).catch((err) => console.log(err))
    }


    render() {
        if (this.state.isRegistered === true) {
            return <Redirect to='/home' />
        }
        return (
            <Container>
                <h2>Sign Up</h2>
                <Form>
                    <FormGroup>
                        <Label for='Name'>Name</Label>
                        <Input type='text' name='name' id='name'
                            value={this.state.name} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='address'>Last Name</Label>
                        <Input type='text' name='address' id='address'
                            value={this.state.address} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='phone'>phone</Label>
                        <Input type='text' name='phone' id='phone'
                            value={this.state.phone} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='email'>email</Label>
                        <Input type='text' name='email' id='email'
                            value={this.state.email} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input type='text' name='username' id='username'
                            value={this.state.username} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' id='password'
                            value={this.state.password} onChange={this.handleChange} />
                    </FormGroup>
                    <Button color='primary' onClick={this.register}>Sign Up</Button>
                    <FormText>Already a user? <Link to='/'> Login here!</Link></FormText>
                </Form>
            </Container>
        )
    }
}