import { useState } from "react";
import { Button } from 'react-bootstrap';
import axios from "axios";

function AddAccount() {
    // use useState hook for getting variables full name, phone number, password, household code
    const [fName, setFName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [householdCode, setHouseholdCode] = useState('');

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(
            " Full name: " + fName +
            " Phone number: " + phoneNumber +
            " Password: " + password +
            " Household code: " + householdCode);

        // creating account object from form values
        const account = {
            fName: fName,
            phoneNumber: phoneNumber,
            password: password,
            householdCode: householdCode
        }

        // make HTTP POST request to server with account data
        axios.post('http://localhost:4000/api/account', account)
            // handle successful response
            .then(response => {
                console.log('Successfully added account:', response.data);
                window.location.reload();
            })
            .catch(error => { // handle error
                console.error('Error adding account:', error);
            });
    }

    return (
        <div>
            <h1>Create account</h1>
            <br></br>
            {/* form for adding a new account, invoke onSubmit */}
            <form onSubmit={handleSubmit}>

                {/* getting input for full name */}
                <div className="form-group">
                    <input type="text" class="form-control"
                        placeholder="Enter full name"
                        value={fName}
                        onChange={(e) => { setFName(e.target.value) }} />
                    <label>Name</label>
                </div>

                {/* getting input for phoneNumber */}
                <div class="form-group">
                    <input type="number" step="0.01" class="form-control"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => {
                            const value = e.target.value;
                            // allow only numbers and decimal points https://www.geeksforgeeks.org/how-to-restrict-input-box-to-allow-only-numbers-and-decimal-point-javascript/
                            if (value === "" || /^[+]?[\d]*$/.test(value)) {
                                setPhoneNumber(value);
                            }
                        }} />
                    <label>Phone number</label>
                </div>

                {/* getting input for password */}
                <div className="form-group">
                    <input type="password" class="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <label>Password</label>
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
                    <Button type="submit" value="ADDaccount">Create account</Button>
                </div>

            </form>
        </div>
    );
}

export default AddAccount;