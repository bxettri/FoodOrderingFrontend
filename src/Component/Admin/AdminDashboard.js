import React, { Component } from 'react'
import { Container,Button, Modal,Row, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

import user from '../assets/team.png'
import food from '../assets/foodss.png'
import rest from '../assets/dining.png'
import { Link } from 'react-router-dom';
import Footer from '../Admin/Footer/Adminfooter';
import Navbar from '../Admin/Header/AdminNavbar'

export default class AdminDashboard extends Component {
    render()  {
        if(localStorage.getItem('token'))
        {
            return (

                <div>
<div>
<Navbar/>
    </div>
                  
                    <section className=" text-center">
                        <h2>Admin Dashboard</h2>
                    </section>
                    {/* <div>
                    <span className="menulines" onClick={this.handleNavbaropen}>&#9776;</span>
                    </div> */}
    
                    {/* <div className="sidenavbar" id="sidenav">
                        
                        <a href="#">Home</a>
                        <a href='/addresturant'>Add Restuarant</a>
                        <a href='/addfood'>Add Food</a>
                        <a href="/viewuser">Active User </a>
                    </div>
   */}

   
<Container className="dashboard_btn_container ">
                        <Row text-center>
                            <Link className="col-lg-3 col-md-4 shadow p-3 mb-5 rounded bg-white text-dark mt-3 mb-3 pt-3 pb-3 controls nounderline" to="/addresturant" style={{ width: '22rem' }}>
                                <h4 className="text-center"><img src={rest} alt="sportlogo" /></h4>
                                <h4 className="text-center">Restaurant</h4>
                                <p className="text-center"><small>View Restaurant</small></p>
                            </Link>
                            <span className="col-lg-1 col-md-4"></span>
                            <Link className="col-lg-3 col-md-4 shadow p-3 mb-5 rounded bg-white text-dark mt-3 mb-3 pt-3 pb-3 controls" to="/addfood" style={{ width: '22rem' }}>
                                <h4 className="text-center"><img src={food} alt="sportlogo" /></h4>
                                <h4 className="text-center">Foods</h4>
                                <p className="text-center"><small>View Foods</small></p>
                            </Link>
                            <span className="col-lg-1 col-md-4"></span>
                            <Link className="col-lg-3 col-md-4 shadow p-3 mb-5 rounded bg-white text-dark mt-3 mb-3 pt-3 pb-3 controls" to="/viewuser" style={{ width: '22rem' }}>
                                <h4 className="text-center"><img src={user} alt="sportlogo" /></h4>
                                <h4 className="text-center">Users</h4>
                                <p className="text-center"><small>View Users</small></p>
                            </Link>
                          
                        </Row>
                    </Container>
                    <Footer/>
                </div>
      
               
                
            )

        }
       
       
    }

}
