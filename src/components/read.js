// import bills component
import Bills from "./bills";
import { useEffect, useState } from "react";
import axios from "axios";

//Read component
function Read() {
    const [data, setData] = useState([]);

    useEffect(
        () => {
            // http://jsonblob.com/1229437506201444352 (from https://jsonblob.com)
            // get data from jsonblob with axios (asynchronous operation)
            axios.get('http://localhost:4000/api/bill')
                .then(
                    // callback function handling response, getting entire json data
                    (response) => {
                        // get all data from jsonblob and setn to state
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
        }, [] // the empty array stops the running of the effect after 1 response
    );

    // reloading data by making another get request
    const ReloadData = (e) => {
        axios.get('http://localhost:4000/api/bill')
            .then(
                // successful response
                (response) => {
                    // update state with data
                    setData(response.data)
                }
            )
            .catch(
                // error handling
                (error) => {
                    console.log(error);
                }
            );
    }


    return (
        <div>
            <h1>All bills</h1>
            {/* show combined bills data(myBills(prop)) with bills component */}
            {/* <Bills myBills={data}></Bills> */}
            <Bills myBills={data} Reload={ReloadData}></Bills>
        </div>
    );
}

export default Read;