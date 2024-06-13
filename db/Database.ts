//Database Connection
import * as mysql2 from "mysql2/promise";

class Database {
    private host: string;
    private user: string;
    private database: string;
    private connection: mysql2.Connection | null;

    constructor(host: string, user: string, database: string) {
        this.host = host;
        this.user = user;
        this.database = database;
        this.connection = null;
    }
    // (https://stackoverflow.com/questions/38744159/in-typescript-how-to-define-type-of-async-function)

    async connect(): Promise<void> {
        this.connection = await mysql2.createConnection({
            host: this.host,
            user: this.user,
            database: this.database
        });
        console.log(`Connected to the MySQL server`);
    }

    async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.end();
            console.log(`Disconnected from the MySQL server`);
        }
    }

    getConnection(): mysql2.Connection | null {
        return this.connection;
    }
}

export default Database;