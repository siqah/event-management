import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const pool = new pg.Pool({

    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export default pool;

// Test the connection
pool.connect()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Error connecting to the database:', err));

// Function to create tables
const createTables = async () => {
    try {
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(100) DEFAULT 'user' NOT NULL CHECK( LOWER(role) IN ('user', 'admin'))
            )`;

        const createEventsTable = `
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                description TEXT NOT NULL,
                location VARCHAR(100) NOT NULL,
                date DATE NOT NULL,
                tickets_available INT NOT NULL,
                price INT NOT NULL,
                creator_name VARCHAR(100) NOT NULL
            )`;

        const createBookingsTable = `
            CREATE TABLE IF NOT EXISTS bookings (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
                tickets_booked INT NOT NULL
            )`;

        await pool.query(createUsersTable)
        await pool.query(createEventsTable)
        await pool.query(createBookingsTable)

        console.log('Tables created successfully');
    } catch (err) {
        console.error('Error creating tables:', err);
    } 
};

createTables();
