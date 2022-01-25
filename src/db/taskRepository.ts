import { getRepository } from "typeorm";
import { Task } from './entities/task';

export class TaskRepository {

  public async createTask() {
    const newTask = new Task();
    newTask.description = "Comprar ovos"
    newTask.status = "pendente"
    newTask.priority = "alta"

    const result = await getRepository(Task).save(newTask);
    return result;
  }

  public async findTasks() {
    const tasksList = await getRepository(Task).find();
    return tasksList;
  }
}

export default new TaskRepository();