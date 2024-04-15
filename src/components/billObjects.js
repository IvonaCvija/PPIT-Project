function BillObjects(props) {

    return (
        <div>
            <br></br>
            {/* show member */}
            <p>{"Member: " + props.myBills.member}</p>
            {/* show bill's name */}
            <p>{"name: " + props.myBills.name}</p>
             {/* show price  */}
            <h4>{props.myBills.price + "€"}</h4>
            {/* show status(paid/unpaid) */}
            <h4>{props.myBills.status}</h4>
            <br></br>
        </div>
    );
}
// export BillObjects
export default BillObjects;