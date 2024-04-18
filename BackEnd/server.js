// import modules
const port = 4000;
const express = require('express')
const cors = require('cors');
const app = express()
const mongoose = require('mongoose');

// call the main function to connect to MongoDB
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
    name: String,
    price: Number,
    member: String,
    status: String,
    householdCode: String
})

// Household schema
const householdSchema = new mongoose.Schema({
    householdCode: String,
    eircode: String
})

// create bill model based on bill schema(using "bill" table) 
const billModel = mongoose.model("bill", billSchema, "bill")
// create household model based on household schema(using "household" table) 
const householdModel = mongoose.model("household", householdSchema, "household")

// // handle GET request to the root path '/'
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// updating existing data in table "bill" using "id" (UPDATING BILL)
app.put('/api/bill/:id', async (req, res) => {

    console.log("Update: " + req.params.id);

    // await so it changes it only after finding the bill
    let bill = await billModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(bill);
})

// deleting existing data in table "bill" using "id" (DELETING BILL)
app.delete('/api/bill/:id', async (req, res) => {
    console.log("Delete: " + req.params.id)

    // find and delete bill using "id"
    let bill = await billModel.findByIdAndDelete(req.params.id);
    res.send(bill);
})

// handle POST request to '/api/bill' (CREATING BILL)
app.post('/api/bill', (req, res) => {
    // Logging the received data to the console
    console.log(req.body);

    // Sending a response message
    billModel.create({
        name: req.body.name,
        price: req.body.price,
        member: req.body.member,
        status: req.body.status,
        householdCode: req.body.householdCode
    })
        .then(() => { res.send("Bill created") })
        .catch((error) => {
            console.error("Error adding bill:", error);
            res.status(500).send("Bill not created");
        });
})

// handle POST request to '/api/household' (CREATING UNIQUE HOUSEHOLD)
app.post('/api/household', async (req, res) => {
    const { householdCode, eircode } = req.body;

    try { // checking if the householdCode or eircode already exists https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
        const existingHousehold = await householdModel.findOne({
            $or: [{ householdCode }, { eircode }]
        });

        if (existingHousehold) { // send error message if they are not unique
            return res.status(400).send("Household code or eircode already exists.");
        }

        // if values are unique, create new household 
        const newHousehold = new householdModel({ householdCode, eircode });
        await newHousehold.save();
        res.send("Household created successfully");

    } catch (error) {
        console.error("Error adding household:", error);
        res.status(500).send("Household not created");
    }
});


app.get(`/api/bill/:id`, async (req, res) => {
    console.log(req.params.id);

    let bill = await billModel.findById({ _id: req.params.id })
    res.send(bill);
})

// GET request to '/api/bill' get bills for specific member
// app.get('/api/bill', async (req, res) => {
//     const memberName = req.query.member; // get member name from query
//     let query = {};
//     if (memberName) {
//         query.member = memberName; // find by member
//     }

//     // fetch bills based on the constructed query
//     let bills = await billModel.find(query); 
//     res.json(bills);
// })

// get bills
app.get('/api/bill', async (req, res) => {

    let bill = await billModel.find({});
    res.json(bill);
})

// start Express app, listen on specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})