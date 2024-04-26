import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function UpdateBill(props) {
    let { id } = useParams();
    // update arrays useState()
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [member, setMember] = useState("");
    const [status, setStatus] = useState("");
    const [householdCode, setHouseholdCode] = useState('');
    const navigate = useNavigate();

    //useEffect Hook
    useEffect(
        () => {
            // make a HTTP GET Request  as part of the url
            axios.get('http://localhost:4000/api/bill/' + id)
                .then((response) => {
                    //functions to write attributes as values(later used to fill up fields)
                    setName(response.data.name);
                    setPrice(response.data.price);
                    setMember(response.data.member);
                    setStatus(response.data.status);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }, []);

    const handleSubmit = (event) => {
        // limits one click to one action
        event.preventDefault();
        const newBill = {
            id: id,
            name: name,
            price: price,
            member: member,
            status: status
        };
        // sending to server
        axios.put('http://localhost:4000/api/bill/' + id, newBill)
            .then((res) => {
                console.log(res.data);
                navigate('/bills');
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
                                        <h3 class="mb-5 text-uppercase">Update Bill</h3>
                                        <form onSubmit={handleSubmit}>
    
                                            {/* getting input for name */}
                                            <div class="form-outline mb-4">
                                                <input readOnly type="text" class="form-control form-control-lg"
                                                    placeholder="Electricity January/ Gas 20th May/ Cleaning supplies"
                                                    value={name}
                                                    onChange={(e) => { setName(e.target.value) }} />
                                                <label class="form-label">Name</label>
                                            </div>
    
                                            {/* getting input for price */}
                                            <div class="form-outline mb-4">
                                                <input readOnly type="number" step="0.01" class="form-control form-control-lg"
                                                    placeholder="Price"
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
                                                <input readOnly type="text" class="form-control form-control-lg"
                                                    placeholder="Member's name"
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
                                                <input readOnly type="text" class="form-control form-control-lg"
                                                    placeholder="Household code"
                                                    value={householdCode}
                                                    onChange={(e) => { setHouseholdCode(e.target.value) }} />
                                                <label class="form-label">Household code</label>
                                            </div>
    
                                            {/* button for submitting data */}
                                            <div class="d-flex justify-content-end pt-3">
                                                <button type="submit" class="btn btn-warning btn-lg">Update bill</button>
                                            </div>
    
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}