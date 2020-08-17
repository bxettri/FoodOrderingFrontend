import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, CardGroup, Card, Col, Row, CardBody, CardTitle, CardSubtitle, CardText, Button, CardImg, Container } from 'reactstrap'
import Axios from 'axios';
import UserNavbar from '../User/UserNavbar';
import cardImage from '../assets/bg.jpg'
import './Css/foodavailable.css'

export default class Food extends Component {
  constructor(props) {
    super(props)


    this.state = {
      _id: '',
      foodname: '',
      foodimage: '',
      price: '',
      popular: [],
      food: [],
      orderfood: '',
      user: {},
      modal: false,
      resturant: [],
      quantity: 1,
      totalprice: 0,
      show: true,
      max: 5,
      min: 0,
      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      },
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {

    this.setState({
      modal: !this.state.modal

    })

  }




  componentDidMount() {



    Axios.get('http://localhost:3002/foods', this.state.config)
      .then((response) => {
        const data = response.data;
        this.setState({ popular: data });
        console.log("data fecth");

      }).catch(error => console.log(error.response));

    Axios.get('http://localhost:3002/users/me', this.state.config)
      .then((response) => {
        this.setState({
          user: response.data
        })
      });


  }

  handleFood = (food) => {


    this.setState({
      modal: !this.state.modal

    })
    Axios.get(`http://localhost:3002/foods/${food}`, this.state.config)
      .then((response) => {
        const data = response.data;

        this.setState({

          food: data,

          totalprice: data.price
        });

        console.log("data fecth");

      }).catch(error => console.log(error.response));
  }
  IncrementItem = () => {
    this.setState(prevState => {
      if (prevState.quantity < 100) {
        return {
          quantity: prevState.quantity + 1

        }
      } else {
        return null;
      }
    });
  }
  DecreaseItem = () => {
    this.setState(prevState => {
      if (prevState.quantity > 0) {
        return {
          quantity: prevState.quantity - 1
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
      quantity: event.target.value,
      totalprice: this.state.quantity * this.state.price
    });
  }

  handlecart = (foodid) => {



    Axios.post(`http://localhost:3002/cart/`,
      {
        food: this.state.food._id,
        totalprice: (this.state.totalprice * this.state.quantity),
        user: this.state.user._id,
        quanity: this.state.quantity
      }, this.state.config)
      .then((response) => {
        console.log(response);
        this.setState({
          visible1: true
        })
      }).catch((err) => console.log(err.response));
  }
  render() {

    return (
      <div>
        <div className="just">
        <CardImg top width="100%" height="500%" src={cardImage} alt="Card image cap" />
        </div>


        <div className="container">
          <p>All Avaliable</p>
          {/* {
            this.state.popular.map((pop =>
              <Card onClick={() => this.handleFood(pop._id)}>
                <ul id="menu">
                  <li>{pop.foodname}</li>
                  <li></li>
                  <li><img src={`http://localhost:3002/uploads/${pop.foodimage}`} style={{ height: "20px", width: "20px" }} /></li>

                  <li>{pop.price}</li>
                </ul>
              </Card>
            ))
          } */}



          <Row>

            {

              this.state.popular.map((pop =>
                <Card onClick={() => this.handleFood(pop._id)}>
               
                  <figure className="Col-md-4 card card-product" id="product">

                    <div className="image_wrap">
                      <img src={`http://localhost:3002/uploads/${pop.foodimage}`} onClick={this.addcart}

                      />
                    </div>
                    <figcaption class="info-wrap">
                      <h4 class="title">
                        {pop.foodname}  


                      </h4>
                      {pop.price}
                    </figcaption>
                  </figure>
               
              
                </Card>
              ))
            }






          </Row>




        </div>

        <Modal isOpen={this.state.modal}>




          <p> <ModalHeader toggle={this.toggle}>{this.state.food.foodname}<br></br>
                   Rs.{this.state.totalprice * this.state.quantity}

          </ModalHeader></p>


          <ModalBody>

            <p>Add notes</p>
            <textarea id="notes"></textarea>
          </ModalBody>
          <ModalFooter>
            <Container id="ftr">
              <button onClick={this.IncrementItem}>+</button>
              <input className="inputne" value={this.state.quantity} onChange={this.handleChange} />
              <button onClick={this.DecreaseItem}>-</button>

              <button className="btn btn-success" id="btnbag" onClick={() => this.handlecart(this.state.orderfood._id)}>Add to bag</button>
            </Container>




          </ModalFooter>








        </Modal>




      </div>





    )
  }
}
