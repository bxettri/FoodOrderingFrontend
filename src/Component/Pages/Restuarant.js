import React, { Component } from 'react'



import { CardGroup,Card, Col, Row,CardBody, CardTitle, CardSubtitle,CardText,Button,CardImg, Container } from 'reactstrap'

import  food from '../assets/food.png';
import wine from '../assets/wine.png';
import fries from '../assets/fries.png';

import './Css/popular.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class  extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      resturant_name: '',
      res_image: '',
      _id:'',
       popular: [],
    }
  }

  componentDidMount() {
    Axios.get('http://localhost:3002/resturants',this.config)
    .then((response)=>{
      const data = response.data;
      this.setState({popular:  data});
      console.log("data fecth");
     
    }).catch(error => console.log(error.response));
  

    
  }

 handleClick(_id,e){
  this.props.history.push({
    pathname: '/food',
    data: _id // your data array of objects
  })
 }
 
   
  



 
  
    render() {
      console.log(this.state.popular)
        return (
           <Container>
             <p>Resturant</p>
           
           <Row>
            {

              this.state.popular.map((pop => 
                <div className="Col-md-4" id="product">
                <figure className="card card-product">
                 
                  <div className="image_wrap">
                  <Link to={{ 
              pathname: `/food/${pop._id}`, 
              
            }}><img src={`http://localhost:3002/uploads/${pop.res_image}`}
                  
                     /></Link>
                    
                  </div>
                  <figcaption class="info-wrap">
                  <h4 class="title">
                  <Link to={{ 
              pathname: `/food/${pop._id}`,}}>
                    {pop.resturant_name}</Link>
                  
            
              </h4>
                  </figcaption>
                </figure>
              </div>

                ))
              
            
            }

            
             
           </Row>
           <hr></hr>
                
            </Container>
          
          
           
        )
    }
  }
