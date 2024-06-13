import * as mysql from "mysql2";
const prompt = require('prompt-sync')();

// Set up the MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cratose@41795',
    database: 'Customers',
});

// Function to view all customers
const viewAllCustomers = () => {
    connection.query('SELECT * FROM customers', (err, results, fields) => {
        console.log('Query results:', results);
    });
};

const createCustomer = () => {
    const firstName = prompt("Name?: ")
    const lastName = prompt("Last Name?: ")
    const age = prompt("Age?: ")
    connection.query(`INSERT INTO customers (first_name, last_name, age) VALUES (${firstName}, ${lastName}, ${age})`, (err, results)=>{
        console.log("customer created");
    })
}

// Main function to handle user input
const main = () => {
    console.log('Welcome to your CRM');
    console.log('1. View all customers');
    console.log('2. Exit');
    console.log('3. Create')

    const choice = prompt('Please enter your choice: ');

    switch (choice) {
        case '1':
            viewAllCustomers();
            break;
        case '2':
            console.log('Exiting...');
            connection.end();
            break;
        case '3':
            createCustomer();
            console.log
        default:
            console.log('Invalid choice. Exiting...');
            connection.end();
            break;
    }
};

main();


connection.end();
