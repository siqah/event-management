import pool from '../models/db.js';

// Helper to query the database
const queryDb = async (query, params) =>{
    const event = await pool.connect();
    try{
        const result = await event.query(query, params);
        return result.rows;
    }finally{
        event.release();
    }
};

// Create Event
export const createEvent = async (req, res) => {
    const { title, date, location, description, tickets_Available, creator_Name, price } = req.body;

    if (!title || !date || !location || !description || !tickets_Available || !creator_Name || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = 'INSERT INTO events (title, date, location, description, tickets_Available, creator_Name, price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const event = await queryDb(query, [title, date, location, description, tickets_Available, creator_Name, price]);
        res.status(201).json(event[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

// Get All Events
export const getAllEvents = async (req, res) => {
    try {
        const events = await queryDb('SELECT id, title, date, location, description, tickets_available, creator_name, price FROM events', []);
        res.status(200).json(events);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get Event by ID
export const getEventById = async (req, res) => {
    const { id } = req.params;
    try{
        const event = await queryDb('SELECT id, title, date, location, description, tickets_Available, creator_Name, price FROM events WHERE id = $1', [id]);
        if (event.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event[0]);
     }catch(error){
        res.status(500).json({ error: error.message});
     }
}

// Update Event
export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, date, location, description, tickets_Available, price } = req.body;

    if (!title || !date || !location || !description || !tickets_available || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try{
        const event = await queryDb('SELECT id FROM events WHERE id = $1', [id]);
        if (event.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const query = 'UPDATE events SET title = $1, date = $2, location = $3, description = $4, tickets_available = $5, price = $6 WHERE id = $7 RETURNING *';
        const updatedEvent = await queryDb(query, [title, date, location, description, tickets_Available, price, id]);
        res.status(200).json(updatedEvent[0]);
    }catch(error){
        res.status(500).json({ error: error.message});
    }
}

// Delete Event
export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try{
        const event = await queryDb('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
        if (event.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    }catch(error){
        res.status(500).json({ error: error.message});
    }
}
