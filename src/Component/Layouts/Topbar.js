import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import {FaHeart} from 'react-icons/fa';
import {FaShoppingBag} from 'react-icons/fa';
import {FaUser} from 'react-icons/fa';

import '../Layouts/topbar.css'

const Topbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" id="topbar">
        <NavbarBrand href="/"></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar >
            <NavItem>
              <NavLink href="/components/">Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">About us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Blog</NavLink>
            </NavItem>
            
          </Nav>
          <NavbarText id="Whistlist"><FaHeart />Whistlist</NavbarText>
          <NavbarText id="order"><FaShoppingBag />Order</NavbarText>
          <NavbarText id="account"><FaUser />Account</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Topbar;