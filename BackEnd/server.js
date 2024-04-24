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
})
// handling JSON and URL-encoded data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// enable CORS(Cross-Origin Resource Sharing)
app.use(cors());

//SCHEMAS
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

// Account schema
const accountSchema = new mongoose.Schema({
    fName: String,
    phoneNumber: String,
    password: String,
    householdCode: String
})

//MODELS BASED ON SCHEMAS
// create bill model based on bill schema(using "bill" table) 
const billModel = mongoose.model("bill", billSchema, "bill")
// create household model based on household schema(using "household" table) 
const householdModel = mongoose.model("household", householdSchema, "household")
// create account model based on account schema(using "account" table) 
const accountModel = mongoose.model("account", accountSchema, "account")


// handle PUT request to '/api/bill/:id' (UPDATING BILL BY USING ID)
app.put('/api/bill/:id', async (req, res) => {
    console.log("Update: " + req.params.id);

    // await so it changes it only after finding the bill
    let bill = await billModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(bill);
})

// handle DELETE request to '/api/bill/:id' (DELETING BILL BY USING ID)
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

// handle POST request to '/api/household' (CREATING UNIQUE HOUSEHOLD(checking householdCode and eircode))
app.post('/api/household', async (req, res) => {
    const { householdCode, eircode } = req.body;

    try { // checking if householdCode or eircode already exist https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
        const existingHousehold = await householdModel.findOne({
            $or: [{ householdCode }, { eircode }]
        });

        if (existingHousehold) { // send error message if they are not unique
            return res.status(400).send("Household code or eircode already exists. Please enter valid household code and eircode.");
        }

        // if values are unique, create new household 
        const newHousehold = new householdModel({ householdCode, eircode });
        await newHousehold.save();
        res.send("Household created successfully");

    } catch (error) {
        console.error("Error adding household:", error);
        res.status(500).send("Household not created");
    }
})

// handle POST request to '/api/bill' (CREATING UNIQUE ACCOUNT(checking phoneNumber))
app.post('/api/account', async (req, res) => {
    const { fName, phoneNumber, password, householdCode } = req.body;

    try {
        // check if phoneNumber already exists
        const existingAccount = await accountModel.findOne({ phoneNumber });

        if (existingAccount) { // Send error message if phoneNumber is not unique
            return res.status(400).send("Phone number already exists. Please enter valid phone number.");
        }

        // check if householdCode exists in the household collection using value of householdCode from householdModel
        const existingHousehold = await householdModel.findOne({ householdCode });
        if (!existingHousehold) { 
            return res.status(400).send("Household with that code does not exist. Please enter valid household code.");
        }

        // if phoneNumber is unique and householdCode exists, create new account
        const newAccount = new accountModel({ fName, phoneNumber, password, householdCode });
        await newAccount.save();
        res.send("Account created successfully");

    } catch (error) {
        console.error("Error adding account:", error);
        res.status(500).send("Account not created");
    }
})

// handle GET request to '/api/bill/:id' (FINDING BILL BASED ON ID)
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

// handle POST for login (CONFIRM DETAILS AND PASSWORD)
app.post('/api/login', async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        // look for account that matches the phoneNumber
        const account = await accountModel.findOne({ phoneNumber });

        // check if account exists and password matches
        if (!account || account.password !== password) {
            res.status(401).send('Wrong credentials. Please try again.');
            return;
        }

        // successful login, return householdCode from this account(send to frontend)
        res.status(200).json({
            message: 'Login successful',
            householdCode: account.householdCode // return householdCode value from database
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send('Internal server error');
    }
});

// handle GET request to '/api/bill' (FINDING ALL BILLS)
app.get('/api/bill', async (req, res) => {

    let bill = await billModel.find({});
    res.json(bill);
})

// // handle GET request to '/api/account' (FINDING ALL ACCOUNTS)
// app.get('/api/account', async (req, res) => {

//     let account = await accountModel.find({});
//     res.json(account);
// })

// handle GET request to '/api/account' (FINDING ALL ACCOUNTS WITH CERTAIN HOUSEHOLD CODE)
app.get('/api/account', async (req, res) => {
    const householdCode = req.query.householdCode;

    try {
        let accounts;
        if (householdCode) {
            // find all accounts with specific householdCode
            accounts = await accountModel.find({ householdCode });
        } else {
            // find all accounts if no householdCode is specified
            accounts = await accountModel.find({});
        }
        res.json(accounts);
    } catch (error) {
        console.error("Error getting accounts:", error);
        res.status(500).send("Failed to get accounts");
    }
});

// start Express app, listen on specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})