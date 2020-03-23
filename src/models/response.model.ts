import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Response extends Entity {
  @property({type: 'number', id: true, generated: true})
  id?: number;

  @property({type: 'string', required: true})
  value: string;

  @property({type: 'number'})
  studentId?: number;

  @property({type: 'number'})
  questionId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Response>) {
    super(data);
  }
}

export interface ResponseRelations {
  // describe navigational properties here

}

export type ResponseWithRelations = Response & ResponseRelations;
