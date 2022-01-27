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
    const tasksBaixa = tasks.filter((task) => task.priority === 'baixa' ? true : false);
    const tasksMedia = tasks.filter((task) => task.priority === 'media' ? true : false);
    const tasksAlta = tasks.filter((task) => task.priority === 'alta' ? true : false);


      const form = await this.formatDate(tasksBaixa);

      form.map((task) => {
        task.then((task) => {
          task.createdAt
        })
      })

      var result = await form.reduce(async (a: any, b: any): Promise<any> => {
        const sla = Timestamp.MIN_VALUE.lessThan((await a).createdAt)
        return sla

    })

    // let max = Math.max.apply(null, myArray.map(function(item) {
    //   return item.Cost;
    // }));

    console.log('task', result)
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
    const newTaskList = list.map(async (task: ITask) => {
      const newCreated = await this.convertCreated(task.createdAt)
      if (newCreated === 1) {
        task.createdAt = `${newCreated} hora`
      } else {
        task.createdAt = `${newCreated} horas`
      }
      return task
    });
    return newTaskList;
  }

  private async convertCreated(date: Date | string) {
    const taskDate: any = date
    const newDate: any = new Date();
    const elapsedTime = Math.abs(taskDate - newDate);

    const horas = Math.floor(elapsedTime / 3600000);

    const minutos = Math.floor((elapsedTime % 3600000) / 60000);
    const segundos = Math.floor(((elapsedTime % 3600000) % 60000) / 1000);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor( dias / 30);

    return horas;
  }
}

export default new TaskRepository();