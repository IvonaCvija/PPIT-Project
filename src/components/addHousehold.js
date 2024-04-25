import { useEffect, useState } from "react";
import { Button, Alert } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddHousehold() {
    // use useState hook for getting variables household code and eircode
    const [householdCode, setHouseholdCode] = useState('');
    const [eircode, setEircode] = useState('');
    const [existingData, setExistingData] = useState({ householdCodes: [], eircodes: [] });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // making GET request to get existing codes to compare
        axios.get('http://localhost:4000/api/household/codes')
            .then(response => {
                setExistingData({ // mapping household codes and eircodes
                    householdCodes: response.data.map(h => h.householdCode),
                    eircodes: response.data.map(h => h.eircode)
                });
            })
            .catch(error =>
                console.error("Error getting household data:", error));
    }, []);

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // check if values are unique before adding new household
        if (existingData.householdCodes.includes(householdCode) || existingData.eircodes.includes(eircode)) {
            setError("Household code or eircode already exists.");
            return;
        }

        console.log(
            " Household code: " + householdCode +
            " Address(eircode): " + eircode);

        // creating household object from form values
        const household = {
            householdCode: householdCode,
            eircode: eircode
        }

        // make HTTP POST request to server with household data
        axios.post('http://localhost:4000/api/household', household)
            // handle successful response
            .then(response => {
                setSuccess("Successfully added household.");
                console.log("Successfully added household:", response.data);
                navigate('/login');
            })
            .catch(error => {
                setError(error.response.data);
                console.error("Error adding household:", error);
            });
    }

    return (
        <section class="h-100 bg-dark">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col">
                        <div class="card card-registration my-4">
                            <div class="row g-0">
                                <div class="col-xl-6">
                                    <div class="card-body p-md-5 text-black">
                                        <h3 class="mb-5 text-uppercase">Create Household</h3>
                                        {/* form for adding a new household, invoke onSubmit */}
                                        <form onSubmit={handleSubmit}>
                                            <div class="form-outline mb-4">
                                                {/* getting input for household code */}
                                                <input type="text" id="householdCode" class="form-control form-control-lg"
                                                    placeholder="Enter household code" value={householdCode}
                                                    onChange={(e) => setHouseholdCode(e.target.value)} />
                                                <label class="form-label" for="householdCode">Household Code</label>
                                            </div>
                                            <div class="form-outline mb-4">
                                                {/* getting input for eircode */}
                                                <input type="text" id="eircode" class="form-control form-control-lg"
                                                    placeholder="Enter eircode" value={eircode}
                                                    onChange={(e) => setEircode(e.target.value)} />
                                                <label class="form-label" for="eircode">Address (Eircode)</label>
                                            </div>
                                            {/* alert for error/success message https://getbootstrap.com/docs/4.0/components/alerts/ */}
                                            {error && <div class="alert alert-danger" role="alert">{error}</div>}
                                            {success && <div class="alert alert-success" role="alert">{success}</div>}
                                            <div class="d-flex justify-content-end pt-3">
                                                {/* button for submitting data */}
                                                <button type="submit" class="btn btn-warning btn-lg">Create Household</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-xl-6 d-none d-xl-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                        alt="Sample photo" class="img-fluid"
                                        style={{borderTopRightRadius: '.25rem', borderBottomRightRadius: '.25rem'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AddHousehold;