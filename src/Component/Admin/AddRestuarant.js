import React, { Component } from 'react'
import { Container, Label, FormGroup, Button, Input } from 'reactstrap'
import Axios from 'axios'
import ListResturant from './ListResturant';
import AdminNavbar from './Header/AdminNavbar';

export default class AddRestuarant extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       resturant_name: null,
       resturant_address: null,
       fooditem: null,
       res_image: null,
       food : [],
       imgPreview:null,
       config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    },
    selectedFile: null,
    }
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }

    handleFileSelect = (e) => {
      this.setState({
        selectedFile: e.target.files[0],
        imgPreview:URL.createObjectURL(e.target.files[0])
      })
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleFoodChange = (e) => {
      this.setState({
        fooditem : e.target.value
      });
    }

    addRest = () => {
      const data = new FormData();
      data.append('imageFile',this.state.selectedFile)
      Axios.post('http://localhost:3002/upload', data, this.state.config)
      .then((response) => {
          this.setState({
              res_image: response.data.filename
          })
          Axios.post('http://localhost:3002/resturants',this.state,this.state.config)
          .then((response) => {
            alert("Restaurant added successfully");
            window.location.reload(false)
            console.log(response.data)
          })
          .catch((err) => console.log(err.response))
      }).catch((err) => console.log(err.response))
    }
      

    render() {
      return (
        <div>
        <AdminNavbar/>
          <h2 style={{color:'Crimson'}}>Add Resturant</h2><hr/>
              <form style={{backgroundColor:'AntiqueWhite'}}>
                <FormGroup>
                  <Label for='Resturantname'>Resturant Name</Label>
                  <Input type='text' id="resturantname" name='resturant_name' value={this.state.resturant_name}
                    onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for='resturant_address'>Resturant_address</Label>
                  <Input type='text' id='resturant_address' name='resturant_address' value={this.state.resturant_address}
                    onChange={ this.handleChange} />
                    </FormGroup>
                  <FormGroup>
                    <Label>Choose pic...</Label>
                    <Input type='file' name='res_image' onChange={this.handleFileSelect}/>
                    <img alt="Image Preview" style={{width:200,height:200}} src={this.state.imgPreview}/><br/>
                  </FormGroup>
                  <Button color='success' onClick={this.addRest} block>Add Resturant</Button>
                
              </form>
              <hr></hr>
              <h2 style={{color:'Crimson'}}>View Restaurant</h2>
            <ListResturant />
          </div>
        )
      }
    }

