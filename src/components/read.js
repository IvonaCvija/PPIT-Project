// import bills component
import Bills from "./bills";
import{ useEffect, useState} from "react";
import axios from "axios";

//Read component
function Read(){
    const [data, setData] = useState([]);
    useEffect(
        () => {
            // http://jsonblob.com/1229437506201444352 (from https://jsonblob.com)
            // get data from jsonblob with axios (asynchronous operation)
            axios.get('https://jsonblob.com/api/1229437506201444352')
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
                        // log the error message to the console
                        console.log(error);
                    }
                );
        }, [] // the empty array stops the running of the effect after 1 response
    );
    return (
        <div>
            <h1>All bills</h1>
            {/* show combined bills data(myBills(prop)) with bills component */}
            <Bills myBills={data}></Bills>
        </div>
    );
}

export default Read;



//array of bills data
    // const data = [
    //     {
    //         "name": "Electricity",
    //         "price": 40,
    //         "member": "Ivona",
    //         "status": "Unpaid"
    //     },
    //     {
    //         "name": "Gas",
    //         "price": 65.5,
    //         "member": "Mimi",
    //         "status": "Paid"
    //     }        
    // ];
