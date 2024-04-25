// import bills component
import Bills from "./bills";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

//Read component
function Read() {
    const [data, setData] = useState([]);
    // get household code from url
    const { householdCode } = useParams(); 

    useEffect(
        () => {
            axios.get(`http://localhost:4000/api/bill?householdCode=${householdCode}`)
                .then(
                    // callback function handling response, getting entire json data
                    (response) => {
                        // get all data from jsonblob and set to state
                        setData(response.data)
                    }
                )
                // error message for failed request
                .catch(
                    (error) => {
                        // log error message to console
                        console.log('Failed to get bills:', error);
                    }
                );
        }, [householdCode] // dependency array for householdCode, so effect runs again if householdCode changes
    );

    // reloading data by making another GET request
    const ReloadData = (e) => {
        axios.get('http://localhost:4000/api/bill?householdCode=${householdCode}')
            .then(
                // successful response
                (response) => {
                    // update state with data
                    setData(response.data)
                }
            )
            .catch(error => {
                // error handling
                console.log('Error reloading data:', error);
            });
    }

    return (
        <div>
            <h1>All bills for Household: {householdCode}</h1>
            {/* send bills and reload function as props to the Bills component */}
            <Bills myBills={data} Reload={ReloadData}></Bills>
        </div>
    );
}

export default Read;