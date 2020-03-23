import {Entity, hasMany, model, property} from '@loopback/repository';
import {Response, ResponseRelations} from './response.model';

@model({settings: {strict: false}})
export class Question extends Entity {
  @property({type: 'number', id: true, generated: true})
  id?: number;

  @property({type: 'string', required: true})
  name: string;

  @property({type: 'string', required: true})
  type: string;

  @property({type: 'string', required: true})
  label: string;

  @property({type: 'string', required: true})
  description: string;

  @property({type: 'string', default: ''})
  placeholder?: string;

  @property({type: 'string', default: ''})
  defaultValue?: string;

  @property({type: 'number'})
  stepsId?: number;

  @hasMany(() => Response)
  responses: Response[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Question>) {
    super(data);
  }
}

export interface QuestionRelations {
  // describe navigational properties here
  responses?: ResponseRelations;
}

export type QuestionWithRelations = Question & QuestionRelations;
