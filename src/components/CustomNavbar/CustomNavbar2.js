import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CustomNavbar2.css'
import SOH from './SVG-HEADER.svg';
import { StyleSheet, css } from 'aphrodite';

export default class CustomNavbar2 extends Component {
  render() {
    return (
      <Navbar default  >
  
          <div className="logo-center2"><img src={SOH}  alt="logo" /></div>
      
      </Navbar>
    )
  }
}

const styles = StyleSheet.create({
  red: {
      backgroundColor: 'red'
  },

  blue: {
      backgroundColor: 'blue'
  },

  hover: {
      ':hover': {
          backgroundColor: 'red'
      }
  },

  small: {
      '@media (max-width: 600px)': {
          backgroundColor: 'red',
      }
  }
});