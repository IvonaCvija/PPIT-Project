import Accounts from "./accounts";
import { useEffect, useState } from "react";
import axios from "axios";

function Household() {

    const [data, setData] = useState([]);

    useEffect(
        () => {
            // send GET request to server
            axios.get('http://localhost:4000/api/account')
                .then(
                    // callback function handling response, getting entire data
                    (response) => {
                        // get all data from jsonblob and set to state
                        setData(response.data)
                    }
                )
                // error message for failed request
                .catch(
                    (error) => {
                        // log error message to console
                        console.log('Failed to get accounts:', error);
                    }
                );
        }, [] // the empty array stops the running of the effect after 1 response
    );

    // reloading data by making another GET request
    const ReloadData = (e) => {
        axios.get('http://localhost:4000/api/account')
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
            <h1>All accounts</h1>
            {/* show combined accounts data(myAccounts(prop)) with bills component */}
            <Accounts myAccounts={data} Reload={ReloadData}></Accounts>
        </div>
    );

}

export default Household;