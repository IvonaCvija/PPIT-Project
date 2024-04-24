import Accounts from "./accounts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'; // hook for accessing parameters of current route

function Household() {

    const [data, setData] = useState([]); // get data from server
    // const householdCode = "opet nes"; //testing for householdCode ="opet nes"
    const { householdCode } = useParams(); // get householdCode from url

    // hook for getting data
    useEffect(() => {
        // send GET request to server
        axios.get(`http://localhost:4000/api/account?householdCode=${householdCode}`)
            .then(response => // callback function handling response, getting entire data
            {
                setData(response.data);
            })
            // error message for failed request
            .catch(error => {
                // log error message to console
                console.log('Failed to get accounts:', error);
            });
    }, [householdCode]); // dependency array for householdCode, so effect runs again if householdCode changes

    return (
        <div>
            <h1>Accounts for Household: {householdCode}</h1>
            <Accounts myAccounts={data}></Accounts>
        </div>
    );
}

export default Household;