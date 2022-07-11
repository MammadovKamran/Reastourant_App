import React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';

const Navigation = () => {
  return (
    <div>
         <Navbar
    color="light"
    expand="md"
    light
  >
    <NavbarBrand href="/">
      MyRestaurant
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
        <NavItem>
          <NavLink href="/makeorder">
            Sifariş ver
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
    </div>
  )
}

export default Navigation