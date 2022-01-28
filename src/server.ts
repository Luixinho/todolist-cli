import 'reflect-metadata';
import TaskService from './services/taskService';
import { Command } from 'commander';
import { connection } from './db/connect';

import './db/connect';

const command = new Command()

const program = command.version('0.0.1')

program.option('-a, --all', 'show all tasks').option('-p, --priority <priority>', 'set task proprity').parse();

const options = program.opts();

program.command('log <arg>').description('loga sla').action(() => {
  console.log('sla');
});

program.command('add <description>').description('Create a new task').action(async (description: string) => {
  if (options.priority) {
    const priority = options.priority;
    const newTask = await TaskService.createTask({description, priority})
    console.log(newTask);
  } else {
    console.log('Missing priority task value, use -p option to pass priority ');
  }
})

program.command('list').description('Show all pending tasks').action(async () => {
  if (options.all) {
    const tasksList = await TaskService.findAllTasks();
    console.log('all', tasksList);
  } else {
    const tasksList = await TaskService.findPendingTasks()
    console.log(tasksList);
  }
});

program.command('next').description('Shows the next task of each priority').action(async () => {
  const nextTasks = await TaskService.next();
  console.log(nextTasks);
});

program.command('complete <id>').description('Change task status to complete').action(async (id) => {
  const result = await TaskService.completeTask(id);
  console.log(result);
})

program.command('delete <id>').description('Delete a task').action(async (id) => {
  const result = await TaskService.deleteTask(id);
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