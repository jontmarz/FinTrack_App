import { Router } from 'express'
import { singupUser, loginUser, deleteUser, logOutUser } from '../controllers/authController.js'
import { signupValidatorFields, loginValidatorFields } from '../middlewares/validationUserFields.js'

const router = Router()

// Creating user
router.post('/signup', signupValidatorFields, singupUser)

// Login user
router.post('/login', loginValidatorFields, loginUser)

// Delete user
router.delete('/users/:id', deleteUser)

// Logout user
router.get('/logout', logOutUser)

export default router