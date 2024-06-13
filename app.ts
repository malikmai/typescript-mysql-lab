// Connection to the MySql server
import * as mysql from "mysql2";
const prompt = require('prompt-sync')();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'CRM',
});

connection.connect(() => {
    console.log(`Conencted to the MySql server`);
});

connection.query('SELECT * FROM customers', (err, results) => {
    console.log(results);
});

connection.end();

import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const answer = prompt ('Whats your name? ');
console.log('Hello' , answer);