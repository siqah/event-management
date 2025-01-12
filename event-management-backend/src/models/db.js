import pg from 'pg';



const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'event_manager',
    password: 'postgres', // Replace with your actual password
    port: 5432,
    
});

export default pool; 

//Test the connect
pool.connect()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Error connecting to the database:', err));
    
// Close the pool when the application exits
process.on('exit', () => {
    pool.end(() => {
        console.log('Pool has ended');
    });
});