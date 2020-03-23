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
  Question,
  Response,
} from '../models';
import {QuestionRepository} from '../repositories';

export class QuestionResponseController {
  constructor(
    @repository(QuestionRepository) protected questionRepository: QuestionRepository,
  ) { }

  @get('/questions/{id}/responses', {
    responses: {
      '200': {
        description: 'Array of Question has many Response',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Response)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Response>,
  ): Promise<Response[]> {
    return this.questionRepository.responses(id).find(filter);
  }

  @post('/questions/{id}/responses', {
    responses: {
      '200': {
        description: 'Question model instance',
        content: {'application/json': {schema: getModelSchemaRef(Response)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Question.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Response, {
            title: 'NewResponseInQuestion',
            exclude: ['id'],
            optional: ['questionId']
          }),
        },
      },
    }) response: Omit<Response, 'id'>,
  ): Promise<Response> {
    return this.questionRepository.responses(id).create(response);
  }

  @patch('/questions/{id}/responses', {
    responses: {
      '200': {
        description: 'Question.Response PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Response, {partial: true}),
        },
      },
    })
    response: Partial<Response>,
    @param.query.object('where', getWhereSchemaFor(Response)) where?: Where<Response>,
  ): Promise<Count> {
    return this.questionRepository.responses(id).patch(response, where);
  }

  @del('/questions/{id}/responses', {
    responses: {
      '200': {
        description: 'Question.Response DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Response)) where?: Where<Response>,
  ): Promise<Count> {
    return this.questionRepository.responses(id).delete(where);
  }
}
