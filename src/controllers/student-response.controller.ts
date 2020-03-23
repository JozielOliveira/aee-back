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
  Student,
  Response,
} from '../models';
import {StudentRepository} from '../repositories';

export class StudentResponseController {
  constructor(
    @repository(StudentRepository) protected studentRepository: StudentRepository,
  ) { }

  @get('/students/{id}/responses', {
    responses: {
      '200': {
        description: 'Array of Student has many Response',
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
    return this.studentRepository.responses(id).find(filter);
  }

  @post('/students/{id}/responses', {
    responses: {
      '200': {
        description: 'Student model instance',
        content: {'application/json': {schema: getModelSchemaRef(Response)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Student.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Response, {
            title: 'NewResponseInStudent',
            exclude: ['id'],
            optional: ['studentId']
          }),
        },
      },
    }) response: Omit<Response, 'id'>,
  ): Promise<Response> {
    return this.studentRepository.responses(id).create(response);
  }

  @patch('/students/{id}/responses', {
    responses: {
      '200': {
        description: 'Student.Response PATCH success count',
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
    return this.studentRepository.responses(id).patch(response, where);
  }

  @del('/students/{id}/responses', {
    responses: {
      '200': {
        description: 'Student.Response DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Response)) where?: Where<Response>,
  ): Promise<Count> {
    return this.studentRepository.responses(id).delete(where);
  }
}
