const Customer = require('../models/customer.model.js');

// exports.customer_get = (req, res, next)=>{
// 	//res.status(200).json(product);
// 	product.find().select('FirstName LastName').exec().then(docs=>{
// 		res.status(200).json(docs.map(doc=>{
// 			return {
// 				name: doc.name,
// 				price: doc.price
// 			}
// 		}));
// 	}).catch(error=>{
// 		res.status(500).json(error);
// 	});
// };

// // Create and Save a new Customer
// exports.create = (req, res) => {

//     // Create a Customer
//     const customer = new Customer({
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName
//     });

//     // Save Customer in the database
//     customer.save()
//         .then(data => {
//             res.send(data);            
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the Customer."
//             });
//         });
// };

// // Retrieve and return all customers from the database.
// exports.findAll = (req, res) => {
//     Customer.find()
//         .then(customers => {
//             res.send(customers);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving customers."
//             });
//         });
// };

// // Find a single customer with customerId
// exports.findOne = (req, res) => {
//     Customer.findById(req.params.customerId)
//         .then(customers => {
//             if (!customers) {
//                 return res.status(404).send({
//                     message: "Customer not found with id " + req.params.customerId
//                 });
//             }
//             res.send(customers);

//         }).catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "Customer not found with id " + req.params.customerId
//                 });
//             }

//             return res.status(500).send({
//                 message: "Error retrieving customer with id " + req.params.customerId
//             });
//         });
// };

// // Update a customer identified by the customerId in the request
// exports.update = (req, res) => {

//     // Find customer and update it with the request body
//     Customer.findByIdAndUpdate(req.params.customerId, {
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName
//     },{new: true})
//     .then(customer => {
//         if(!customer) {
//             return res.status(404).send({
//                 message: "Customer not found with id " + req.params.customerId
//             });
//         }
//         res.send(customer);
//     }).catch(err => {
//         if(err.kind === "ObjectId") {
//             return res.status(404).send({
//                 message: "Customer not found with id " + req.params.customerId
//             });
//         }
//         return res.status(500).send({
//             message: "Error updating customer with id " + req.params.customerId
//         });
//     });
// };

// // Delete a customer with the specified customerId in the request
// exports.delete = (req, res) => {
//     Customer.findByIdAndRemove(req.params.customerId)
//     .then(customer => {
//         if(!customer) {
//             return res.status(404).send({
//                 message: "Customer not found with id " + req.params.customerId
//             });
//         }
//         res.send({
//             message: "Customer deleted successfully"
//         });
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Customer not found with id " + req.params.customerId
//             });
//         }
//         return res.status(500).send({
//             message: "Could not delete customer with id " + req.params.customerId
//         });
//     });
// };