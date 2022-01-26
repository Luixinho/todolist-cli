import 'reflect-metadata';
import TaskRepository from './db/taskRepository';
import { Command } from 'commander';
import { connection } from './db/connect';

import './db/connect';
import taskRepository from './db/taskRepository';

const command = new Command()

const program = command.version('0.0.1')

program.option('-a, --all', 'show all tasks').option('-p, --priority', 'set task proprity').parse();

const options = program.opts();

program.command('log').description('loga sla').action(() => {
  console.log('sla');
});

program.command('list').description('Show all pending tasks').action(async () => {
  if (options.all) {
    const tasksList = await TaskRepository.findAllTasks();
    console.log('all', tasksList);
  } else {
    const tasksList = await TaskRepository.findPendingTasks()
    console.log(tasksList);
  }});

program.command('add <description> [<priority>]').description('Create a new task').action(async (description: string, priority: string) => {
  if (options.priority) {
    const newTask = await TaskRepository.createTask({description, priority})
    console.log(newTask);
  } else {
    const newTask = await TaskRepository.createTask({description, priority})
    console.log(newTask);
  }
})

program.command('complete <id>').description('Change task status to complete').action(async (id) => {
  const changed = await TaskRepository.completeTask(id);
  console.log(changed);
})

program.command('delete <id>').description('Delete a task').action(async (id) => {
  await taskRepository.deleteTask(id);
  console.log('Task deleted!')
});

program.command('test').description('Test new functions').action(async () => {
  const date = await taskRepository.convertCreated();
  console.log(date);
});

// deve ser setado um tempo porque essa funcao execulta antes do banco de dados iniciar
setTimeout(async () => {
  program.parse(process.argv);
}, 1000*1)

setTimeout(async () => {
  connection.then((connect) => connect.close());
}, 1000*1)