import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/login';
import Household from './components/household';
// import Bills from './components/bills';
import Read from './components/read';
import AddBill from './components/addBill';
import UpdateBill from './components/updateBill';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* https://react-bootstrap.netlify.app/docs/components/navbar/#home */}
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Housemates App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/household">Household</Nav.Link>
              <Nav.Link href="/bills">Bills</Nav.Link>
              <NavDropdown title="Adding" id="basic-nav-dropdown">
                <NavDropdown.Item href="/addHousehold">Add Household</NavDropdown.Item>
                <NavDropdown.Item href="/addBill">Add Bill</NavDropdown.Item>
                <NavDropdown.Item href="/addHousemate">Add Housemate</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/household' element={<Household></Household>}></Route>
        <Route path='/bills' element={<Read></Read>}></Route>
        <Route path='/addBill' element={<AddBill></AddBill>}></Route>
        <Route path='/updateBill/:id' element ={<UpdateBill></UpdateBill>}></Route>
      </Routes>

    </BrowserRouter>

  );
}

export default App;
