import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddBill() {
    // use useState hook for getting variables name, price, member, status, household code
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [member, setMember] = useState('');
    const [status, setStatus] = useState('');
    const [householdCode, setHouseholdCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // for calculator
    const [totalPrice, setTotalPrice] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [memberPrice, setMemberPrice] = useState(null);

    // function to calculate member price
    const calculateMemberPrice = () => {
        const memPrice = Number(totalPrice) / Number(numberOfPeople);
        setMemberPrice(memPrice.toFixed(2)); // round up to 2 decimals
    };

    // go to previous page
    const goBack = () => {
        navigate(-1);
    };

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
                //window.location.reload();
            })
            .catch(error => { // handle error
                setError("Error adding bill. Bill was not added.");
                console.error("Error adding bill:", error);
            });
    }

    // design template from https://mdbootstrap.com/docs/standard/extended/registration/
    return (
        <section class="h-100 bg-dark">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col">
                        <div class="card card-registration my-4">
                            <div class="row g-0">
                                <div class="col-xl-6">
                                    <div class="card-body p-md-5 text-black">
                                        <h3 class="mb-5 text-uppercase">New bill</h3>
                                        {/* form for adding a new bill, invoke onSubmit */}
                                        <form onSubmit={handleSubmit}>

                                            {/* getting input for name */}
                                            <div class="form-outline mb-4">
                                                <input type="text" class="form-control form-control-lg"
                                                    placeholder="Electricity January/ Gas 20th May/ Cleaning supplies"
                                                    value={name}
                                                    onChange={(e) => { setName(e.target.value) }} />
                                                <label class="form-label">Name</label>
                                            </div>

                                            {/* getting input for price */}
                                            <div class="form-outline mb-4">
                                                <input type="number" step="0.01" class="form-control form-control-lg"
                                                    placeholder="Enter price"
                                                    value={price}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        // allow only numbers and decimal points https://www.geeksforgeeks.org/how-to-restrict-input-box-to-allow-only-numbers-and-decimal-point-javascript/
                                                        if (value === "" || /^\d*\.?\d*$/.test(value)) {
                                                            setPrice(value);
                                                        }
                                                    }} />
                                                <label class="form-label">Price</label>
                                            </div>

                                            {/* getting input for member's name */}
                                            <div class="form-outline mb-4">
                                                <input type="text" class="form-control form-control-lg"
                                                    placeholder="Enter member's name"
                                                    value={member}
                                                    onChange={(e) => { setMember(e.target.value) }} />
                                                <label class="form-label">Member</label>
                                            </div>

                                            {/* getting input for bill status */}
                                            <div class="form-outline mb-4">
                                                <select
                                                    class="form-control form-control-lg"
                                                    value={status}
                                                    onChange={(e) => { setStatus(e.target.value) }} >
                                                    <option>Unpaid</option>
                                                    <option>Paid</option>
                                                </select>
                                                <label class="form-label">Status</label>
                                            </div>

                                            {/* getting input for household code */}
                                            <div class="form-outline mb-4">
                                                <input type="text" class="form-control form-control-lg"
                                                    placeholder="Enter household code"
                                                    value={householdCode}
                                                    onChange={(e) => { setHouseholdCode(e.target.value) }} />
                                                <label class="form-label">Household code</label>
                                            </div>

                                            {/* buttons for submitting data and for going back*/}
                                            <div class="d-flex justify-content-end pt-3">
                                                <button type="button" className="btn btn-warning btn-lg me-2" onClick={goBack}>Back</button>
                                                <button type="submit" class="btn btn-warning btn-lg" onClick={goBack}>Add bill</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* calculator */}
                        <h3 className="mb-3 text-white">Split your bill!</h3>
                        <div className="form-group mb-3">
                            <label htmlFor="totalPrice" className="text-white">Total Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="totalPrice"
                                placeholder="Enter total price"
                                value={totalPrice}
                                onChange={(e) => setTotalPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="numberOfPeople" className="text-white">Number of People</label>
                            <input
                                type="number"
                                className="form-control"
                                id="numberOfPeople"
                                placeholder="Enter number of people"
                                value={numberOfPeople}
                                onChange={(e) => setNumberOfPeople(e.target.value)}
                            />
                        </div>
                        <button onClick={calculateMemberPrice} className="btn btn-primary mb-3">Calculate</button>
                        {memberPrice !== null && (
                            <div className="text-white">
                                Each person should pay: ${memberPrice}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AddBill;