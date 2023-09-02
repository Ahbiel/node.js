import express from 'express'
import TaskController from '../controllers/TaskController.js';
const router = express.Router()

router.get('/',TaskController.showTasks);
router.post('/add', TaskController.createTaskSave) //criar uma rota de post para a função createTaskSave
router.get('/add',TaskController.createTask);

export default router;