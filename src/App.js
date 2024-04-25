import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/login';

import Read from './components/read';
import AddBill from './components/addBill';
import UpdateBill from './components/updateBill';

import AddHousehold from './components/addHousehold';

import Household from './components/household';
import AddAccount from './components/addAccount';

import Navbar from './Navbar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HouseholdCodeProvider } from './components/householdCodeContext';

function App() {

  const [householdCode, setHouseholdCode] = useState(localStorage.getItem('householdCode') || null);

  useEffect(() => {
    // updating state when local storage changes
    const handleStorageChange = () => {
      setHouseholdCode(localStorage.getItem('householdCode'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  

  return (
    <HouseholdCodeProvider value={householdCode}>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>

          <Route path='/bills' element={<Read></Read>}></Route>
          <Route path='/addBill' element={<AddBill></AddBill>}></Route>
          <Route path='/updateBill/:id' element={<UpdateBill></UpdateBill>}></Route>

          <Route path='/addHousehold' element={<AddHousehold></AddHousehold>}></Route>

          <Route path='/bills/:householdCode' element={<Read></Read>}></Route>
          <Route path='/household/:householdCode' element={<Household></Household>}></Route>
          <Route path='/addAccount' element={<AddAccount></AddAccount>}></Route>
        </Routes>

      </BrowserRouter>
    </HouseholdCodeProvider>
  );
}

export default App;
