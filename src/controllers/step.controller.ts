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
import {Steps} from '../models';
import {StepsRepository} from '../repositories';

export class StepController {
  constructor(
    @repository(StepsRepository)
    public stepsRepository : StepsRepository,
  ) {}

  @post('/steps', {
    responses: {
      '200': {
        description: 'Steps model instance',
        content: {'application/json': {schema: getModelSchemaRef(Steps)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Steps, {
            title: 'NewSteps',
            exclude: ['id'],
          }),
        },
      },
    })
    steps: Omit<Steps, 'id'>,
  ): Promise<Steps> {
    return this.stepsRepository.create(steps);
  }

  @get('/steps/count', {
    responses: {
      '200': {
        description: 'Steps model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Steps) where?: Where<Steps>,
  ): Promise<Count> {
    return this.stepsRepository.count(where);
  }

  @get('/steps', {
    responses: {
      '200': {
        description: 'Array of Steps model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Steps, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Steps) filter?: Filter<Steps>,
  ): Promise<Steps[]> {
    return this.stepsRepository.find(filter);
  }

  @patch('/steps', {
    responses: {
      '200': {
        description: 'Steps PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Steps, {partial: true}),
        },
      },
    })
    steps: Steps,
    @param.where(Steps) where?: Where<Steps>,
  ): Promise<Count> {
    return this.stepsRepository.updateAll(steps, where);
  }

  @get('/steps/{id}', {
    responses: {
      '200': {
        description: 'Steps model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Steps, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Steps, {exclude: 'where'}) filter?: FilterExcludingWhere<Steps>
  ): Promise<Steps> {
    return this.stepsRepository.findById(id, filter);
  }

  @patch('/steps/{id}', {
    responses: {
      '204': {
        description: 'Steps PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Steps, {partial: true}),
        },
      },
    })
    steps: Steps,
  ): Promise<void> {
    await this.stepsRepository.updateById(id, steps);
  }

  @put('/steps/{id}', {
    responses: {
      '204': {
        description: 'Steps PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() steps: Steps,
  ): Promise<void> {
    await this.stepsRepository.replaceById(id, steps);
  }

  @del('/steps/{id}', {
    responses: {
      '204': {
        description: 'Steps DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.stepsRepository.deleteById(id);
  }
}
