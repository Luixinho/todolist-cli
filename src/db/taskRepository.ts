import { getRepository } from "typeorm";
import { Task } from './entities/task';
import { ITask } from '../interfaces';

export class TaskRepository {

  public async createTask(task: ITask) {
    const newTask = new Task();
    newTask.description = task.description;
    newTask.status = 'pendente'
    newTask.priority = task.priority

    // const result = await getRepository(Task).save(newTask);

    return newTask;
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
    await getRepository(Task).update(id, { status: 'finalizada' });
    return { message: `Task completed`}
  }

  public async deleteTask(id) {
    await getRepository(Task).delete(id);
  }

  public async convertCreated() {
    const task = await getRepository(Task).findOne();
    // const taskDate: any = task.createdAt
    const taskDate: any = new Date('2022-01-26 15:45:00')
    const newDate: any = new Date('2022-01-27 15:47:00');
    const elapsedTime = Math.abs(taskDate - newDate);

    const time = elapsedTime%3600000;
    const horas = Math.round(elapsedTime / 3600000);
    const minutos = Math.round(elapsedTime % 3600000)
    const segundos = Math.round(elapsedTime / 3600)



    // const configDate =
    return time;
  }
}

export default new TaskRepository();