// sources: - https://mdbootstrap.com/docs/standard/extended/login/
// - https://www.youtube.com/watch?v=ZVyIIyZJutM
// - https://legacy.reactjs.org/docs/context.html

import { Button } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // don't continue if there's no phone num or password
        if (!phoneNumber || !password) {
            setError('Please enter both your phone number and password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/login', { phoneNumber, password });
            
            if (response.data && response.data.householdCode) {
                localStorage.setItem('householdCode', response.data.householdCode);
                navigate(`/bills/${response.data.householdCode}`); // navigate to bills(with same household code)
                // navigate(`/household/${response.data.householdCode}`); // navigate to household(accounts with same household code)
            } else {
                // case where householdCode isn't in response
                throw new Error('No household code');
            }
        } catch (error) {
            setError('Failed to login: ' + (error.response && error.response.data ? error.response.data : 'Unknown error'));
        }
    }

    return (
        <div>

            <section class="h-100 gradient-form">
                <div class="container py-5 h-100" style={{ backgroundColor: '#9be8ad' }}>
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-xl-10">
                            <div class="card rounded-3 text-black" style={{ backgroundColor: '#68d481' }}>
                                <div class="row g-0">
                                    <div class="col-lg-6">
                                        <div class="card-body p-md-5 mx-md-4">

                                            <div class="text-center">
                                                <img src="https://previews.123rf.com/images/biseeise/biseeise2401/biseeise240112124/222998403-house-structure-illustrationscountry-home-vector-designs.jpg"
                                                    style={{ maxWidth: '100%', height: 'auto' }} />

                                                <h4 class="mt-1 mb-5 pb-1">Housemates</h4>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <p>Please login to your account</p>

                                                {/* <div data-mdb-input-init class="form-outline mb-4">
                                                    <label class="form-label" for="formLogin">Household :</label>
                                                    <input type="text" value={householdCode} onChange={(e) => setHouseholdCode(e.target.value)} placeholder="Household code" />
                                                </div> */}

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <label class="form-label" for="formLogin">Phone number :</label>
                                                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone number" />
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <label class="form-label" for="formLogin">Password :</label>
                                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                                </div>

                                                <div class="text-center pt-1 mb-5 pb-1">
                                                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">
                                                        Log in</button>
                                                        {error && <p style={{ color: 'red' }}>{error}</p>}
                                                </div>

                                                <div class="d-flex align-items-center justify-content-center pb-4">
                                                    <p class="mb-0 me-2">Are you not a member yet?</p>
                                                    <Button variant="btn btn-outline-danger" href="/addAccount">Create account</Button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div>
    )
}

export default Login;