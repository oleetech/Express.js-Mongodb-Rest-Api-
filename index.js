// index.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', routes);
app.get("/",(req,res)=>{
    res.send("Library Management Syatem");

});
app.listen(port, () => {
  console.log('Server is running on port ${port}');
});
