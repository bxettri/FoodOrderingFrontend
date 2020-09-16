import React, { Component } from 'react'
import '../Layouts/navbar.css';
import '../User/usernavbar.css';
import { Container,NavItem,NavLink,UncontrolledDropdown,DropdownMenu,DropdownItem,DropdownToggle,Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';
import cartavatar from '../assets/cart.png';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Cart from './viewCart';

export default class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      modalbag: false,
      user: [], 
      food: [],
      totalprice: '',
      isOpen:false,
      cart: [],
      quanity: [],
      config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      },
    }
    this.togglebag = this.togglebag.bind(this);
  }

  togglebag() {
    this.setState({
      modalbag: !this.state.modalbag
    })
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  componentDidMount() {
  }


  handleChange = (e) => {
    this.setState(
        { [e.target.name]: e.target.value }
    )
  }

  handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.clear();
    if (localStorage.getItem('token') == null) {
      window.location.reload(false)
    }
  }

  render() {
    if (localStorage.getItem('token')) {
      return (
        <Container fluid={true}>
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/home">Foodista</NavbarBrand>
        <NavbarToggler onClick={this.toggle.bind(this)} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink href="/home">Home</NavLink>
            </NavItem> */}
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/viewCart">
                  View Cart
                </DropdownItem>
                <DropdownItem href="/viewOrder">
                  View Order
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/profile">
                  My Profile
                </DropdownItem>
                <DropdownItem onClick={this.handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
      
          <div>
   
              <Container>
              <UncontrolledDropdown>
              <img src={cartavatar} id="bag" onClick={this.togglebag} />
              <DropdownToggle id="tab"  color="light">
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <NavLink href="/viewCart/">View Cart</NavLink>
                </DropdownItem>
                <DropdownItem>
                <NavLink href="/viewOrder/">View order</NavLink>
                </DropdownItem>
                <DropdownItem>
                <NavLink id="profile" href="/profile/">Profile Update</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <NavLink onClick={this.handleLogout}>Logout</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
             <form class="form-inline my-2 my-lg-0">
            
                {/* <div class="dropdown">
                  <button class="dropbtn"><img src={useravatar} /></button>
                  <div class="dropdown-content">
                    <a class="btn btn-primary" href='/profile'>Profile Update</a>
                    <a class="btn btn-success" href='/order'>View order</a>
                    <a type="button" color="warning" onClick={this.handleLogout}>Logout</a>
                  </div>
                </div> */}
           
              
              </form>
              </Container>
              </div>
        </Collapse>
       
      </Navbar>


    <Modal isOpen={this.state.modalbag}  zIndex={0} size={'lg'}>
      <ModalHeader toggle={this.togglebag}><legend>My Cart</legend></ModalHeader>
      <ModalBody>
        <Cart/>
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </Modal>
    </Container>
      )
    }
  }
}


