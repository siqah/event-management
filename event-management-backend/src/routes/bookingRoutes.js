import authorizeRole from '../middleware/authorizeRole.js';
import express from 'express';
const router = express.Router();


import {
    createBooking,
    updateBooking,
    deleteBooking,
    getBookingById,
    getAllBookings,
    getBookingsByUser,
    getBookingsByEvent,
    getBookingsByEventAndUser,
    
} from '../controllers/bookings.js';

router.post('/book', createBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.get('/user/:user_id', getBookingsByUser);
router.get('/event/:event_id', getBookingsByEvent);
router.get('/event/:event_id/user/:user_id', getBookingsByEventAndUser);

export default router;