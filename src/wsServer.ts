const WebSocket = require('ws')
const fetchQuery = require("node-fetch");
const uuidv4 = require('uuid/v4');

var jwtDecode = require('jwt-decode');

let PORT = process.env.PORT || "4002";
let HOST = process.env.HOST || "http://localhost";

let wss;
let logInputFilename = "wsserver-input.json";
let logOutputFilename = "wsserver-output.json";
var revitJsonObjs: { email: string, RevitWsSessionId: string, obj: any }[] = [];
import { JsonHelper, Options } from "./components/utils/JsonHelper";

//let envvar = new envVar();

function noop() { }

function heartbeat() {
    //Logger.log("Heartbeat.");
    this.isAlive = true;
}

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) { return ws.terminate(); }
        ws.isAlive = false;
        ws.ping(noop);
    });
}, 30000);



export default class WsServer {
    noop() { }

    
    start(port) {
        wss = new WebSocket.Server({
            port,
            perMessageDeflate: {
                clientNoContextTakeover: true, // Defaults to negotiated value.
                serverNoContextTakeover: true, // Defaults to negotiated value.
            },

        });

        function tokenDecode(token){
           // var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFMVE16YWtpaGlSbGFfOHoyQkVKVlhlV01xbyJ9.eyJ2ZXIiOiIyLjAiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkL3YyLjAiLCJzdWIiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFKZjB4dXMxdk5ESUcwM0xhYTd4eElVIiwiYXVkIjoiNGExYWExZDUtYzU2Ny00OWQwLWFkMGItY2Q5NTdhNDdmODQyIiwiZXhwIjoxNTgxNjA0MDk1LCJpYXQiOjE1ODE1MTczOTUsIm5iZiI6MTU4MTUxNzM5NSwibmFtZSI6InBhd2FuIGt1bWFyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoicGF3YW5rNUBvdXRsb29rLmNvbSIsIm9pZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC1mZmNhLTE5ZmVjOWQ1Mzg2YiIsInRpZCI6IjkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImFpbyI6IkRlV0ltU25DaWFlUW1TYWl2cFV5VlpWSTU3em1HY05oS0E4dldjYnJWZmRxQjhEYlBsTTJKR0t0SFFFVWRQbCowQjNmeXVPbDB0Qm1PWWYzajA3UE5qZVpvZ05OYlpXWWU2TDNlWFZkR3JwMUVkZksyMFRHUHAwQjRURXcyS3B0b3RFWGxSME81MmJVWG5INDk4UEdYR00kIn0.wgwGIB_-wxCDNKJoD3yRGhXBpCSvUPz3ct8kAuFk9paRxQnNVYJgz5C5epBMmt2Q5SGwAK9O2395NXVSI1ZEJ0bp2EpxhyCVGt5fvAFh_NAKG57cc2ci_sK3Oo5HvR7WZvvMuwIRuL8vfF4ahBjrUlrNuM-O5WnsU5uyhsAilFIhItaIQNK9qBC1uABek6Y0U1Gu4Q5tsneKxtu2doraSJY0zczCI6oCHULPeyVACSGr3VhWtfUaQx6K-9TFWiIfBwismMQPFBq1iEoJzeKKrUeYv_Sfd5i_Oez2WihUleGoG3kuUL97X9kcSDI8FqDQxJEBUJCiCyxps91fjKgKGg'; 
            var decoded = jwtDecode(token);
            console.log("Token :" + JSON.stringify(decoded));
        }

        wss.on("connection", function connection(ws) {
            console.log("Connection/Message with client at " + ws._socket.remoteAddress);
           // tokenDecode();
            ws.id = uuidv4();

            let client = ws;
            ws.isAlive = true;
            ws.ping(noop);
            ws.on("message", async function incoming(bufferOne) {

                let jsonHelper = new JsonHelper();                
                jsonHelper.init(bufferOne);
               // console.log("JSON :" + JSON.stringify(jsonHelper));
                var opt: Options = jsonHelper.getOptions();
                if (opt.Action == "setEmail") {
                    ws.userEmailRevit = opt.Value;
                }

                if (opt.Action == "setEmailWebClient") {
                    ws.userEmailWebClient = opt.Value;
                }

                if(opt.Action == "token"){
                    console.log("Token :" + JSON.stringify(jsonHelper.obj));
                    tokenDecode(jsonHelper.obj.Token);
                }

                if (opt.Action == "getJsonAll") {
                    actionSendRevitJsonObj(ws);
                    
                }
                if (opt.Action == "setParameter" && opt.RevitWsSessionId != null) {
                    var actionWs;
                    if (ws.id === opt.RevitWsSessionId) {
                        actionWs = getRandomOtherClientId(ws.id);
                    } else {
                        actionWs = getClientById(opt.RevitWsSessionId)
                    }
                    if (actionWs != null) {
                        let arrayAction = [opt];
                        actionWs.send(JSON.stringify(arrayAction));
                    }
                }
                if (opt.Action == "clearRevitSelection" ) {
                    if (ws.userEmailRevit != null && ws.userEmailRevit != "") {
                        let success = clearRevitJsonObj(revitJsonObjs,ws);
                        if(success){
                            updateAssociatedWebClients(ws.userEmailRevit);
                        }
                    }
                }
                if ((opt.Action == null || opt.Action == "") &&  jsonHelper.obj != null) {
                    var revitObj = jsonHelper.obj;
                    let success = actionRevitSetJsonObj(revitObj,revitJsonObjs,ws);
                    if(success){
                        updateAssociatedWebClients(ws.userEmailRevit);
                    }
                }

            });

            ws.on("error", function connection() {
                console.log("Connection Error with client at " + ws._socket.remoteAddress);
            });

            ws.on("close", function () {
                console.log("Connection Closed with client at " + ws._socket.remoteAddress);
            });

            ws.on("open", function () {
                console.log("Connection Opened:" + Date.now());
            });
            ws.on('pong', heartbeat);
        });

        function actionRevitSetJsonObj(revitObj,_revitJsonObjs,ws):boolean {
            var success:boolean;
            if (ws.userEmailRevit != null && ws.userEmailRevit != "") {
                success=true;
                //Checks to see if object as already been set for revit session.
                let update:boolean = hasRevitJsonObj(_revitJsonObjs,ws)
                if(update){
                    updateRevitJsonObj(revitObj,_revitJsonObjs,ws);
                }
                else {
                    addNewRevitJsonObjs(revitObj,_revitJsonObjs,ws);
                }
            } else {
                success=false;
                ws.send(`[{"action":"displayMessage","value":"Email Not Set for web GUI. Contact Administrator."}]`);
            }
            return success;
        }

        function updateAssociatedWebClients(email){
            let matchingWebClientsWS = getWebClientSessionIdsByEmail(email);
            matchingWebClientsWS.forEach(function (WebClientWS) {
                actionSendRevitJsonObj(WebClientWS);
            });
        }

        function addNewRevitJsonObjs(revitObj,_revitJsonObjs,ws){
            addSessionIdToRevitJsonObjs(revitObj,ws);
            _revitJsonObjs.push({ email: ws.userEmailRevit, RevitWsSessionId: ws.id, obj: revitObj });
        }

        function updateRevitJsonObj(revitObj,_revitJsonObjs,ws){
            addSessionIdToRevitJsonObjs(revitObj,ws);
            let revitJsonObj = getRevitJsonObj(_revitJsonObjs,ws);
            if(revitJsonObj!=null){
                revitJsonObj.obj = revitObj;
                revitJsonObj.RevitWsSessionId = ws.id;
            }
        }

        function addSessionIdToRevitJsonObjs(revitObj,ws){
            revitObj.forEach(function (obj) {
                obj.RevitWsSessionId = ws.id;
            });
        }

        function clearRevitJsonObj(_revitJsonObjs,ws):boolean{
            var success:boolean;
            let revitJsonObj = getRevitJsonObj(_revitJsonObjs,ws);
            if(revitJsonObj!=null){
                success=true;
                revitJsonObj.obj = {};
                revitJsonObj.RevitWsSessionId = ws.id;
            }else{
                success=false;
            }
            return success;
        }

        function getRevitJsonObj(_revitJsonObjs,ws):any{
            let revitJsonObjMatch;
            _revitJsonObjs.forEach(function (revitJsonObj) {
                if (revitJsonObj.email == ws.userEmailRevit) {
                    revitJsonObjMatch=revitJsonObj;
                }
            });
            return revitJsonObjMatch;
        }

        function hasRevitJsonObj(_revitJsonObjs,ws): boolean{
            let found: boolean = false;
            _revitJsonObjs.forEach(function (revitJSONObj) {
                if (revitJSONObj.email == ws.userEmailRevit) {
                    found = true;
                }
            });
            return found;
        }

        function actionSendRevitJsonObj(ws) {
            if (revitJsonObjs.length > 0) {
                let revitObj = findRevitJsonObjByEmail(ws.userEmailWebClient);
                if (revitObj != null) {
                    //Should send compress data
                    ws.send(JSON.stringify(revitObj));
                }
            }
        }

        function findRevitJsonObjByEmail(email: string):any {
            var objFound;
            revitJsonObjs.forEach(element => {
                if (element.email == email) {
                    objFound = element.obj;
                }
            });
            return objFound;
        }

        function getRandomOtherClientId(id) {
            var wsClient;
            wss.clients.forEach(function each(ws) {
                if (ws.id != id) {
                    wsClient = ws;
                }
            });
            return wsClient;
        }

        function getWebClientSessionIdsByEmail(email):any[] {
            var wsClient=[];
            wss.clients.forEach(function each(ws) {
                if (ws.userEmailWebClient == email) {
                    wsClient.push(ws);
                }
            });
            return wsClient;
        }

        function getClientById(id) {
            var wsClient;
            wss.clients.forEach(function each(ws) {
                if (ws.id == id) {
                    wsClient = ws;
                }
            });
            return wsClient;
        }
    }

    close() {
        wss.close(() => {

        });
    }



    static async fetchStatic(url) {
        return await fetchQuery(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    }
}