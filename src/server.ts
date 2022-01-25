import 'reflect-metadata';
import TaskRepository from './db/taskRepository';
import { Command } from 'commander';
import { connection } from './db/connect';

import './db/connect';

const command = new Command()

const program = command.version('0.0.1')

program.command('show <arg>').description('Show all tasks').action(async () => {
  const tasksList = await TaskRepository.findTasks()
  console.log(tasksList);
})

// deve ser setado um tempo porque essa funcao execulta antes do banco de dados iniciar
setTimeout(async () => {
  program.parse(process.argv);
}, 1000*1)

setTimeout(async () => {
  connection.then((connect) => connect.close());
}, 1000*1)
