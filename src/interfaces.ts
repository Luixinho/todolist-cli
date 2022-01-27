import { ObjectID } from 'typeorm';

export interface ITask {

  id?: ObjectID | string;
  description: string;
  status?: string;
  priority: string;
  createdAt?: Date | string;

}