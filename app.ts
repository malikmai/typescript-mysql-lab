// Connection to the MySql server
import * as mysql from "mysql2";
const prompt = require('prompt-sync')();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cratose@41795',
    database: 'Customers',
});


function startProgram():void{
    console.log("Welcome to the CRM");
    
    while (true) {

        
 
    }  
}

startProgram();

connection.end();