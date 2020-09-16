import React, { Component } from 'react'
import { Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap'
import './Css/popular.css'
import Axios from 'axios'

export default class  extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      foodname: '',
      foodimage: '',
      food:[],
      notes:'',
      quantity:'',
      popular: [],
      totalprice:'',
      modal:false,
      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      },
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    this.setState({
      modal:!this.state.modal
    })
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    Axios.get('http://localhost:3002/foods',this.state.config)
    .then((response)=>{
      const data = response.data;
      this.setState({popular:  data});
      console.log("data fecth");
     
    }).catch(error => console.log(error.response));
  }

  handleFood = (foodId) => {
    this.setState({
      modal: !this.state.modal

    })
    Axios.get(`http://localhost:3002/foods/${foodId}`, this.state.config)
      .then((response) => {
        const data = response.data;
        this.setState({
          food: data,
          totalprice: data.price
        });
        console.log("data fecth");
      }).catch(error => console.log(error.response));
  }

  addCart(){
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
      },alert("Added to cart")).catch((err) => console.log(err.response));
  }

    render() {
        return (
           <div style={{backgroundColor:'OldLace'}} className="container">
              <span className='h3' style={{color:'DarkOrange'}}>Foods for you  </span>
            <Row>
              {
                this.state.popular.map((pop => 
                  <div key={pop._id} className="Col-md-4" id="product">
                    <figure className="card card-product">
                        <img alt="foodPic" width='200' src={`http://localhost:3002/uploads/${pop.foodimage}`}/>
                        <figcaption className="info-wrap">
                          <legend className="foodName">{pop.foodname}</legend>
                          <h6 className="foodPrice">Rs. {pop.price}</h6>
                        </figcaption>
                        <button className="btn btn-primary" onClick={()=>this.handleFood(pop._id)}>Add to cart</button>
                    </figure>
                  </div>
                  ))
              }
            </Row>
           

            <Modal isOpen={this.state.modal}>
              <ModalHeader toggle={this.toggle}>Item : {this.state.food.foodname}<br/>
                      Price : Rs.{this.state.food.price}
              </ModalHeader>
              <ModalBody>
                <p>Add notes</p>
                <textarea id="notes" value={this.state.notes} name="notes" onChange={this.handleChange}></textarea>
                <hr/>
                <p>Add quantity</p>
                <input type="number" pattern="[0-9]*" name="quantity" value={this.state.quantity} onChange={this.handleChange} min="1" max="100" />
              </ModalBody>
              <ModalFooter>
                <Container id="ftr">
                  <button className="btn btn-lg btn-success" id="btnbag" onClick={() => this.addCart(this.state.food._id)}>Add to cart</button>
                </Container>
              </ModalFooter>
            </Modal>
          </div>
        )
  }
}
