import * as mysql from "mysql2";
const prompt = require("prompt-sync")();

// Set up the MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cratose@41795",
  database: "Customers",
});

// Function to view all customers
const viewAllCustomers = async () => {
    //Promise = It is an object representing the eventual completion or failure of an async operation
    //NOTE: We are fetching data from our Database, so these operations are asynchronous --> We can use the "new Promise" constructor to handle the fetching operation: 1.The new Promise() construcotr takes in a single function as an argument and that function is called the "executor function" - The executor function has two parameters (resolve, reject) --> Which are themselves functions and used to control the outcome of the Promise, 2.Inside the executor function we run the async operation (fetching data from database) and check for any errors using the reject() function to be called if INDEED there is an error - AND handling a successful query with the resolve() function since the err object will be null 3.We pass the "results" of the query to the resolve() function to fulfill the promise 4.When we INVOKE this async function, we MUST use the "await" keyword
    return new Promise((resolve, reject)=>{
        connection.query("SELECT * FROM customers", (err, results, fields) => {
            if(err){
                console.error(`Error in fetching custoemrs: ${err}`);
                return reject(err);
            }
            console.log("Here is the list of customers:", results);
            resolve(results); //If query is successfull, we pass the "results" parameter holding the ACTUAL results of the query to the resolve() function to fulfill the promise
          });
    });
};

// Function to Create
const createCustomer = async () => {
    const firstName: string = prompt('Enter first name. ');
    const lastName:  string= prompt('Enter last name. ');
    const age: string = prompt('Enter age. ');
    const sql: string = 'INSERT INTO customers (first_name, last_name, age) VALUES (?, ?, ?)';
    const values: string []= [firstName, lastName, age];

    return new Promise((resolve, reject)=>{
        connection.query(sql, values, (err, results, fields) => {
            if(err){
                console.error('Error in adding new customer:', err);
                return reject(err);
            }
            console.log(`New customer added successfully:`);
            resolve(results);
        });       
    });
};

// Function to Update
const updateCustomer = async () => {
  const id: string= prompt('Enter the customer ID to edit: ');
  const firstName: string= prompt('Enter new first name: ');
  const lastName : string = prompt('Enter new last name: ');
  const age :string = prompt('Enter new age: ');
  const sql:string='UPDATE customers SET first_name = ?, last_name = ?, age = ? WHERE id = ?';
  const values:string[] = [firstName, lastName, age, id];

  return new Promise((resolve, reject)=>{
    connection.query(sql, values, (err, results, fields) => {
        if(err){
            console.error('Error updating customer:', err);
            return reject(err);
        }
        console.log('Customer updated successfully:');
        resolve(results);
    });  
  });
};


// Function to Delete
const deleteCustomer = async () => {
  const id:string=prompt('Enter the ID of the customer you want to delete: ');
  const sql:string='DELETE FROM customers WHERE id = ?';

  return new Promise((resolve, reject)=>{
    connection.query(sql, [id], (err, results, fields) => {
        if(err){
            console.error('Error in deleting customer:', err);
            return reject(err);
        }
        console.log('Customer deleted successfully:');
        resolve(results);
    });      
  });
};


// Main function to handle user input
const main = async () => {
    while (true) {
        console.log('Welcome to your CRM');
        console.log('1. View all customers');
        console.log('2. Create Customer')
        console.log('3. Update Customer')
        console.log('4. Delete Customer')
        console.log('5. Exit');

        const choice : string = prompt("Please enter your choice: ");

        try{
            switch (choice) {
                case '1':
                    await viewAllCustomers();
                    break;
                case '2':
                    await createCustomer();
                    break
                case '3':
                    await updateCustomer();
                    break
                case '4':
                    await deleteCustomer();
                    break
                case '5':
                    console.log('Exiting...');
                    connection.end();
                    return;
                default:
                    console.log('Invalid choice. Please try again.');
                    break;
            }       
        }catch(error){
            console.error(`Error has occured: ${error}`)
        }        
    }
};

main();
