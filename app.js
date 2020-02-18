const express = require('express')
const app = express();
const routes = require('./app/routes/customer.routes');
const mongoose = require('mongoose')

//Connection to the database
// mongoose.connect('mongodb://localhost:27017/mycustomers', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Successfully connected ");
// }).catch(err => {
//     console.log('Could not connect . Exiting now...', err);
//     process.exit();
// })

app.use('/', routes);

const ws_product = require('./app/controllers/ws_customer');


app.listen(process.env.PORT || 3000);
module.exports = app;