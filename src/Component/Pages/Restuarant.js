import React, { Component } from 'react'
import {Row,Container } from 'reactstrap'
import './Css/popular.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class Resturant extends Component {

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
  
    render() {
      console.log(this.state.popular)
        return (
           <Container style={{backgroundColor:'LightCyan'}}>
             <legend style={{color:'Maroon'}}>View Resturants</legend>
           <Row>
            {
              this.state.popular.map((pop => 
                <div key={pop._id} className="Col-md-4" id="restaurant">
                  <figure className="card foodPic">
                    <Link to={{ pathname: `/foods/${pop._id}`,}}>
                    <img width='200' height='200' alt='restaurantPic' src={`http://localhost:3002/uploads/${pop.res_image}`}/></Link>
                    <figcaption className="info-wrap">
                      <h4 className="text-center" id="restaurantName">
                        <Link to={{ pathname: `/foods/${pop._id}`,}}>
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
