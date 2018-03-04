import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CustomNavbar2.css'
import SOH from './SVG-HEADER.svg';

export default class CustomNavbar2 extends Component {
  render() {
    return (
      <Navbar default >
        <Navbar.Header>
          <Navbar.Brand>
          <div className="nav-soh"><img src={SOH}  alt="logo" /></div>
          </Navbar.Brand>
      
        </Navbar.Header>
        
      </Navbar>
    )
  }
}
