import taskRepository from '../repositories/taskRepository';

class taskService {

  public async createTask(task: ITask) {
    const created = await taskRepository.createTask(task);
    return created;
  }

  public async findAllTasks() {
    const all = await taskRepository.findAllTasks();
    return all;
  }

  public async
}