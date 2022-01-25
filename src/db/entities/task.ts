import { Entity, Column, ObjectIdColumn, ObjectID, CreateDateColumn } from 'typeorm';

@Entity()
export class Task {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  priority: string;

  @CreateDateColumn()
  createdAt: Date;

}