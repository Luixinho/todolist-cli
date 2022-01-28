import { getRepository, ObjectID, Timestamp } from "typeorm";
import { Task } from '../db/entities/task';
import { ITask } from '../interfaces';

class TaskRepository {

  public async createTask(task: ITask) {
    const newTask = new Task();
    newTask.description = task.description;
    newTask.status = 'pendente'
    newTask.priority = task.priority

    try {
      const result: ITask = await getRepository(Task).save(newTask);
      return { message: 'Task created', task: result.description};
    } catch (error) {
      console.log({ message: 'Registration failed', error: error.message, code: error.code });
    }
  }

  public async findAllTasks() {
    try {
      const tasksList = await getRepository(Task).find();
      return tasksList;
    } catch (error) {
      console.log({ message: 'Search failed', error: error.message, code: error.code });
    }
  }

  public async findPendingTasks() {
    try {
      const tasksList = await getRepository(Task).find({ status: 'pendente' });
      return tasksList;
    } catch (error) {
      console.log({ message: 'Search failed', error: error.message, code: error.code });
    }
  }

  public async completeTask(id: ObjectID) {

    try {
      const result = await getRepository(Task).update(id, { status: 'finalizada' });
      if (result.affected === 1) {
        return { message: 'Task completed'}
      } else {
        return { message: 'Task not found'}
      }
    } catch (error) {
      console.log({ message: 'Action failed', error: error.message, code: error.code });
    }

  }

  public async deleteTask(id: ObjectID) {

    try {
      const result = await getRepository(Task).delete(id);

      if (result.affected === 1) {
        return { message: 'Task deleted'}
      } else {
        return { message: 'Task not found'}
      }
    } catch (error) {
      console.log({ message: 'Action failed', error: error.message, code: error.code });
    }
  }

}

export default new TaskRepository();