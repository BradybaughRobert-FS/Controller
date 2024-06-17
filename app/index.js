const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({message: "API in running", success: true});
});

module.exports = app;