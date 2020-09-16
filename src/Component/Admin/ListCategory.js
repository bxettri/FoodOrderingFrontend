import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import Axios from 'axios'
import AdminNavbar from './Header/AdminNavbar';


export default class ListFoods extends Component {
    constructor(props) {
        super(props)
        this.state = {
          categories: [],
          category:[],
          modal : false,
          modal1:false,
          imgPreview:null,
          selectedFile: null,
          config: {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          },
        }
        this.toggle = this.toggle.bind(this);
    } 
             
    componentDidMount() {
      Axios.get('http://localhost:3002/foodCat', this.state.config)
        .then((response)=>{
            const data = response.data;
            this.setState({categories:data});
            console.log(data)
        }).catch(err=>console.log(err.response));
    }

    toggle=()=>{ 
      this.setState({
        modal: !this.state.modal
    })}

    toggle1=()=>{ 
      this.setState({
        modal1: !this.state.modal1
    })}
          
    handleChange = (e)  =>{
      this.setState({
        [e.target.name]: e.target.value 
      })
    }

    deleteCat = (catId) => {
      Axios.delete(`http://localhost:3002/foodCat/${catId}`, this.state.config)
      .then((response) => {
        window.location.reload(false)
      }).catch(err=>console.log(err.response));
    }

    handleEdit = (catId) => {
      this.setState({
        modal: !this.state.modal
      });
      Axios.get(`http://localhost:3002/foodCat/${catId}`,this.state.config)
      .then((response)=>{
        const data = response.data;
          this.setState({
            category: data,
            imgPreview:`http://localhost:3002/uploads/${data.catImg}`
          });    
        console.log(this.state.imgPreview)
        })
      .catch(error => console.log(error.response));
    }

    handleupdate = (e) =>{
      this.setState({
        category: { ...this.state.category, [e.target.name]: e.target.value }
      })
    }

    handleFileSelect  = (e) =>{
      this.setState({
          selectedFile: e.target.files[0],
          imgPreview:URL.createObjectURL(e.target.files[0])
      })
    }

    addCat = (e) => {
      e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        Axios.post('http://localhost:3002/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    catImg: response.data.filename
                })
            Axios.post('http://localhost:3002/foodCat',
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
     
    updateCat = (catId) => {
      const data = new FormData()
      data.append('imageFile', this.state.selectedFile)
      Axios.post('http://localhost:3002/upload', data, this.state.config)
        .then((response) => {
          this.setState({
            catImg: response.data.filename
          })
        Axios.put(`http://localhost:3002/foodCat/${catId}`, 
        { 
          category: this.state.category.category,
          catImg:this.state.catImg
        }, this.state.config)
        .then((response) => {
          alert("Category updated successfully")
          console.log(response.data)
          window.location.reload(false);
        })
        .catch((err)=>console.log(err.response))
        }).catch((err) => console.log(err.response))
    }
    
    render() 
    {
        return (
          <div>
          <AdminNavbar/>
          <br/>
            <Button color='primary' style={{float:"right"}} onClick={this.toggle1}>Add Category</Button>
            <Table hover>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Category Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.categories.map(cat => 
                <tr key={cat._id}>
                  <td>{cat.category}</td>
                  <td>
                    <img alt="catIcon" src={`http://localhost:3002/uploads/${cat.catImg}`} style={{height: "50px",width:"50px"}}/>
                  </td>
                  <td>
                    <a className="btn btn-success" onClick={() => this.handleEdit(cat._id)}>Edit</a>
                  </td>
                  <td>
                    <a onClick={() => this.deleteCat(cat._id)} className="btn btn-danger">Delete</a>
                  </td>
                </tr>
                )
              }

              <Modal isOpen={this.state.modal1}>
                <ModalHeader toggle={this.toggle1}><legend style={{color:'DarkRed'}}>Add Food Category</legend></ModalHeader>
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
    
              <Modal isOpen={this.state.modal}>
                <ModalHeader toggle={this.toggle}><legend>Edit Category</legend></ModalHeader>
                <ModalBody>
                    <div className="form-group">
                      <label style={{color:'DarkSlateGray', fontSize:18}}> Category Name</label>
                      <input type="text" name="category" className="form-control" 
                        value ={this.state.category.category} onChange={this.handleupdate}/>

                      <img alt="Image Preview" width='200' src={this.state.imgPreview}/><br/>
                      <label style={{color:'DarkSlateGray', fontSize:18}}>Choose picture for category :</label>
                      <Input type='file' name='foodimage' onChange={this.handleFileSelect}/>
                      
                    </div>
                    <Button className="btn btn-success btn-block" 
                      onClick={() => this.updateCat(this.state.category._id)}>Update</Button>   
                </ModalBody>
                <ModalFooter></ModalFooter>
              </Modal>
            </tbody>
          </Table>
        </div>
        )
    }
}
