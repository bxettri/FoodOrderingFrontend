import React, { Component } from 'react'

import { CardGroup,Card, Col, Row,CardBody, CardTitle, CardSubtitle,CardText,Button,CardImg, Container } from 'reactstrap'

import  food from '../assets/food.png';
import wine from '../assets/wine.png';
import fries from '../assets/fries.png';

import './Css/popular.css';

import './Css/restaurantfood.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';



export default class Resturantdetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            foodname: '',
            foodimage: '',
            price:'',
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
        return (

            <div className="container">
            <p>Food Available</p>

            
          
              
          <Row>

                   {

                    this.state.popular.map((pop => 
          
               <div className="Col-md-4" id="product">
               <figure className="card card-product">
                
                 <div className="image_wrap">
                 <img src={`http://localhost:3002/uploads/${pop.foodimage}`} onClick={this.addcart}
            
                   />
                 </div>
                 <figcaption class="info-wrap">
                 <h4 class="title">
                 {pop.fooname}
                 
           
             </h4>
                 </figcaption>
               </figure>
             </div>

               ))
                    }
             
             <Link to="/food"><Button  class="btn btn-success"id="foodview">More food</Button></Link>
        

           
            
          </Row>
          <hr></hr>
               
           </div>
        )
    }
}

