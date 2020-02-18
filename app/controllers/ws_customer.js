const Customer = require('../models/customer.model');
const WebSocket = require('ws');
const url = require('url');
const wss = new WebSocket.Server({ port: 4000 });
const mongoose = require('mongoose');
var jdata = "";
var GUIDORBUILIN = "";
var fs = require('fs');
const _ = require('underscore');
filtered_data : [] ;
const PARAMETERS = "Parameters";
const CIRCUITOBJECTS = "CircuitObjects.PatameterObjects";
//var fpath = 'E:/sushil/IMEGCorp/JSON Latest Code/NodeServerWebSocket/app/data/jsdata.json';
var fpath = 'E:/sushil/IMEGCorp/JSON Latest Code/NodeServerWebSocket/app/data/Newjson.json';
var jdata = "";

function getFileData(){
	var file = fs.readFileSync(fpath);
	return JSON.parse(file.toString('utf-8'));	
}

jdata = getFileData();

fs.watchFile(fpath, (event, trigger)=>{
	console.log("file has changed");	
	send(getFileData());
	//getjsonall();
});

wss.on('connection', (ws, req) => {
	console.log("connected on port 4000");

	const pathName = url.parse(req.url).pathname;

	// if (pathName == '/customers') {
	// }
	
	ws.on('message', (data) => {
		console.log("messeage recieved :" + data); // recieve data from client
		_message = JSON.parse(data);
		filtered_data = jdata;

		var mm = _message.route;
		if(mm === "pushers"){
			fs.writeFile('app/data/config.json', data, 'utf8', (err) => {
			//	if (err) throw err;
				console.log('Config written to file');
			});
			console.log('This is after the config write call');
		}else{
			fs.writeFile('app/data/jsdata.json', data, 'utf8', (err) => {
			//	if (err) throw err;
				console.log('Data written to file');
			});
			console.log('This is after the data write call');			
		}
		
		if(pathName == '/pushers' && _message.route == 'pushers' && _message.action == 'getJsonAll'){
			getjsonall();
		}

		if (pathName == '/pushers' && _message.route == 'pushers' && _message.action == 'getParameter') {
			if(_message.GUID != null){
			findbyguid(_message.GUID, jdata.ObjectParameters);
			}else {
				findbyguid(_message.BUILTIN, jdata.ObjectParameters);
			}
		}

		if (pathName == '/pushers' && _message.route == 'pushers' && _message.action == 'getTypeParameter') {
			if(_message.GUID != null){
			findbytypeguid(_message.GUID, jdata.ObjectTypeParameters);
			} else {
			findbytypeguid(_message.BUILTIN, jdata.ObjectTypeParameters);
			}
		}

		if (pathName == '/pushers' && _message.route == 'pushers' && _message.action == 'getCircuitParameter') {
			if(_message.GUID != null){
			_findbyguid(_message.GUID, jdata.ElectricalSystems);
			} else {
			_findbyguid(_message.BUILTIN, jdata.ElectricalSystems);
			}
		}

		if (pathName == '/pushers' && _message.route == 'pushers' && _message.action == 'updateparameter') {
			console.log("update customer call");
			if(_message.GUID != null){
				GUIDORBUILIN = _message.GUID;
				} else {
				GUIDORBUILIN = _message.BUILTIN;
				}
			jdata.ObjectParameters=updateCustomer(GUIDORBUILIN, _message.customer, jdata.ObjectParameters);
			//console.log("update data :" + JSON.stringify(jdata.Parameters));
			updateDataFile(jdata);
			//setTimeout(() =>{
			getjsonall();	
			//},2000)
		}

		if (pathName == '/pushers' && _message.route == 'pushers' && _message.action == 'updatetypeparameter') {
			console.log("update customer call");
			if(_message.GUID != null){
				GUIDORBUILIN = _message.GUID;
				} else {
				GUIDORBUILIN = _message.BUILTIN;
				}
			jdata.ObjectTypeParameters=updateCustomer(GUIDORBUILIN, _message.customer, jdata.ObjectTypeParameters);
			//console.log("update data :" + JSON.stringify(jdata.Parameters));
			updateDataFile(jdata);
			//setTimeout(() =>{
			getjsonall();	
			//},2000)
		}

		if (pathName == '/pushers' && _message.route == 'pushers' && _message.action == 'updatecircuitobject') {
			console.log("update circuit call :" + jdata.ElectricalSystems.length );
			for(var i=0; i<jdata.ElectricalSystems.length; i++){
				if(_message.GUID != null){
					GUIDORBUILIN = _message.GUID;
					} else {
					GUIDORBUILIN = _message.BUILTIN;
					}
				jdata.ElectricalSystems[i].ObjectParameters	=updateCustomer(GUIDORBUILIN, _message.customer, jdata.ElectricalSystems[i].ObjectParameters);
			}
			updateDataFile(jdata);		
			getjsonall();	
		
				
		}
		
	});

	ws.on('close', () => {
		console.log("Total Client size :" + wss.clients.size);
	});


});

function getjsonall(){
	send(getFileData());	
	//jdata = require('../data/jsdata.json');
	//send(jdata);
}


function findbyguid(GUID, _list){	
	jdata = require('../data/jsdata.json');
	guidata = _list.filter(data =>{
		if(data.GUID === GUID) {
			return data;
		} 
	});
	console.log("Parameter Filter data :" + guidata);
	send(guidata);	
}

function _findbyguid(GUID, _list){	
///	jdata = require('../data/jsdata.json');
	for(var i=0; i<_list.length; i++){
	guidata = _list[i].PatameterObjects.filter(data =>{
			if(data.GUID === GUID) {
				return data;				
			} 			
		}); 
	}	
	console.log("Circuit Filter data :" + JSON.stringify(guidata));
	send(guidata);	
}

function updateCustomer(id, parameter, _list){
	//console.log("List :" + JSON.stringify(_list));
 	 _list.forEach(function(_parameter, index){
		//   console.log("Result 1 :" + _parameter.GUID);
		//   console.log("Result 2 :" + parameter.GUID);
		//   console.log("Result 3 :" + parameter.GUID === _parameter.GUID);
		if(_parameter.BUILTIN === parameter.BUILTIN ){
			//console.log("Data match :" + parameter.ValueString);
			this[index] = parameter;			
		}else if(_parameter.GUID === parameter.GUID ){
			this[index] = parameter;	
		}
	}, _list);
	
	return _list;

}

function updateDataFile(data){
	//console.log(data);
	fs.writeFileSync(fpath, JSON.stringify(data), 'utf8', (err) => {
		if (err) {
			console.log(err);
			throw err
		};
		//console.log('Data1 written to file');
	});
}

function getall() {
	Customer.find().exec()
		.then(docs => {
			send(docs);
		})
		.catch(error => {
			send(error);
		});
}

function findbyid(id) {
	console.log("Id :" + id);
	Customer.findById(id).exec()
		.then(docs => {
			send(docs);
		})
		.catch(error => {
			send(error);
		});

}

function addproduct(customer) {
	customer = new Customer({
		_id: new mongoose.Types.ObjectId(),
		FirstName: _message.customer.FirstName,
		LastName: _message.customer.LastName
	})
	customer.save()
		.then(docs => {
			let message = { "message": "Customer added successfully!" }
			send(message);
			getall();

		})
		.catch(error => {
			send(error);
		});

}

function deletebyid(id) {
	Customer.remove({ _id: id }).exec()
		.then(docs => {
			message = "customer not found";
			console.log(docs);
			if (docs.deletedCount > 0) {
				message = { "message": "Customer delete successfully!" };
			}
			send(message);
			getall();
		})
		.catch(error => {
			send(error);
		});

}

// function updateCustomer(id, customer) {
// 	Customer.findByIdAndUpdate(id, customer, { new: true })
// 		.then(customer => {
// 			if (!customer) {
// 				let message = { message: "Customer not found with id " + id }
// 				send(message);
// 			}
// 			getall();
// 		}).catch(err => {
// 			send(err);
// 		});
// }

function send(data) {
	wss.clients.forEach(function each(client) {
		client.send(JSON.stringify(data));
	});
}