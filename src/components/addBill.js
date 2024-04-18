import { useState } from "react";
import { Button, Alert } from 'react-bootstrap';
import axios from "axios";

function AddBill() {
    // use useState hook for getting variables name, price, member, status, household code
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [member, setMember] = useState('');
    const [status, setStatus] = useState('');
    const [householdCode, setHouseholdCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(
            " Name: " + name +
            " Price: " + price +
            " Member: " + member +
            " Status: " + status +
            " Household code: " + householdCode);


        // creating bill object from form values
        const bill = {
            name: name,
            price: price,
            member: member,
            status: status,
            householdCode: householdCode
        }

        // make HTTP POST request to server with bill data
        axios.post('http://localhost:4000/api/bill', bill)
            // handle successful response
            .then(response => {
                setSuccess("Successfully added bill.");
                console.log("Successfully added bill:", response.data);
                window.location.reload();
            })
            .catch(error => { // handle error
                setError("Error adding bill. Bill was not added.");
                console.error("Error adding bill:", error);
            });
    }

    return (
        <div>
            <h1>New bill</h1>
            <br></br>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            {/* form for adding a new bill, invoke onSubmit */}
            <form onSubmit={handleSubmit}>

                {/* getting input for name */}
                <div className="form-group">
                    <input type="text" class="form-control"
                        placeholder="Electricity January/ Gas 20th May/ Cleaning supplies"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }} />
                    <label>Name</label>
                </div>

                {/* getting input for price */}
                <div class="form-group" name="priceInput">
                    <input type="number" step="0.01" class="form-control"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => {
                            const value = e.target.value;
                            // allow only numbers and decimal points https://www.geeksforgeeks.org/how-to-restrict-input-box-to-allow-only-numbers-and-decimal-point-javascript/
                            if (value === "" || /^\d*\.?\d*$/.test(value)) {
                                setPrice(value);
                            }
                        }} />
                    <label>Price</label>
                </div>

                {/* getting input for member's name */}
                <div className="form-group">
                    <input type="text" class="form-control"
                        placeholder="Enter member's name"
                        value={member}
                        onChange={(e) => { setMember(e.target.value) }} />
                    <label>Member</label>
                </div>

                {/* getting input for bill status */}
                <div className="form-group">
                    <select
                        className="form-control"
                        value={status}
                        onChange={(e) => { setStatus(e.target.value) }} >
                        <option>Unpaid</option>
                        <option>Paid</option>
                    </select>
                    <label>Status</label>
                </div>

                {/* getting input for household code */}
                <div className="form-group">
                    <input type="text" class="form-control"
                        placeholder="Enter household code"
                        value={householdCode}
                        onChange={(e) => { setHouseholdCode(e.target.value) }} />
                    <label>Household code</label>
                </div>

                {/* button for submitting data */}
                <div>
                    <Button type="submit" value="ADDbill">Add bill</Button>
                </div>

            </form>
        </div>
    );
}

export default AddBill;