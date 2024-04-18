import React, { useEffect, useState } from 'react';
import BillObjects from "./billObjects";

function Bills(){

    const [bills, setBills] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const memberName = searchParams.get('member');
        
        // https://www.scaler.com/topics/nodejs/node-js-fetch/
        // https://stackoverflow.com/questions/72275692/how-to-find-member-by-username
        // function that fetches bills based on memberName (url will be http://localhost:3000/bills?member=name)
        const fetchBills = () => {
            fetch(`http://localhost:4000/api/bill${memberName ? `?member=${memberName}` : ''}`)
                .then(response => response.json())
                .then(data => {
                    setBills(data); // update state with fetched data
                })
                .catch(error => {
                    console.error('Error fetching bills:', error);
                });
        };

        fetchBills();

    }, []);

    // bills state
    return (
        <div>
            {bills.map(bill => ( // mapping over bill state
                <BillObjects key={bill._id} myBills={bill} />
            ))}
        </div>
    );
}
export default Bills;