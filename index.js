const express = require('express');
const cors = require("cors");

const app = express();
const PORT = 3042; // Change this to the desired port number

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

const contractsHistory = [];

app.post('/contracts', (req, res) => {
    const { address, arbiter, beneficiary, value} = req.body; 
    contractsHistory.push({
        address,
        arbiter,
        beneficiary,
        value,
    });
    res.json({ contractsHistory });
    console.log(contractsHistory);
});

app.get('/history', async (req, res) => {
    res.json(contractsHistory); 
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
