import authorizeRole from '../middleware/authorizeRole.js';
import express from 'express';
const router = express.Router();

import{
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
} from '../controllers/events.js';

router.post('/create', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;