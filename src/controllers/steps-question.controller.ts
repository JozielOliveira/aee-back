import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Steps,
  Question,
} from '../models';
import {StepsRepository} from '../repositories';

export class StepsQuestionController {
  constructor(
    @repository(StepsRepository) protected stepsRepository: StepsRepository,
  ) { }

  @get('/steps/{id}/questions', {
    responses: {
      '200': {
        description: 'Array of Steps has many Question',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Question)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Question>,
  ): Promise<Question[]> {
    return this.stepsRepository.questions(id).find(filter);
  }

  @post('/steps/{id}/questions', {
    responses: {
      '200': {
        description: 'Steps model instance',
        content: {'application/json': {schema: getModelSchemaRef(Question)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Steps.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Question, {
            title: 'NewQuestionInSteps',
            exclude: ['id'],
            optional: ['stepsId']
          }),
        },
      },
    }) question: Omit<Question, 'id'>,
  ): Promise<Question> {
    return this.stepsRepository.questions(id).create(question);
  }

  @patch('/steps/{id}/questions', {
    responses: {
      '200': {
        description: 'Steps.Question PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Question, {partial: true}),
        },
      },
    })
    question: Partial<Question>,
    @param.query.object('where', getWhereSchemaFor(Question)) where?: Where<Question>,
  ): Promise<Count> {
    return this.stepsRepository.questions(id).patch(question, where);
  }

  @del('/steps/{id}/questions', {
    responses: {
      '200': {
        description: 'Steps.Question DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Question)) where?: Where<Question>,
  ): Promise<Count> {
    return this.stepsRepository.questions(id).delete(where);
  }
}
