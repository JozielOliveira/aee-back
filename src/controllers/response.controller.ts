import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Response} from '../models';
import {ResponseRepository} from '../repositories';

export class ResponseController {
  constructor(
    @repository(ResponseRepository)
    public responseRepository : ResponseRepository,
  ) {}

  @post('/responses', {
    responses: {
      '200': {
        description: 'Response model instance',
        content: {'application/json': {schema: getModelSchemaRef(Response)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Response, {
            title: 'NewResponse',
            exclude: ['id'],
          }),
        },
      },
    })
    response: Omit<Response, 'id'>,
  ): Promise<Response> {
    return this.responseRepository.create(response);
  }

  @get('/responses/count', {
    responses: {
      '200': {
        description: 'Response model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Response) where?: Where<Response>,
  ): Promise<Count> {
    return this.responseRepository.count(where);
  }

  @get('/responses', {
    responses: {
      '200': {
        description: 'Array of Response model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Response, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Response) filter?: Filter<Response>,
  ): Promise<Response[]> {
    return this.responseRepository.find(filter);
  }

  @patch('/responses', {
    responses: {
      '200': {
        description: 'Response PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Response, {partial: true}),
        },
      },
    })
    response: Response,
    @param.where(Response) where?: Where<Response>,
  ): Promise<Count> {
    return this.responseRepository.updateAll(response, where);
  }

  @get('/responses/{id}', {
    responses: {
      '200': {
        description: 'Response model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Response, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Response, {exclude: 'where'}) filter?: FilterExcludingWhere<Response>
  ): Promise<Response> {
    return this.responseRepository.findById(id, filter);
  }

  @patch('/responses/{id}', {
    responses: {
      '204': {
        description: 'Response PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Response, {partial: true}),
        },
      },
    })
    response: Response,
  ): Promise<void> {
    await this.responseRepository.updateById(id, response);
  }

  @put('/responses/{id}', {
    responses: {
      '204': {
        description: 'Response PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() response: Response,
  ): Promise<void> {
    await this.responseRepository.replaceById(id, response);
  }

  @del('/responses/{id}', {
    responses: {
      '204': {
        description: 'Response DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.responseRepository.deleteById(id);
  }
}
