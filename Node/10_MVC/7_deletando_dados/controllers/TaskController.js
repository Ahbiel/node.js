import Task from "../models/Task.js";

class TaskController {
    static createTask(req,res){
        res.render('tasks/create')
    }
    static async createTaskSave(req,res){ //como terei uma integração com db, importante ter o async

        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        await Task.create(task)
        res.redirect('/tasks')

    }
    static async removeTask(req,res){
        const id = req.body.id;
        await Task.destroy({where: {id:id}})
        res.redirect('/tasks')
    }

    static async showTasks(req,res){
        const tasks = await Task.findAll({raw:true})
        res.render('tasks/all', {tasks})
    }
}
export default TaskController