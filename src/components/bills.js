import BillObjects from "./billObjects";

function Bills(props){

    return props.myBills.map(
        (bill)=>{
            // show all data from bill objects(find by isbn(prop)) for all bills
            return <BillObjects myBills={bill}  key={BillObjects.isbn}></BillObjects>
        }
    );
}
export default Bills;