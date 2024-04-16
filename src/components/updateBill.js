import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function UpdateBill(props){
    let { id } = useParams();
    // update arrays useState()
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [member, setMember] = useState("");
    const [status, setStatus] = useState("");
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
                navigate('/read');
            });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                {/* getting input for name */}
                <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text" id="formBillName" class="form-control"
                        placeholder="Electricity January/ Gas 20th May/ Cleaning supplies" 
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        readOnly/>
                    <label>Name</label>
                </div>

                {/* getting input for price */}
                <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text" id="formBillPrice" class="form-control"
                        placeholder="Price" 
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                        readOnly/>
                    <label>Price</label>
                </div>

                {/* getting input for member's name */}
                <div data-mdb-input-init class="form-outline mb-4">
                    <input id="formBillMember" class="form-control"
                        placeholder="Member's name" 
                        value={member}
                        onChange={(e) => { setMember(e.target.value) }}
                        readOnly/>
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
                <div className="form-group">
                    <input type="submit" value="Update bill" className="btn btn-primary" />
                </div>

            </form>
        </div>
    );
}