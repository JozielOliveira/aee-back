import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {Quiz, Steps} from '../models';
import {QuizRepository} from '../repositories';

export class QuizStepsController {
  constructor(
    @repository(QuizRepository) protected quizRepository: QuizRepository,
  ) {}

  @get('/quizzes/{id}/steps', {
    responses: {
      '200': {
        description: 'Array of Quiz has many Steps',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Steps)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Steps>,
  ): Promise<Steps[]> {
    return this.quizRepository.steps(id).find(filter);
  }

  @post('/quizzes/{id}/steps', {
    responses: {
      '200': {
        description: 'Quiz model instance',
        content: {'application/json': {schema: getModelSchemaRef(Steps)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Quiz.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Steps, {
            title: 'NewStepsInQuiz',
            exclude: ['id'],
            optional: ['quizId']
          }),
        },
      },
    }) steps: Omit<Steps, 'id'>,
  ): Promise<Steps> {
    return this.quizRepository.steps(id).create(steps);
  }

  @patch('/quizzes/{id}/steps', {
    responses: {
      '200': {
        description: 'Quiz.Steps PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Steps, {partial: true}),
        },
      },
    })
    steps: Partial<Steps>,
    @param.query.object('where', getWhereSchemaFor(Steps)) where?: Where<Steps>,
  ): Promise<Count> {
    return this.quizRepository.steps(id).patch(steps, where);
  }

  @del('/quizzes/{id}/steps', {
    responses: {
      '200': {
        description: 'Quiz.Steps DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Steps)) where?: Where<Steps>,
  ): Promise<Count> {
    return this.quizRepository.steps(id).delete(where);
  }
}
