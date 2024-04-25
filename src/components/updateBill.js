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
    return (
        <div>
            <form onSubmit={handleSubmit}>

                {/* getting input for name */}
                <div className="form-group">
                    <input type="text" class="form-control"
                        placeholder="Electricity January/ Gas 20th May/ Cleaning supplies"
                        value={name}
                        readOnly // makes the field read-only 
                        /> 
                    <label>Name</label>
                </div>

                {/* getting input for price */}
                <div class="form-group" name="priceInput">
                    <input type="number" step="0.01" class="form-control"
                        placeholder="Price"
                        value={price}
                        readOnly />
                    <label>Price</label>
                </div>

                {/* getting input for member's name */}
                <div className="form-group">
                    <input type="text" class="form-control"
                        placeholder="Member's name"
                        value={member}
                        readOnly />
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
                        placeholder="Household code"
                        value={householdCode}
                        readOnly />
                    <label>Household code</label>
                </div>

                {/* button for submitting data */}
                <div className="form-group">
                    <input type="submit" value="Update bill" className="btn btn-primary" />
                </div>

            </form>
        </div>
    );
}