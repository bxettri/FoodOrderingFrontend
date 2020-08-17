import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import Axios from 'axios';

export default class ViewOrder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user : '',
            food : '',
            quanity : '',
            totprice: '',
            cart: [],
            config: {
                headers: { 'Authorization': `Bearer  ${localStorage.getItem('token')}` }
            }
             
        }
    }
        componentDidMount() {
          Axios.get('http://localhost:3002/cart',this.config)
            .then((response)=>{
              const data = response.data;
              this.setState({cart:  data});
              
              
              console.log("data fecth");
             
            }).catch(error => console.log(error.response));
        }
    
    render() {
        return (
            <div>
                  <Table hover>
            <thead>
              <tr>
                
                <th>User</th>
                <th>Food</th>
                <th>Quanity</th>
                <th>TotPrice</th>
              
              </tr>
            </thead>
            <tbody>
            {
                       this.state.cart.map((carts => 
                <tr>
                       
                       <td>{carts.user}</td>
                       <td>{carts.food}</td>
                       <td>{carts.quanity}</td>
                       <td>{carts.totprice}</td>
                      
                    
                    
                </tr>
                       ))
    }
                </tbody>
                </Table>
            </div>
        )
    }
}
