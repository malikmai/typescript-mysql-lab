"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Connection to the MySql server
var mysql = require("mysql2");
var prompt = require('prompt-sync')();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'CRM',
});
// Console Log Prompts
var answer;
function startProgram() {
    console.log('Welcome to the CRM');
    do {
        answer = prompt('1. View all Customers \n2. Exit ');
        if (answer === '1') {
            connection.query('SELECT * FROM customers', function (err, results) {
                console.log(results);
            });
        }
        else if (answer === '2') {
            console.log('exiting ...');
            break;
        }
    } while (answer !== "2");
}
startProgram();
connection.end();
