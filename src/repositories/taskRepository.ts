import { getRepository, ObjectID, Timestamp } from "typeorm";
import { Task } from '../db/entities/task';
import { ITask } from '../interfaces';

class TaskRepository {

  public async createTask(task: ITask) {
    const newTask = new Task();
    newTask.description = task.description;
    newTask.status = 'pendente'
    newTask.priority = task.priority
    newTask.isDeleted = false;

    try {
      const result: ITask = await getRepository(Task).save(newTask);
      return { message: 'Task created', task: result.description};
    } catch (error) {
      return { message: 'Registration failed', error: error.message, code: error.code };
    }
  }

  public async findAllTasks() {
    const tasksList = await getRepository(Task).find({ isDeleted: false });
    return tasksList;
  }

  public async findPendingTasks() {
    const tasksList = await getRepository(Task).find({ status: 'pendente', isDeleted: false });
    return tasksList;
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
    const result = await getRepository(Task).update(id, { isDeleted: true });

    if (result.affected === 1) {
      return { message: 'Task deleted'}
    } else {
      return { message: 'Task not found'}
    }
  }

}

export default new TaskRepository();