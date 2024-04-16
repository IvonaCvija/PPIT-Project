//importing CardBody and Card from react-bootstrap
import { CardBody } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

function BillObjects(props) {

    return (
        <div>
            <Card key={props.myBills._id}>
                {/* show member */}
                <Card.Header>{"Member: " + props.myBills.member}</Card.Header>
                <CardBody>
                    {/* show bill's name */}
                <p>{"name: " + props.myBills.name}</p>
                {/* show price  */}
                <h4>{props.myBills.price + "€"}</h4>
                {/* show status(paid/unpaid) */}
                <h4>{props.myBills.status}</h4>
                </CardBody>
                {/* button Update Bill */}
                <Link to={'/updateBill/'+props.myBills._id} className='btn btn-primary'>Update Bill</Link>
            </Card>
            
            {/* <br></br> */}
            {/* show member */}
            {/* <p>{"Member: " + props.myBills.member}</p> */}
            {/* show bill's name */}
            {/* <p>{"name: " + props.myBills.name}</p> */}
             {/* show price  */}
            {/* <h4>{props.myBills.price + "€"}</h4> */}
            {/* show status(paid/unpaid) */}
            {/* <h4>{props.myBills.status}</h4> */}
            {/* <br></br> */}
        </div>
    );
}
// export BillObjects
export default BillObjects;