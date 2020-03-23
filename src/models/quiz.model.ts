import {Entity, hasMany, model, property} from '@loopback/repository';
import {Steps} from './steps.model';

@model({settings: {strict: true}})
export class Quiz extends Entity {
  @property({type: 'number', id: true, generated: true})
  id?: number;

  @property({type: 'string', required: true})
  name: string;

  @property({type: 'string', default: ''})
  description?: string;

  @hasMany(() => Steps)
  steps: Steps[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Quiz>) {
    super(data);
  }
}

export interface QuizRelations {
  // describe navigational properties here
}

export type QuizWithRelations = Quiz & QuizRelations;
