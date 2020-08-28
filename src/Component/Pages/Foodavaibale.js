import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Card, Row, CardImg, Container } from 'reactstrap'
import Axios from 'axios';
import cardImage from '../assets/bg.jpg'
import './Css/foodavailable.css'
import { Link } from 'react-router-dom';

export default class Food extends Component {
  constructor(props) {
    super(props)


    this.state = {
      _id: '',
      foodname: '',
      foodimage: '',
      price: '',
      popular: [],
      notes:'',
      food: [],
      orderfood: '',
      user: {},
      modal: false,
      modal1: false,
      resturant: [],
      quantity: 1,
      totalprice: 0,
      res:'',
      show: true,
      max: 5,
      min: 0,
      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      },
    }
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  toggle1() {
    this.setState({
      modal1: !this.state.modal1
    })
  }

  componentDidMount() {
    const path = window.location.pathname;
    const splitted = path.split("/")
    const id = splitted[2]
    console.log(id)
    Axios.get(`http://localhost:3002/foods/searchByRes/${id}`, this.state.config)
      .then((response) => {
        const data = response.data;
        this.setState({
          popular: data, 
          res:data[0].restaurant 
        });
        console.log(data);

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

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handlecart = (foodid) => {
    Axios.post(`http://localhost:3002/cart/`,
      {
        food: this.state.food._id,
        totalprice: (this.state.totalprice * this.state.quantity),
        notes: this.state.notes,
        quanity: this.state.quantity
      }, this.state.config)
      .then((response) => {
        console.log(response);
        this.setState({
          modal: !this.state.modal
        })
      }).catch((err) => console.log(err.response));
  }

  render() {
    return (
      <div>
        <div className="container">
          <br/>
          <span>
            <span className='h5' style={{color:'DarkCyan'}}>Avaliable Foods from : </span>
            <Link onClick={this.toggle1}><span className='h4'>{this.state.res.resturant_name}</span></Link>
          </span>
          <br/>
          <br/>
          <Row>
            {
              this.state.popular.map((pop =>
                <Card onClick={() => this.handleFood(pop._id)}>
                  <figure className="card card-product">
                        <img alt="foodPic" width='250' src={`http://localhost:3002/uploads/${pop.foodimage}`}/>
                        <figcaption className="info-wrap">
                          <legend className="title">{pop.foodname}</legend>
                          <h6 className="title">Rs. {pop.price}</h6>
                        </figcaption>
                        <button className="btn btn-primary" onClick={this.addcart}>Add to cart</button>
                    </figure>           
                </Card>
              ))
            }
          </Row>
        </div>
        <Modal isOpen={this.state.modal}>
          <p> <ModalHeader toggle={this.toggle}>Item : {this.state.food.foodname}<br/>
                   Price : Rs.{this.state.totalprice * this.state.quantity}
          </ModalHeader></p>
          <ModalBody>
            <p>Add notes</p>
            <textarea id="notes" value={this.state.notes} name="notes" onChange={this.handleChange}></textarea>
            <hr/>
            <p>Add quantity</p>
            <button onClick={this.IncrementItem}>+</button>
            <input className="inputne" type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
            <button onClick={this.DecreaseItem}>-</button>
          </ModalBody>
          <ModalFooter>
            <Container id="ftr">
              <button className="btn btn-lg btn-success" id="btnbag" onClick={() => this.handlecart(this.state.orderfood._id)}>Add to cart</button>
            </Container>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modal1}>
          <ModalHeader style={{color:'Crimson', backgroundColor:'Beige'}} toggle={this.toggle1}>
            Restaurant Detail
          </ModalHeader>
          <ModalBody style={{backgroundColor:'AliceBlue'}}>
            <span className='h5' style={{color:'DarkSlateBlue'}}>Restaurant Name : </span>{this.state.res.resturant_name} <hr/>
            <span className='h5' style={{color:'DarkSlateBlue'}}>Restaurant Address : </span>{this.state.res.resturant_address}
          </ModalBody>
          <ModalFooter style={{color:'Crimson', backgroundColor:'Beige'}}></ModalFooter>
        </Modal>
      </div>
    )
  }
}
