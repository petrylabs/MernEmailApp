const express = require('express'); // Common JS Module
//import express from 'express'; //ES2015 modules not supported by node.js

const app = express();

app.get('/', (req, res) => {
    console.log("routing traffic here");
    res.send({ hi: 'there'});
});

const PORT  = process.env.PORT || 5000;
app.listen(PORT);


