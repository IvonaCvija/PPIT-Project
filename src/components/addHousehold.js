import { useEffect, useState } from "react";
import { Button, Alert } from 'react-bootstrap';
import axios from "axios";

function AddHousehold() {
    // use useState hook for getting variables household code and eircode
    const [householdCode, setHouseholdCode] = useState('');
    const [eircode, setEircode] = useState('');
    const [existingData, setExistingData] = useState({ householdCodes: [], eircodes: [] });
    const [error, setError] = useState('');

    useEffect(() => {
        // making get request *get existing codes to compare()
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
                console.log('Successfully added household:', response.data);
                window.location.reload();
            })
            .catch(error => {
                setError(error.response.data);
                console.error('Error adding household:', error);
            });
    }

    return (
        <div>
            <h1>New household</h1>
            <br></br>
            {/* alert for error message https://getbootstrap.com/docs/4.0/components/alerts/ */}
            {error && <Alert variant="danger">{error}</Alert>}
            {/* form for adding a new household, invoke onSubmit */}
            <form onSubmit={handleSubmit}>

                {/* getting input for household code */}
                <div className="form-group">
                    <input type="text" class="form-control"
                        placeholder="Enter household code"
                        value={householdCode}
                        onChange={(e) => { setHouseholdCode(e.target.value) }} />
                    <label>Household code</label>
                </div>

                {/* getting input for eircode */}
                <div className="form-group">
                    <input type="text" class="form-control"
                        placeholder="Enter eircode"
                        value={eircode}
                        onChange={(e) => { setEircode(e.target.value) }} />
                    <label>Address(eircode)</label>
                </div>

                {/* button for submitting data */}
                <div>
                    <Button type="submit" value="ADDhousehold">Add household</Button>
                </div>

            </form>
        </div>
    );
}

export default AddHousehold;