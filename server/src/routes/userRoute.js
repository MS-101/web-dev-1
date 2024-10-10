import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js'
import { authRole } from '../middlewares/authorization.js'

const userRoute = express.Router();

userRoute.get('/', authRole('admin'),  getUsers);
userRoute.post('/create', authRole('admin'), createUser);
userRoute.post('/update', authRole('admin'), updateUser);
userRoute.delete('/', authRole('admin'), deleteUser)

export default userRoute