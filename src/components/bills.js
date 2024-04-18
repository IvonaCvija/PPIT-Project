import React, { useEffect, useState } from 'react';
import BillObjects from "./billObjects";

function Bills(props) {

    // mapping over bills state
    return props.myBills.map(
        (bill) => {
            return <BillObjects myBills={bill} key={bill._id} reload={() => { props.Reload(); }}></BillObjects>


            // return props.myBills.map(bill => 
            //     <BillObjects key={bill._id} myBills={bill} reload={() => { props.Reload(); }} />
            // );
            // const [bills, setBills] = useState([]);

            // useEffect(() => {
            //     const searchParams = new URLSearchParams(window.location.search);
            //     const memberName = searchParams.get('member');

            //     // https://www.scaler.com/topics/nodejs/node-js-fetch/
            //     // https://stackoverflow.com/questions/72275692/how-to-find-member-by-username
            //     // function that fetches bills based on memberName (url will be http://localhost:3000/bills?member=name)
            //     const fetchBills = () => {
            //         fetch(`http://localhost:4000/api/bill${memberName ? `?member=${memberName}` : ''}`)
            //             .then(response => response.json())
            //             .then(data => {
            //                 setBills(data); // update state with fetched data
            //             })
            //             .catch(error => {
            //                 console.error('Error fetching bills:', error);
            //             });
            //     };

            //     fetchBills();

            // }, []);
        }
    );
}

export default Bills;