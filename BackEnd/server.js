// import modules
const port = 4000;
const express = require('express')
const cors = require('cors');
const app = express()
const mongoose = require('mongoose');

main().catch(err => console.log(err));
// https://www.youtube.com/watch?v=ACUXjXtG8J4
// connectiong to mongoose local database "householdDatabase"
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/householdDatabase');
}

// headers for CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// handling JSON and URL-encoded data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// enable CORS(Cross-Origin Resource Sharing)
app.use(cors());


// Bill schema
const billSchema = new mongoose.Schema({
    name:String,
    price:Number,
    member:String,
    status:String
})

// create bill model based on bill schema(using "bill" table) 
const billModel = mongoose.model("bill", billSchema, "bill")

// app.get('/getBill', async (req, res) => {
//     try {
//         const bills = await billModel.find({});
//         console.log(bills);
//         res.json(bills);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// handle GET request to the root path '/'
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// updating existing data in table "bill" using "id"
app.put('/api/bill/:id', async (req,res)=>{

    console.log("Update: "+req.params.id);

    //await so it changes it only after finding the bill
    let bill = await billModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.send(bill);
})

// handle POST request to '/api/bill'
app.post('/api/bill', (req, res) => {
    // Logging the received data to the console
    console.log(req.body);

    // Sending a response message
    billModel.create({
        name:req.body.name,
        price:req.body.price,
        member:req.body.member,
        status:req.body.status
    })
    .then(() =>{res.send("Bill created")})
    .catch((error) => {
        console.error('Error adding bill:', error);
        res.status(500).send("Bill not created");
    });
})


app.get(`/api/bill/:id`, async (req, res)=>{
    console.log(req.params.id);

    let bill = await billModel.findById({_id:req.params.id})
    res.send(bill);
})

// GET request to '/api/bill'
app.get('/api/bill', async (req, res) => {

    let bill = await billModel.find({});
    res.json(bill);
})

// app.get('bill', (req, res) => {
//     // Mock data for bills
//     const bills = [
//             {
//                 "name": "Electricity",
//                 "price": 40,
//                 "member": "Ivona",
//                 "status": "Unpaid"
//             },
//             {
//                 "name": "Gas",
//                 "price": 65.5,
//                 "member": "Mimi",
//                 "status": "Paid"
//             }        
//         ]

//     // Respond with JSON data
//     res.json({
//         myBills: bills,
//         "Message": "Bla bla",
//         "Disclaimer": "Hello World!"
//     })
// }) 

// start Express app, listen on specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})