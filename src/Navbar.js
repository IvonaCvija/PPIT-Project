import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import HouseholdCodeContext from './components/householdCodeContext';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar() {
  const householdCode = useContext(HouseholdCodeContext);
  const navigate = useNavigate(); // for handling navigation

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand onClick={() => handleNavigate('/')} style={{ cursor: 'pointer' }}>
          Housemates App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavigate('/login')}>Login</Nav.Link>
            {householdCode && (
              <>
                <Nav.Link onClick={() => handleNavigate(`/bills/${householdCode}`)}>
                  Bills
                </Nav.Link>
                <Nav.Link onClick={() => handleNavigate(`/household/${householdCode}`)}>
                  Household
                </Nav.Link>
              </>
            )}
            <NavDropdown title="Adding" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavigate('/addHousehold')}>
                Add Household
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigate('/addBill')}>
                Add Bill
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigate('/addAccount')}>
                Create Account
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;