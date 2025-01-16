import express from 'express';
const router = express.Router();
import authorizeRole from '../middleware/authorizeRole.js';

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} from '../controllers/users.js';


router.post('/register', createUser, );
router.post('/login', loginUser);
router.get('/',   getUsers );
router.get('/:id', authorizeRole('ADMIN'), getUserById,);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser, );

export default router;
