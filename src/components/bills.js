import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BillObjects from "./billObjects";

function Bills(props) {

    // mapping over bills state
    return props.myBills.map(
        (bill) => {
            return <BillObjects myBills={bill} key={bill._id} reload={() => { props.Reload(); }}></BillObjects>

        }
    );
}

export default Bills;