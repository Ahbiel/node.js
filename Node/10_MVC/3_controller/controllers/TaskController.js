import Task from "../models/Task";

class TaskController {
    static createTask(req,res){
        res.render('tasks/create')
    }
}
export default TaskController