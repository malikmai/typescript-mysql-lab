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
// Function to Create
var createCustomer = function () {
    var firstName = prompt('Enter first name. ');
    var lastName = prompt('Enter last name. ');
    var age = prompt('Enter age. ');
    var sql = 'INSERT INTO customers (first_name, last_name, age) VALUES (?, ?, ?)';
    var values = [firstName, lastName, age];
    connection.query(sql, values, function (err, results, fields) {
        if (err) {
            console.error('Error inserting customer:', err);
            return;
        }
        console.log('Customer inserted successfully:', results);
        connection.end();
    });
};
// Function to Edit
// Function to Update
// Function to Delete
// Main function to handle user input
var main = function () {
    console.log('Welcome to your CRM');
    console.log('1. View all customers');
    console.log('2. Create Customer');
    console.log('3. Exit');
    var choice = prompt('Please enter your choice: ');
    switch (choice) {
        case '1':
            viewAllCustomers();
            break;
        case '2':
            createCustomer();
            console.log('Customer Created');
            break;
        case '3':
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
