import pool from '../models/db.js';
import dotenv from 'dotenv';

dotenv.config();

// Helper to query the database
const queryDb = async (query, params) => {
    const booking = await pool.connect();
    try {
        const result = await booking.query(query, params);
        return result.rows;
    } finally {
        booking.release();
    }
}

// Create Booking
export const createBooking = async (req, res) => {
    const { event_id, user_id, tickets_booked } = req.body;

    if (!event_id || !user_id || !tickets_booked) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = 'INSERT INTO bookings (event_id, user_id, tickets_booked) VALUES ($1, $2, $3) RETURNING *';
        const booking = await queryDb(query, [event_id, user_id, tickets_booked]);
        res.status(201).json(booking[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Booking
export const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { event_id, user_id, tickets_booked } = req.body;

    if (!event_id || !user_id || !tickets_booked) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = 'UPDATE bookings SET event_id = $1, user_id = $2, tickets_booked = $3 WHERE id = $4 RETURNING *';
        const booking = await queryDb(query, [event_id, user_id, tickets_booked, id]);
        if (booking.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(booking[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete Booking
export const deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await queryDb('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
        if (booking.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get All Bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await queryDb('SELECT * FROM bookings', []);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get Booking by ID
export const getBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await queryDb('SELECT * FROM bookings WHERE id = $1', [id]);
        if (booking.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(booking[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get Bookings by User
export const getBookingsByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const bookings = await queryDb('SELECT * FROM bookings WHERE user_id = $1', [user_id]);
        if (bookings.length === 0) {
            return res.status(404).json({ error: 'Bookings not found' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get Bookings by Event
export const getBookingsByEvent = async (req, res) => {
    const { event_id } = req.params;
    try {
        const bookings = await queryDb('SELECT * FROM bookings WHERE event_id = $1', [event_id]);
        if (bookings.length === 0) {
            return res.status(404).json({ error: 'Bookings not found' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get Bookings by Event and User
export const getBookingsByEventAndUser = async (req, res) => {
    const { event_id, user_id } = req.params;
    try {
        const bookings = await queryDb('SELECT * FROM bookings WHERE event_id = $1 AND user_id = $2', [event_id, user_id]);
        if (bookings.length === 0) {
            return res.status(404).json({ error: 'Bookings not found' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
