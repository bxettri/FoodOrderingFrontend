import React, { Component } from 'react'
import { Table } from 'reactstrap'
import Axios from 'axios';
import AdminNavbar from './Header/AdminNavbar';


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
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
             
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3002/users/viewUser',this.state.config)
            .then((response)=>{
              const data = response.data;
              this.setState({user:  data});
              console.log(data);
            }).catch(error => console.log(error.response));
    }
    
    
    render() {
        return (
            <div>
                <AdminNavbar/>
                <Table hover>
                    <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
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
                            <td>---</td>
                        </tr>
                        ))
                    }
                    </tbody>
                    <tfoot></tfoot>
                </Table>
            </div>
        )
    }
}
