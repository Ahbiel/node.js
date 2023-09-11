import express from 'express'
import PetController from '../controllers/PetController.js'
import verifyToken from '../helpers/verify-token.js'
import imageUpload from '../helpers/image-upload.js'

const router = express.Router()
router.post('/create', verifyToken, imageUpload.array('image'), PetController.create)
router.get('/',PetController.getAll) // rota pública, não precisa do verifyToken
router.get('/mypets', verifyToken, PetController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
router.get('/:id', PetController.getPetByid)
router.delete('/:id', verifyToken, PetController.removePetById)
export default router;