import React, { Component } from 'react'
import { CardGroup,Card, Col, Row,CardBody, CardTitle, CardSubtitle,CardText,Button,CardImg, Container } from 'reactstrap'

import  food from '../assets/food.png';
import wine from '../assets/wine.png';
import fries from '../assets/fries.png';

import './Css/popular.css';
import Axios from 'axios';

export default class  extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      foodname: '',
      foodimage: '',
       popular: [],
    }
  }

  componentDidMount() {
    Axios.get('http://localhost:3002/foods',this.config)
    .then((response)=>{
      const data = response.data;
      this.setState({popular:  data});
      console.log("data fecth");
     
    }).catch(error => console.log(error.response));
  }

 

 
  
    render() {
      console.log(this.state.popular)
        return (
           <div className="container">
             <p>Today hot Deals</p>
           
           <Row>
            {

              this.state.popular.map((pop => 
                <div className="Col-md-4" id="product">
                <figure className="card card-product">
                 
                  <div className="image_wrap">
                    <img src={`http://localhost:3002/uploads/${pop.foodimage}`}/>
                  </div>
                  <figcaption class="info-wrap">
              <h4 class="title">{pop.foodname}</h4>
                  </figcaption>
                </figure>
              </div>

                ))
              
            
            }

            
             
           </Row>
           <hr></hr>
                
            </div>
          
          
           
        )
    }
}
