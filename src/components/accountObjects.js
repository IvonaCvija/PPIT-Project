import { Link } from 'react-router-dom';

function AccountObjects(props) {

    return (
        //https://getbootstrap.com/docs/4.1/components/card/
        <div>
            <div key={props.myAccounts._id} class="card text-white bg-info mb-3" style={{ maxWidth: '18rem' }}>
                <div class="card-header">{"Household: " + props.myAccounts.householdCode}</div>
                <div class="card-body">
                    <p class="card-title">{"Name: " + props.myAccounts.fName}</p>
                    <h5 class="card-text">{"Phone number: " + props.myAccounts.phoneNumber}</h5>
                    {/* <h5 class="card-text">{props.myAccounts.password}</h5> */}
                </div>
                <div class="card-footer">
                    {/* <Link to={'/updateBill/' + props.myAccounts._id} className='btn btn-info me-3' >Update</Link> */}

                </div>
            </div>
        </div>
    );
}
// export AccountObjects
export default AccountObjects;