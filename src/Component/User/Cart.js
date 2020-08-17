import React, { Component } from 'react'
import Axios from 'axios'

import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Container } from 'reactstrap';

export default class Cart extends Component {

  constructor(props) {
    super(props)

    this.state = {

      user: [],
      cart: [],
      fod: [],
      viewfood: [],
      modal: false,
      foodname: '',
      totalprice: '',
      updatedprice: 0,
      quanity: '',
      updatedquanity: '',
      show: true,
      max: 5,
      min: 0,
      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      },
      CartId: ''


    }


  }
  componentDidMount() {
    Axios.get('http://localhost:3002/cart', this.state.config)
      .then((response) => {
        console.log(response.data)
        this.setState({
          cart: response.data
        })
      })
      .catch((err) => console.log(err.response));
  }
  removeCardList = (CartId) => {

    Axios.delete(`http://localhost:3002/cart/${CartId}`, this.state.config)
      .then((response) => {
        const filteredCartList = this.state.cart.filter((cart) => {
          return cart._id !== CartId
        })
        this.setState({
          visible1: true,
          cart: filteredCartList
        })
      }).catch((err) => console.log(err.response));
  }
  IncrementItem = () => {
    this.setState(prevState => {
      if (prevState.quanity < 100) {
        return {
          quanity: prevState.quanity + 1

        }
      } else {
        return null;
      }
    });
  }
  DecreaseItem = () => {
    this.setState(prevState => {
      if (prevState.quanity > 0) {
        return {
          quanity: prevState.quanity - 1
        }
      } else {
        return null;
      }
    });
  }
  ToggleClick = () => {
    this.setState({
      show: !this.state.show,

    });
  }
  handleChange = (event) => {
    this.setState({
      quanity: event.target.value,
      totalprice: this.state.quantity * this.state.price
    });
  }

  handleEdit = (foodId) => {
    this.setState({
      modal: !this.state.modal
    });
    Axios.get(`http://localhost:3002/cart/${foodId}`, this.state.config)
      .then((response) => {
        const data = response.data;

        this.setState({

          viewfood: data
        });

        console.log("data fecth");

      }).catch(error => console.log(error.response));


  }








  render() {

    return (
      <div>


        <Table hover>
          <thead>
            <tr>

              <th>Product</th>
              <th>Price</th>
              <th>Quanity</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.cart.map(cart => {
                return (<tr key={cart._id}>
                  <td>{cart.food.foodname}</td>
                  <td>{cart.totalprice}</td>
                  <td>{cart.quanity}</td>
                  <td>
                    <button type="button" class="btn btn-primary"
                      onClick={() => this.handleEdit(cart._id)} >Edit</button>
                  </td>
                  <td><button type="button" class="btn btn-danger" onClick={() => this.removeCardList(cart._id)}>Remove</button></td>
                </tr>)
              })
            }



          </tbody>





        </Table>

        <Modal isOpen={this.state.modal}>




          <p> <ModalHeader toggle={this.toggle}>{this.state.viewfood.foodname}<br></br>
Rs.{this.state.viewfood.totalprice}

          </ModalHeader></p>


          <ModalBody>

            <p>Add notes</p>
            <textarea id="notes"></textarea>
          </ModalBody>
          <ModalFooter>
            <Container id="ftr">
              <button onClick={this.IncrementItem}>+</button>
              <input className="inputne" value={this.state.viewfood.quanity} onChange={this.handleChange} />
              <button onClick={this.DecreaseItem}>-</button>

              <button className="btn btn-success" id="btnbag" onClick={() => this.handlecart(this.state.orderfood._id)}>Add to bag</button>
            </Container>




          </ModalFooter>








        </Modal>
      </div>
    )
  }
}
