import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/usersController'
import { authRole } from '../middlewares/authorization'

const router = express.Router();

router.get('/', authRole('admin'),  getUsers);
router.post('/create', authRole('admin'), createUser);
router.post('/update', authRole('admin'), updateUser);
router.delete('/', authRole('admin'), deleteUser)

export default router