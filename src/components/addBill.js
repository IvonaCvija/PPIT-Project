import { useState } from "react";
import { Button } from 'react-bootstrap';
import axios from "axios";

function AddBill(){
    // use useState hook for getting variables name, price, member, status
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [member, setMember] = useState('');
    const [status, setStatus] = useState('');

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(
            " Name: " + name +
            " Price: " + price +
            " Member: " + member +
            " Status: " + status);
    

    // creating bill object from form values
    const bill = {
        name: name,
        price: price,
        member: member,
        status:status
    }

    // make HTTP POST request to server with bill data
    axios.post('http://localhost:4000/api/bill', bill)
    // handle successful response
    .then(response => {
        console.log('Successfully added bill:', response.data);
    })
    .catch(error => { // handle error
        console.error('Error adding bill:', error);
    });
}

    return (
        <div>
            <h1>New bill</h1>
            <br></br>
            {/* form for adding a new bill, invoke onSubmit */}
            <form onSubmit={handleSubmit}>

                {/* getting input for name */}
                <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text" id="formBillName" class="form-control"
                        placeholder="Electricity January/ Gas 20th May/ Cleaning supplies" 
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}/>
                    <label>Name</label>
                </div>

                {/* getting input for price */}
                <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text" id="formBillPrice" class="form-control"
                        placeholder="Price" 
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}/>
                    <label>Price</label>
                </div>

                {/* getting input for member's name */}
                <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text" id="formBillMember" class="form-control"
                        placeholder="Member's name" 
                        value={member}
                        onChange={(e) => { setMember(e.target.value) }}/>
                    <label>Member</label>
                </div>

                {/* getting input for bill status */}
                <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text" id="formBillStatus" class="form-control"
                        placeholder="Paid/Unpaid" 
                        value={status}
                        onChange={(e) => { setStatus(e.target.value) }}/>
                    <label>Status</label>
                </div>
               
                {/* button for submitting data */}
                <div>
                    <Button type="submit" value="ADD">Add bill</Button>
                </div>

            </form>
        </div>
    );
}

export default AddBill;