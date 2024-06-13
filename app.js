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
connection.connect(function () {
    console.log("Conencted to the MySql server");
});
connection.query('SELECT * FROM customers', function (err, results) {
    console.log(results);
});
connection.end();
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var answer = prompt('Whats your name? ');
console.log('Hello', answer);
