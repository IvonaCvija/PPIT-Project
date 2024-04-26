import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function BillObjects(props) {
    // setting class of card based on the value of myBills.status (ternary operator) https://www.w3schools.com/react/react_es6_ternary.asp & https://stackoverflow.com/questions/52321539/react-passing-props-with-styled-components
    const cardClass = `card text-black ${props.myBills.status === 'Paid' ? 'bg-success' : 'bg-warning'} mb-3`;

    return (
        //https://getbootstrap.com/docs/4.1/components/card/
        <div>
            <div key={props.myBills._id} class={cardClass} style={{maxWidth: '18rem'}}>
                <div class="card-header">{"Member: " + props.myBills.member}</div>
                <div class="card-body">
                    <p class="card-title">{"Name: " + props.myBills.name}</p>
                    <h5 class="card-text">{props.myBills.price + "€"}</h5>
                    <h4 class="card-text">{props.myBills.status}</h4>
                </div>
                <div class="card-footer">
                    <Link to={'/updateBill/' + props.myBills._id} className='btn btn-secondary me-3'>Update</Link>
                    {/* button to delete bill */}
                    <Button variant='secondary' onClick={
                        (e) => {
                            // send delete request to server to delete bill using "id"
                            axios.delete('http://localhost:4000/api/bill/' + props.myBills._id)
                                .then((res) => {
                                    // reload bills after deletion
                                    let reload = props.reload();
                                })
                                .catch();
                        }
                    }>Delete</Button>
                </div>
            </div>
        </div>
    );
}
// export BillObjects
export default BillObjects;