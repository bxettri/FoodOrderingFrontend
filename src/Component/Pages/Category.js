import React, { Component } from 'react'

import {Row,Col} from  'reactstrap';

import  food from '../assets/food.png';
import wine from '../assets/wine.png';
import cake from '../assets/cupcake.png';
import fries from '../assets/fries.png';



import   './Css/category.css';

export default class Category extends Component {
    render() {
        return (
            <Row>
           <Col md="12" md={{ size: 7, offset: 5 }}>
           <p>What would you like to order ?
             </p>
            
           </Col>
         
           <Col md="12" md={{ size: 8, offset: 4 }}>
               <img src ={food} id="foodimg"/>
               <img src ={wine} id="foodimg"/>
               <img src ={cake} id="foodimg"/>
               <img src ={fries} id="foodimg"/>
               </Col>
               
           </Row>
             
         
              
            
        )
    }
}
