function BillObjects(props) {

    return (
        <div>
            {/* show bill's name */}
            <h1>{props.myBills.name}</h1>
             {/* show price  */}
            <h2>{props.myBills.price}</h2>
            {/* show member */}
            <p>{props.myBills.member}</p>
            {/* show status(paid/unpaid) */}
            <h2>{props.myBills.status}</h2>
        </div>
    );
}
// export BillObjects -->
export default BillObjects;