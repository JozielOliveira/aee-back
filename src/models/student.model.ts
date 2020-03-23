import {Entity, hasMany, model, property} from '@loopback/repository';
import {Response} from './response.model';

@model({settings: {strict: false}})
export class Student extends Entity {
  @property({type: 'number', id: true, generated: true})
  id?: number;

  @property({type: 'string', required: true})
  name: string;

  @property({type: 'number'})
  userId?: number;

  @hasMany(() => Response)
  responses: Response[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Student>) {
    super(data);
  }
}

export interface StudentRelations {
  // describe navigational properties here
}

export type StudentWithRelations = Student & StudentRelations;
