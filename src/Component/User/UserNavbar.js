import React, { Component } from 'react'
import '../Layouts/navbar.css';
import '../User/usernavbar.css';
import { Container,NavItem,NavLink,UncontrolledDropdown,DropdownMenu,DropdownItem,DropdownToggle,Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,Modal,ModalHeader,ModalBody,ModalFooter, NavbarText } from 'reactstrap';
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
      username:'',
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
    this.setState({
      username:localStorage.getItem('username')
    })
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
      window.location.href = "/"
    }
  }

  render() {
    if (localStorage.getItem('token')) {
      return (
        <Container fluid={true}>
        <Navbar color="light" light expand="md">
        <NavbarBrand><h3>FOODISTA</h3></NavbarBrand>
        <NavbarToggler onClick={this.toggle.bind(this)} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
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
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
        <NavbarText>Welcome, {this.state.username}</NavbarText>
        <img alt="cartIcon" onClick={this.togglebag} style={{height:40, width:40}} src={cartavatar}/>
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


