import { getRepository } from "typeorm";
import { Task } from './entities/task';
import { ITask } from '../interfaces';

export class TaskRepository {

  public async createTask(task: ITask) {
    const newTask = new Task();
    newTask.description = task.description;
    newTask.status = 'pendente'
    newTask.priority = task.priority

    const result = await getRepository(Task).save(newTask);

    return result;
  }

  public async findAllTasks() {
    const tasksList = await getRepository(Task).find();
    const newTaskList = tasksList.map(async (task: ITask) => {
      const newCreated = await this.convertCreated(task.createdAt)
      task.createdAt = newCreated
      return task
    });
    return newTaskList;
  }

  public async findPendingTasks() {
    const tasksList = await getRepository(Task).find({ status: 'pendente' });
      const newTaskList = tasksList.map(async (task: ITask) => {
      const newCreated = await this.convertCreated(task.createdAt)
      task.createdAt = newCreated
      return task
    });
    return newTaskList;
  }

  public async completeTask(id) {
    await getRepository(Task).update(id, { status: 'finalizada' });
    return { message: `Task completed`}
  }

  public async deleteTask(id) {
    await getRepository(Task).delete(id);
  }

  public async convertCreated(date: Date | string) {
    const taskDate: any = date
    const newDate: any = new Date();
    const elapsedTime = Math.abs(taskDate - newDate);

    const horas = Math.floor(elapsedTime / 3600000);

    const minutos = Math.floor((elapsedTime % 3600000) / 60000);
    const segundos = Math.floor(((elapsedTime % 3600000) % 60000) / 1000);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor( dias / 30);

    if (horas === 1) {
    return `${horas} hora`;
    } else {
      return `${horas} horas`;
    }
  }
}

export default new TaskRepository();