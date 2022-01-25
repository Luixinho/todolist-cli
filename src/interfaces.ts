import { ObjectID } from 'typeorm';

export interface ITask {

  id?: ObjectID;
  description: string;
  status: string;
  priority: string;
  createdAt?: Date;

}