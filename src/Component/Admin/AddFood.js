import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, FormText, CustomInput } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import ListFoods from './ListFoods'


export default class AddFood extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _id: null,
            foodname: null,
            price : null,
            foodimage: null,
            config: {
                headers: { 'Authorization': `Bearer  ${localStorage.getItem('token')}` }
            },
            selectedFile: null,


          
           
        }
    
    }
    

   handleFileSelect  = (e) =>{

        this.setState({
            selectedFile: e.target.files[0]
        })

    }
    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        axios.post('http://localhost:3002/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    foodname: this.state.foodname,
                    price:this.state.price,
                    foodimage: response.data.filename

                })
            }).catch((err) => console.log(err.response))
    }

    handleChange = (e)  =>{
        this.setState({
             [e.target.name]: e.target.value 
        })
    }
  
    addFood = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3002/foods', this.state,this.state.config)
            .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
       
    }


   

        render() {
           
        return (
            <Container>
                <h2>Add food</h2>
                <form>
                <Label for='foodname'>Food Name</Label>
                <FormGroup>
                                <Input type='text'
                                    id="foodname"
                                    name='foodname'
                                    value={this.state.foodname}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='foodprice'>food price</Label>
                                <Input type='text' id='foodprice'
                                    name='price'
                                    value={this.state.price}
                                    onChange={ this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                
                                <Input type='file' name='foodimage' id='foodimg'
                                    onChange={this.handleFileSelect}/>
                                        <Button color='success' onClick={this.uploadFile}>Upload Picture</Button> 
                                    
                                 
                            </FormGroup>
                            <Button color='success' onClick={this.addFood} block>Add Food</Button>
              
                </form>

                <hr></hr>

              <ListFoods />
            
            </Container>

        )
            }
      
    

    
    }
    
