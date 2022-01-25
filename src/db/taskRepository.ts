import { getRepository } from "typeorm";
import { Task } from './entities/task';
import { ITask } from '../interfaces';

export class TaskRepository {

  public async createTask(task: ITask) {
    const newTask = new Task();
    newTask.description = task.description;
    newTask.priority = task.priority

    const result = await getRepository(Task).save(newTask);
    return result;
  }

  public async findAllTasks() {
    const tasksList = await getRepository(Task).find();
    return tasksList;
  }

  public async findPendingTasks() {
    const tasksList = await getRepository(Task).find({ status: 'pendente' });
    return tasksList;
  }

  public async completeTask(id) {
    const newStatus = await getRepository(Task).update(id, { status: 'finalizada' });
    return { message: `Task ${newStatus}`}
  }

  public async deleteTask(id) {
    await getRepository(Task).delete(id);
  }
}

export default new TaskRepository();