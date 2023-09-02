import Task from "../models/Task.js";

class TaskController {
    // formulário de criação das tasks (get)
    static createTask(req,res){
        res.render('tasks/create')
    }
    // Rota que cria as tasks no DB (POST)
    static async createTaskSave(req,res){ //como terei uma integração com db, importante ter o async

        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        await Task.create(task)
        res.redirect('/tasks')

    }
    // Rota que remove a task dentro do db (POST)
    static async removeTask(req,res){
        const id = req.body.id;
        await Task.destroy({where: {id:id}})
        res.redirect('/tasks')
    }
    // Rota que pega as informações de uma coluna dentro da tabela (get)
    static async updateTask(req,res){
        const id = req.params.id;
        console.log(id)
        const task = await Task.findOne({raw:true, where:{id:id}})
        console.log(task)
        res.render('tasks/edit', {task})
    }
    // Rora que edita a coluna dentro de uma tabela (POST)
    static async updateTaskPost(req,res){
        const id = req.body.id
        const task = {
            title: req.body.title,
            description: req.body.description
        }
        await Task.update(task, {where: {id:id}})
        res.redirect('/task')
    }
    // Rota que apenas mostra todas as colunas da tabela em questão
    static async showTasks(req,res){
        const tasks = await Task.findAll({raw:true})
        res.render('tasks/all', {tasks})
    }
}
export default TaskController