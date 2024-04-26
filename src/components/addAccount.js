import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddAccount() {
    // use useState hook for getting variables full name, phone number, password, household code
    const [fName, setFName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [householdCode, setHouseholdCode] = useState('');
    const [existingPhoneNumbers, setExistingPhoneNumbers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // go to previous page
    const goBack = () => {
        navigate(-1);
      };

    useEffect(() => {
        //  making GET request to get existing phone numbers to compare
        axios.get('http://localhost:4000/api/account/phoneNumbers')
            .then(response => {
                setExistingPhoneNumbers(response.data.map(account => account.phoneNumber));
            })
            .catch(error => console.error("Error fetching phone numbers:", error));
    }, []);

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // check if phone number is unique before adding new account
        if (existingPhoneNumbers.includes(phoneNumber)) {
            setError("Phone number already exists.");
            return;
        }

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
                setSuccess("Successfully added account.");
                console.log("Successfully added account:", response.data);
                navigate('/login'); // redirect to login page
            })
            .catch(error => { // handle error
                setError(error.response.data);
                console.error("Error adding account:", error);
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
                                <div class="col-xl-6 d-none d-xl-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                        alt="Sample photo" class="img-fluid"
                                        style={{borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem'}} />
                                </div>
                                <div class="col-xl-6">
                                    <div class="card-body p-md-5 text-black">
                                        <h3 class="mb-5 text-uppercase">Create account</h3>

                                        {/* form for adding a new household, invoke onSubmit */}
                                        <form onSubmit={handleSubmit}>

                                            {/* getting input for full name */}
                                            <div class="form-outline mb-4">
                                                <input type="text" id="fullName" class="form-control form-control-lg"
                                                    placeholder="Full Name" value={fName} onChange={(e) => setFName(e.target.value)} />
                                                <label class="form-label" for="fullName">Full Name</label>
                                            </div>

                                            {/* getting input for phone number */}
                                            <div class="form-outline mb-4">
                                                <input type="text" id="phoneNumber" class="form-control form-control-lg"
                                                    placeholder="Phone Number" value={phoneNumber} onChange={(e) => {
                                                        const value = e.target.value;
                                                        // allow only numbers and decimal points https://www.geeksforgeeks.org/how-to-restrict-input-box-to-allow-only-numbers-and-decimal-point-javascript/
                                                        if (value === "" || /^[+]?[\d]*$/.test(value)) {
                                                            setPhoneNumber(value);
                                                        }
                                                    }} />
                                                <label class="form-label" for="phoneNumber">Phone Number</label>
                                            </div>

                                            {/* getting input for password */}
                                            <div class="form-outline mb-4">
                                                <input type="password" id="password" class="form-control form-control-lg"
                                                    placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                <label class="form-label" for="password">Password</label>
                                            </div>

                                            {/* getting input for household code */}
                                            <div class="form-outline mb-4">
                                                <input type="text" id="householdCode" class="form-control form-control-lg"
                                                    placeholder="Household Code" value={householdCode} onChange={(e) => setHouseholdCode(e.target.value)} />
                                                <label class="form-label" for="householdCode">Household Code</label>
                                            </div>

                                            {/* alert for error/success message https://getbootstrap.com/docs/4.0/components/alerts/ */}
                                            {error && <div class="alert alert-danger" role="alert">{error}</div>}
                                            {success && <div class="alert alert-success" role="alert">{success}</div>}
                                            
                                            {/* buttons for submitting data and for going back*/}
                                            <div class="d-flex justify-content-end pt-3">
                                                <button type="button" className="btn btn-warning btn-lg me-2" onClick={goBack}>Back</button>
                                                <button type="submit" class="btn btn-warning btn-lg">Create Account</button>
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

export default AddAccount;