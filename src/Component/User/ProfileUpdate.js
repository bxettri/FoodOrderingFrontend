import React, { Component } from 'react'
import Axios from 'axios';
import UserNavbar from '../User/UserNavbar';

export default class ProfileUpdate extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:3002/users/me', this.state.config)
            .then((response) => {
                this.setState({
                    user: response.data
                })
            });
    }
    handleupdate = (e) => {
        e.preventDefault();
        Axios.put('http://localhost:3002/users/me', this.state.user, this.state.config)
            .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
        this.props.history.push('/home');
    }
    handleChange(e) {
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value }
        })
    }

    
    render() {
        if (this.state.user === null) {
            return <h3>Loading ...</h3>
        } else {
        return (
            <div>
                 <UserNavbar />
                
                 <form>
            <legend><h3>Update Profile</h3></legend>

            <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" placeholder="name" className="form-control"
                value={this.state.user.name}  onChange={(e) => this.handleChange(e)} />
            </div>

            <div className="form-group">
                <label>phone</label>
                <input type="text" name="phone" className="form-control"
                value={this.state.user.phone}  onChange={(e) => this.handleChange(e)}  />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" name="email" className="form-control"
                value={this.state.user.email}  onChange={(e) => this.handleChange(e)}  />
            </div>
            <div className="form-group">
                <label>Username</label>
                <input type="text" name="username" className="form-control"
                value={this.state.user.username}  onChange={(e) => this.handleChange(e)} disabled  />
            </div>
            <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password"
                    value={this.state.user.password}  onChange={(e) => this.handleChange(e)}  disabled />
                </div>


            <button type="submit" className="btn btn-primary btn-block" id="update" onClick={this.handleupdate}>Update</button>
               </form>
               </div>
               
        )
    }
}
}

