// Connection to the MySql server
import * as mysql from "mysql2";
const prompt = require('prompt-sync')();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'CRM',
});

// Console Log Prompts
let answer:string

function startProgram(): void {

    console.log('Welcome to the CRM')
    do {
        answer = prompt('1. View all Customers \n2. Exit ');

        if (answer === '1') {
            connection.query('SELECT * FROM customers', (err, results) => {
                console.log(results);
            });
        }
        
        else if (answer === '2') {
            console.log('exiting ...')
            break
        }
    } while (answer !== "2")
    }

startProgram()
connection.end();