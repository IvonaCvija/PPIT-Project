// import bills component
import Bills from "./bills";
//Read component
function Read(){
    //array of bills data
    const data = [
        {
            "name": "Electricity",
            "price": 40,
            "member": "Ivona",
            "status": "Unpaid"
        },
        {
            "name": "Gas",
            "price": 65.5,
            "member": "Mimi",
            "status": "Paid"
        },
        
    ];
    return (
        <div>
            <h1>All bills</h1>
            {/* show combined bills data(myBills(prop)) with bills component */}
            <Bills myBills={data}></Bills>
        </div>
    );
}

export default Read;