import 'reflect-metadata';
import TaskRepository from './repositories/taskRepository';
import { Command } from 'commander';
import { connection } from './db/connect';

import './db/connect';
import taskRepository from './repositories/taskRepository';

const command = new Command()

const program = command.version('0.0.1')

program.option('-a, --all', 'show all tasks').option('-p, --priority <priority>', 'set task proprity').parse();

const options = program.opts();

program.command('log <arg>').description('loga sla').action(() => {
  console.log('sla');
});

program.command('list').description('Show all pending tasks').action(async () => {
  if (options.all) {
    const tasksList = await TaskRepository.findAllTasks();
    console.log('all', tasksList);
  } else {
    const tasksList = await TaskRepository.findPendingTasks()
    console.log(tasksList);
  }
});

program.command('next').description('Shows the next task of each priority').action(async () => {
  await TaskRepository.next();

});

program.command('add <description>').description('Create a new task').action(async (description: string) => {
  if (options.priority) {
    const priority = options.priority;
    const newTask = await TaskRepository.createTask({description, priority})
    console.log(newTask);
  } else {
    console.log('Missing priority task value');
  }
})

program.command('complete <id>').description('Change task status to complete').action(async (id) => {
  const result = await TaskRepository.completeTask(id);
  console.log(result);
})

program.command('delete <id>').description('Delete a task').action(async (id) => {
  const result = await taskRepository.deleteTask(id);
  console.log(result)
});

program.command('test').description('Test new functions').action(async (teste: string) => {
  console.log('teste')
});

// deve ser setado um tempo porque essa funcao execulta antes do banco de dados iniciar
setTimeout(async () => {
  program.parse(process.argv);
}, 1000*1)


setTimeout(async () => {
  connection.then((connect) => connect.close());
}, 1000*1)