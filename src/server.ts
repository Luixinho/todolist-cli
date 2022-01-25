import 'reflect-metadata';
import express, { Request, Response } from 'express';
import TaskRepository from './db/taskRepository';

import './db/connect';

const app = express();

app.get('/', async (req: Request, res: Response) => {

  const result = await TaskRepository.findTasks();

  res.json(result);
});

app.post('/post', async (req: Request, res: Response) => {

  const newTask = await TaskRepository.createTask()

  return res.send(newTask);
})











const PORT = 3333;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));