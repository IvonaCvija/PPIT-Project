// import modules
const express = require('express')
const app = express()
const port = 4000;
const cors = require('cors');

// enable CORS(Cross-Origin Resource Sharing)
app.use(cors());
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

// handle POST request to '/api/bill'
app.post('/api/bill', (req, res) => {
    // Logging the received data to the console
    console.log(req.body);
    res.send("Data Received!");
    // Sending a response message
})

// handle GET request to the root path '/'
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// GET request to '/api/bills'
app.get('/api/bills', (req, res) => {
    // Mock data for bills
    const bills = [
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
            }        
        ]

    // Respond with JSON data
    res.json({
        myBills: bills,
        "Message": "Bla bla",
        "Disclaimer": "Hello World!"
    })
}) 

// start Express app, listen on specified port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})