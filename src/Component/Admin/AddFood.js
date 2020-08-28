import React, { Component } from 'react'
import { Button, FormGroup, Label, Row, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form, Col } from 'reactstrap'
import axios from 'axios'
import ListFoods from './ListFoods'
import AdminNavbar from './Header/AdminNavbar';


export default class AddFood extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _id: null,
            foodname: null,
            price : null,
            foodimage: null,
            resturant:[],
            categorys:[],
            resSelect:'',
            catSelect:'',
            modal:false,
            imgPreview:null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle(){
        this.setState({
            modal:!this.state.modal
        })
    }

    componentDidMount() {
        axios.get('http://localhost:3002/resturants',this.state.config)
        .then((response)=>{
          const data = response.data;
          this.setState({
              resturant: data,
              resSelect:data[0]._id
            });        
        }).catch(error => console.log(error.response));

        axios.get('http://localhost:3002/foodCat', this.state.config)
        .then((response)=>{
            const data = response.data;
            this.setState({
                categorys:data,
                imgPreview:data.catImg,
                catSelect:data[0]._id
            });
        }).catch(err=>console.log(err.response));
      }
    
   handleFileSelect  = (e) =>{
        this.setState({
            selectedFile: e.target.files[0],
            imgPreview:URL.createObjectURL(e.target.files[0])
        })
    }

    handleChange = (e)  =>{
        this.setState({
             [e.target.name]: e.target.value 
        })
    }

    addCat = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        axios.post('http://localhost:3002/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    catImg: response.data.filename
                })
            axios.post('http://localhost:3002/foodCat',
            {
              category:this.state.category,
              catImg:this.state.catImg
            }, this.state.config)
                .then((response)=>{
                    console.log(response)
                    alert("Category added successfully")
                    window.location.reload(false)
                }).catch((err)=>console.log(err.response))
            }).catch((err) => console.log(err.response))
    }
  
    addFood = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        axios.post('http://localhost:3002/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    foodimage: response.data.filename
                })
                axios.post('http://localhost:3002/foods', 
                {
                    foodname:this.state.foodname,
                    price:this.state.price,
                    foodimage:this.state.foodimage,
                    restaurant:this.state.resSelect,
                    category:this.state.catSelect
                }, this.state.config)
                    .then((response) => {
                        console.log(response)
                        window.location.reload(false)
                    })
                    .catch((err) => console.log(err.response))
            }).catch((err) => console.log(err.response))
    }

    render() {      
        return (
            <div>
                <AdminNavbar/>
                <h2 style={{color:'Crimson'}}>Add food</h2><hr/>
                <form style={{backgroundColor:'AntiqueWhite'}}>
                    <Row form>
                        <Col md={5}>
                            <FormGroup>
                                <Label for='foodname'>
                                    <legend style={{fontSize:18}}>Food Name</legend>
                                </Label>
                                <Input type='text' id="foodname" name='foodname' onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={5}>
                            <FormGroup>
                                <Label for='foodprice'>
                                    <legend style={{fontSize:18}}>Food price</legend>
                                </Label>
                                <Input type='text' id='foodprice' name='price' onChange={ this.handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={5}>
                            <FormGroup>
                                <Label for='resOption'>
                                    <legend style={{fontSize:18}}>Choose Restaurant: </legend>
                                </Label>
                                <span> </span>
                                <select onChange={this.handleChange} value={this.state.resSelect} name='resSelect' id='resOption' style={{width:300, textAlign:'center'}}>
                                    {
                                        this.state.resturant.map(option=>
                                            <option key={option._id} value={option._id}>{option.resturant_name}</option>
                                        )
                                    }
                                </select>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for='catOption'>
                                    <legend style={{fontSize:18}}>Choose Category: </legend>
                                </Label>
                                <span> </span>
                                <select onChange={this.handleChange} value={this.state.catSelect} name='catSelect' id='catOption' style={{width:300, textAlign:'center'}}>
                                {
                                    this.state.categorys.map(option=>
                                        <option key={option._id} value={option._id}>{option.category}</option>
                                    )
                                }
                                </select>
                                {' '}
                                <Button color='primary' onClick={this.toggle}>Add Category</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <FormGroup>    
                                <label> 
                                    <legend style={{fontSize:18}}>Choose Picture:</legend>
                                </label>          
                                <Input type='file' name='foodimage' onChange={this.handleFileSelect}/>
                                <img alt="Image Preview" style={{width:200,height:200}} src={this.state.imgPreview}/><hr/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button color='success' onClick={this.addFood} block>Add Food</Button>
                </form>
                <hr></hr>
              <ListFoods />

              <Modal isOpen={this.state.modal}>
                <ModalHeader toggle={this.toggle}><legend style={{color:'DarkRed'}}>Add Food Category</legend></ModalHeader>
                <ModalBody>
                    <label style={{color:'DarkSlateGray', fontSize:18}}>Enter Category Name :</label>
                    <input type="text" placeholder="Enter category name" name="category" onChange={this.handleChange} />

                    <label style={{color:'DarkSlateGray', fontSize:18}}>Choose picture for category :</label>
                    <Input type='file' name='catImg' onChange={this.handleFileSelect}/>
                    <img alt="Image Preview" width='200' src={this.state.imgPreview}/><br/>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success btn-block" id="btnbag" onClick={this.addCat}>Add Category</button>
                </ModalFooter>
              </Modal>
            </div>
            )
        }    
    }
    
