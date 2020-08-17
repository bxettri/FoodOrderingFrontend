import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import Axios from 'axios'
import { Link } from 'react-router-dom';


export default class ListFoods extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
                 _id: '',
                 resturant_name: '',
                 resturant_address: '',
                 res_image:'',
                 popular: [],
                 resturant: [],
                 modal : false,
                 isupdated: false,
                 config: {
                    headers: { 'Authorization': `Bearer  ${localStorage.getItem('token')}` }
                },
                selectedFile: null,
              }
              this.toggle = this.toggle.bind(this);
            }
            toggle() {

                this.setState({
                  modal: !this.state.modal
                })
            
              }

             
        componentDidMount() {
            Axios.get('http://localhost:3002/resturants',this.config)
            .then((response)=>{
              const data = response.data;
              this.setState({popular:  data});
              this.setState({resturant: data});
              
              console.log("data fecth");
             
            }).catch(error => console.log(error.response));
        }
        handleFileSelect = (e) => {

        this.setState({
            selectedFile: e.target.files[0]
        })
        }
     
        uploadFile = (e) => {
            e.preventDefault();
            const data = new FormData()
            data.append('imageFile', this.state.selectedFile)
            Axios.post('http://localhost:3002/upload', data, this.state.config)
                .then((response) => {
                    this.setState({
                        resturant_name: this.state.resturant_name,
                        resturant_address:this.state.resturant_address,
                        res_image: response.data.filename
    
                    })
                }).catch((err) => console.log(err.response))
        }
     
       
       handleChange = (e)  =>{
        this.setState({
             [e.target.name]: e.target.value 
        })
    }

    deleteresturant = (resId) => {
      Axios.delete(`http://localhost:3002/resturants/${resId}`, this.state.config)
      .then((response) => {
         
          })
        }

        handleEdit = (resId) => {
          this.setState({
            modal: !this.state.modal
          });
          Axios.get(`http://localhost:3002/resturants/${resId}`,this.state.config)
          .then((response)=>{
            const data = response.data;
         
            this.setState({
              
              resturant: data
            });
            
            console.log("data fecth");
           
          }).catch(error => console.log(error.response));
          
      }
      handleupdate = (e) =>{
        this.setState({
          resturant: { ...this.state.resturant, [e.target.name]: e.target.value }
      })
      }

      updateFile = (resId) => {
       
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        Axios.put(`http://localhost:3002/upload/${resId._id}`, data, this.state.config)
            .then((response) => {
                this.setState({
                    resturant: { ...this.state.resturant, res_image: response.data.filename }
                })
            }).catch((err) => console.log(err.response))

      }
     
      updateFood = (resId) => {
        
        
         
      
    
        Axios.put(`http://localhost:3002/resturants/${resId._id}`, 
        { resturant_name: resId.resturant_name, resturant_address: resId.resturant_address },
        this.state.config).then((response) => console.log(response.data));
       
        
      }
  
       
          
        

   
            

        
            
       
    
 

    
    render() {
        return (
            

           
            <Table hover>
            <thead>
              <tr>
                <th>_id</th>
                <th>Resturant Name</th>
                <th>Resturant Address</th>
                <th>Resturant Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                {
                       this.state.popular.map((pop => 
              <tr>
                <th scope="row">{pop._id}</th>
                <td>{pop.resturant_name}</td>
                <td>{pop.resturant_address}</td>
                       <td><img src={`http://localhost:3002/uploads/${pop.res_image}`} style={{height: "20px",width:"20px"}}/></td>
                <td><a type={Button} className="btn btn-success" onClick={() => this.handleEdit(pop._id)}>
                                     Edit</a></td>
                <td><a type={Button}  onClick={() => this.deleteresturant(pop._id)} className="btn btn-danger" href="">Delete</a></td>
              </tr>
                       ))


    }
    
    <Modal isOpen={this.state.modal}>
<ModalHeader toggle={this.toggle}><legend>Update</legend></ModalHeader>
    
      <ModalBody>
    

       
      <form>
            <legend><h3>Update Resturant</h3></legend>

            

             
             
            <div className="form-group">
                <label> Resturant Name</label>

                
               
                
                   <input type="text" name="resturant_name" className="form-control"
                    value ={this.state.resturant.resturant_name} onChange={this.handleupdate}/>
                  

                    
                    
                
               </div>
                
   
               <div className="form-group">
                   <label>Resturant Address</label>
                   <input type="text" name="resturant_address" className="form-control"
                   value={this.state.resturant.resturant_address}  
                   onChange={this.handleupdate}  />
               </div>
               <img className='img-thumbnail'
                                    width='200' src={`http://localhost:3002/uploads/${this.state.resturant.res_image}`}
                                    alt="profile" />
               <Input type='file' name='res_image' id='res_image'
                                       onChange={this.handleFileSelect} value={this.state.res_image}/>
                                           <Button color='success' onClick={this.updateFile}>Upload Picture</Button> 
     
   
   
               <button type="submit" className="btn btn-primary btn-block" onClick={() => this.updateFood(this.state.resturant)}>Update</button>
               


   
               </form>

               
      </ModalBody>
      <ModalFooter>
    
      </ModalFooter>
      
    </Modal>
     
              
              
            </tbody>
           
          </Table>
        

          
                
         
        )
    }
}
