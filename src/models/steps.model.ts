import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Question} from './question.model';
import {Quiz, QuizWithRelations} from './quiz.model';

@model({settings: {strict: true}})
export class Steps extends Entity {
  @property({type: 'number', id: true, generated: true})
  id?: number;

  @property({type: 'string', required: true})
  title: string;

  @property({type: 'string', default: ''})
  description?: string;

  @belongsTo(() => Quiz)
  quizId?: number;

  @hasMany(() => Question)
  questions: Question[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Steps>) {
    super(data);
  }
}

export interface StepsRelations {
  quiz?: QuizWithRelations;
  // describe navigational properties here
}

export type StepsWithRelations = Steps & StepsRelations;
