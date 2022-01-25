import 'reflect-metadata';
import express, { Request, Response } from 'express';
import TaskRepository from './db/taskRepository';
import { Command } from 'commander';

import './db/connect';

const app = express();

// process.stdin()

const PORT = 3333;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

app.get('/', async(req: Request, res: Response) => {
  const tasksList = await TaskRepository.findTasks()
  console.log(tasksList);
})
const command = new Command()

const program = command.version('0.0.1')

program.command('show <arg>').description('Show all tasks').action(async () => {
  const tasksList = await TaskRepository.findTasks()
  console.log(tasksList);
})

// deve ser setado um tempo porque essa funcao execulta antes do banco de dados iniciar
setTimeout(() => {
  program.parse(process.argv);
}, 1000*10)
