import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, FormText, CustomInput } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import ListFoods from './ListFoods'

import AdminNavbar from '../Admin/Header/AdminNavbar'
import Footer from '../Admin/Footer/Adminfooter'
export default class AddFood extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _id: null,
            foodname: null,
            price : null,
            resturant:[],
            resturantId:'',
            resturantName:'',
            resturant_name:'',
            foodimage: null,
            config: {
                headers: { 'Authorization': `Bearer  ${localStorage.getItem('token')}` }
            },
            selectedFile: null,


          
           
        }
    
    }
    
    componentDidMount() {
        axios.get('http://localhost:3002/resturants', this.state)
          .then((response) => {
            console.log(response.body)
            this.setState({
                resturant: response.data,
                resturantId: response.data[0]._id
            })
          })
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
                    foodimage: response.data.filename,
                    resturantName: this.state.resturant_name,
                    resturant: this.state.resturant


                },alert("Food Image uploaded"))
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
            .then((response) => console.log(response.data),alert("Food added sucessfully"),window.location.reload(false)).catch((err) => console.log(err.response))
          
    }


   

        render() {
           
        return (
            <div>
            <AdminNavbar/>
            <Container>
                <h2>Add food</h2>
                <form>


                <FormGroup >
                  <Label for="resturant" >Resturant</Label>
                  <Input type="select" name="resturant_name" id="resturant_name" 
                  value={this.state.resturant_name}
                    onChange={this.handleChange}>
                    {
                      this.state.resturant.map((resturant_name) => {
                        return <option key={resturant_name._id} 
                        value={resturant_name._id}>
                          {resturant_name.resturant_name}</option>
                      })
                    }
                  </Input>
                </FormGroup>


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
            <Footer/>
            </div>

        )
            }
      
    

    
    }
    
