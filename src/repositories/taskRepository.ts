import { getRepository, ObjectID, Timestamp } from "typeorm";
import { Task } from '../db/entities/task';
import { ITask } from '../interfaces';

export class TaskRepository {

  public async createTask(task: ITask) {
    const newTask = new Task();
    newTask.description = task.description;
    newTask.status = 'pendente'
    newTask.priority = task.priority

    try {
      const result: ITask = await getRepository(Task).save(newTask);
      return { message: 'Task created', task: result.description};
    } catch (error) {
      return { message: 'Registration failed', error: error.message, code: error.code };
    }
  }

  public async findAllTasks() {
    const tasksList = await getRepository(Task).find();
    const newTaskList = this.formatDate(tasksList);
    return newTaskList;
  }

  public async findPendingTasks() {
    const tasksList = await getRepository(Task).find({ status: 'pendente' });
    const newTaskList = this.formatDate(tasksList);
    return newTaskList;
  }

  public async next() {
    const tasks = await getRepository(Task).find({ status: 'pendente'});
    const baixas = tasks.filter((task) => task.priority === 'baixa' ? true : false);
    const medias = tasks.filter((task) => task.priority === 'media' ? true : false);
    const altas = tasks.filter((task) => task.priority === 'alta' ? true : false);

    const tasksBaixa = await this.formatDate(baixas);
    const tasksMedia = await this.formatDate(medias);
    const tasksAlta = await this.formatDate(altas);

    return {
      alta: tasksBaixa.length === 0 ? 'There are no tasks' : tasksAlta[0],
      media: tasksMedia.length === 0 ? 'There are no tasks' : tasksMedia[0],
      baixa: tasksAlta.length === 0 ? 'There are no tasks' : tasksBaixa[0]
    };
  }

  public async completeTask(id: ObjectID) {
    const result = await getRepository(Task).update(id, { status: 'finalizada' });

    if (result.affected === 1) {
      return { message: 'Task completed'}
    } else {
      return { message: 'Task not found'}
    }

  }

  public async deleteTask(id: ObjectID) {
    const result = await getRepository(Task).delete(id);

    if (result.affected === 1) {
      return { message: 'Task deleted'}
    } else {
      return { message: 'Task not found'}
    }
  }

  private async formatDate(list: ITask[]) {
    const newTaskList = list.map((task: ITask) => {
      const newCreated = this.convertCreated(task.createdAt)
      if (newCreated === 1) {
        task.createdAt = `${newCreated} hora`
      } else {
        task.createdAt = `${newCreated} horas`
      }
      return task
    });
    return newTaskList;
  }

  private convertCreated(date: Date | string) {
    const taskDate: any = date
    const newDate: any = new Date();
    const elapsedTime = Math.abs(taskDate - newDate);

    const horas = Math.floor(elapsedTime / 3600000);

    return horas;
  }
}

export default new TaskRepository();