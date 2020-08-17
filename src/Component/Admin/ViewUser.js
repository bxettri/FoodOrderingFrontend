import React, { Component } from 'react'
import { Table } from 'reactstrap'
import Axios from 'axios';

export default class ViewUser extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name : '',
            email : '',
            phone : '',
            admin: '',
            user: [],
            config: {
                headers: { 'Authorization': `Bearer  ${localStorage.getItem('token')}` }
            }
             
        }
    }
        componentDidMount() {
            Axios.get('http://localhost:3002/users',this.config)
            .then((response)=>{
              const data = response.data;
              this.setState({user:  data});
              
              
              console.log("data fecth");
             
            }).catch(error => console.log(error.response));
        }
    
    
    render() {
        return (
         
            <Table hover>
            <thead>
              <tr>
                
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Type</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
            {
                       this.state.user.map((users => 
                <tr>
                       
                       <td>{users.name}</td>
                       <td>{users.email}</td>
                       <td>{users.phone}</td>
                       <td>{users.admin}</td>
                       <td>---</td>
                    
                    
                </tr>
                       ))
    }
                </tbody>
                </Table>
             
    
        )
    }
}
