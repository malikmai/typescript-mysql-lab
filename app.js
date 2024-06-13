"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql2");
var prompt = require('prompt-sync')();
// Set up the MySQL connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'CRM',
});
// Function to view all customers
var viewAllCustomers = function () {
    connection.query('SELECT * FROM customers', function (err, results, fields) {
        console.log('Query results:', results);
        connection.end();
    });
};
// Main function to handle user input
var main = function () {
    console.log('Welcome to your CRM');
    console.log('1. View all customers');
    console.log('2. Exit');
    var choice = prompt('Please enter your choice: ');
    switch (choice) {
        case '1':
            viewAllCustomers();
            break;
        case '2':
            console.log('Exiting...');
            connection.end();
            break;
        default:
            console.log('Invalid choice. Exiting...');
            connection.end();
            break;
    }
};
// Connect to the MySQL database
connection.connect(function () {
    console.log('Connected to the database');
    main();
});
