import React, { Component } from 'react'
import { Container, Label, Form, FormGroup,Select, Button, Input, Dropdown,DropdownItem, DropdownMenu,DropdownToggle,UncontrolledDropdown } from 'reactstrap'
import Axios from 'axios'
import ListResturant from '../Pages/ListResturant';
import { Link, Redirect } from 'react-router-dom'

export default class AddRestuarant extends Component {
  constructor(props) {
    super(props)
  
    this.state = {

       resturant_name: null,
       resturant_address: null,
       fooditem: null,
       res_image: null,
       food : [],
       config: {
        headers: { 'Authorization': `Bearer  ${localStorage.getItem('token')}` }
    },
    selectedFile: null,
    }

   
  }
  componentDidMount(){
    Axios.get('http://localhost:3002/foods',this.config)
    .then((response)=>
    {
      const data = response.data;
      
      this.setState({food :  data});
      console.log("Data recive");
     
    }).catch(error => console.log(error.response));


    this.handleFileSelect = (e) => {
      this.setState({
        selectedFile: e.target.files[0]
      })
    }

    this.uploadFile = (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append('imageFile',this.state.selectedFile)
      Axios.post('http://localhost:3002/upload', data, this.state.headers)
      .then((response) => {
          this.setState({
              resturant_name: this.state.resturant_name,
              resturant_address:this.state.resturant_address,
              fooditem:this.state.fooditem,
              res_image: response.data.filename

          })
      }).catch((err) => console.log(err.response))
    }

    this.handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    this.handleFoodChange = (e) => {
      this.setState({
        fooditem : e.target.value
      });
    }

    this.addRest = (e) => {
      e.preventDefault();
      Axios.post('http://localhost:3002/resturants',this.state,this.state.config)
      .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
      
         
  
 
      }

      }

     



   


  
 
 
    render() {
   
    
     
     
      const { foodId, handleFoodChange, displayfood, food} = this.props;
      
        return (
        
           
          <Container>
          <h2>Add Resturant</h2>
          <form>
          <Label for='Resturantname'>Resturant Name</Label>
          <FormGroup>
                          <Input type='text'
                              id="resturantname"
                              name='resturant_name'
                              value={this.state.resturant_name}
                              onChange={this.handleChange}
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label for='resturant_address'>Resturant_address</Label>
                          <Input type='text' id='resturant_address'
                              name='resturant_address'
                              value={this.state.resturant_address}
                              onChange={ this.handleChange} />
                      <FormGroup>
                        <Label for ='foodname'>Select food</Label>
                        <Input type='select' name='fooditem' id='foodid' onChange={this.handleFoodChange}>
                          {
                          
                          this.state.food.map(foods => <option value={foods._id}>{foods.foodname}
                          </option>)
                          
                          
                          })
                        
                        
                        </Input>

                
                            
                              
                      </FormGroup>
                      <FormGroup>
                          
                          <Input type='file' name='res_image' id='res_image'
                              onChange={this.handleFileSelect}/>
                                  <Button color='success' onClick={this.uploadFile}>Upload Picture</Button> 
                              
                           
                      </FormGroup>

                     
                      
                      <Button color='success' onClick={this.addRest} block>Add Resturant</Button>
                      </FormGroup>
        
          </form>
          <hr></hr>

          <ListResturant />
      </Container>
                
         
        )
                        }
    }

