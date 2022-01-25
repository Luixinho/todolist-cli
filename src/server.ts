import 'reflect-metadata';
import TaskRepository from './db/taskRepository';
import { Command } from 'commander';
import { connection } from './db/connect';

import './db/connect';

const command = new Command()

const program = command.version('0.0.1')

program.command('list').description('Show all pending tasks').action(async () => {
  const tasksList = await TaskRepository.findPendingTasks()
  console.log(tasksList)});

program.command('add <description> <status> <priority>').description('Create a new task').action(async (description: string, status: string, priority: string) => {
  const newTask = await TaskRepository.createTask({description, status, priority})
  console.log(newTask);
})

program.command('complete <id>').description('Change task status to complete').action(async (id) => {
  const changed = await TaskRepository.completeTask(id);
  console.log(changed);
})

program.command('print [sla]').description('Escreve sla').action((sla) => {
  
  if(sla) {
    console.log(sla)
  } else {
    console.log('sla')
  }
  })

// deve ser setado um tempo porque essa funcao execulta antes do banco de dados iniciar
setTimeout(async () => {
  program.parse(process.argv);
}, 1000*1)

setTimeout(async () => {
  connection.then((connect) => connect.close());
}, 1000*1)