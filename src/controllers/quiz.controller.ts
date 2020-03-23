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
import {Quiz} from '../models';
import {QuizRepository} from '../repositories';

export class QuizController {
  constructor(
    @repository(QuizRepository)
    public quizRepository : QuizRepository,
  ) {}

  @post('/quizzes', {
    responses: {
      '200': {
        description: 'Quiz model instance',
        content: {'application/json': {schema: getModelSchemaRef(Quiz)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quiz, {
            title: 'NewQuiz',
            exclude: ['id'],
          }),
        },
      },
    })
    quiz: Omit<Quiz, 'id'>,
  ): Promise<Quiz> {
    return this.quizRepository.create(quiz);
  }

  @get('/quizzes/count', {
    responses: {
      '200': {
        description: 'Quiz model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Quiz) where?: Where<Quiz>,
  ): Promise<Count> {
    return this.quizRepository.count(where);
  }

  @get('/quizzes', {
    responses: {
      '200': {
        description: 'Array of Quiz model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Quiz, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Quiz) filter?: Filter<Quiz>,
  ): Promise<Quiz[]> {
    return this.quizRepository.find(filter);
  }

  @patch('/quizzes', {
    responses: {
      '200': {
        description: 'Quiz PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quiz, {partial: true}),
        },
      },
    })
    quiz: Quiz,
    @param.where(Quiz) where?: Where<Quiz>,
  ): Promise<Count> {
    return this.quizRepository.updateAll(quiz, where);
  }

  @get('/quizzes/{id}', {
    responses: {
      '200': {
        description: 'Quiz model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Quiz, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Quiz, {exclude: 'where'}) filter?: FilterExcludingWhere<Quiz>
  ): Promise<Quiz> {
    return this.quizRepository.findById(id, filter);
  }

  @patch('/quizzes/{id}', {
    responses: {
      '204': {
        description: 'Quiz PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quiz, {partial: true}),
        },
      },
    })
    quiz: Quiz,
  ): Promise<void> {
    await this.quizRepository.updateById(id, quiz);
  }

  @put('/quizzes/{id}', {
    responses: {
      '204': {
        description: 'Quiz PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() quiz: Quiz,
  ): Promise<void> {
    await this.quizRepository.replaceById(id, quiz);
  }

  @del('/quizzes/{id}', {
    responses: {
      '204': {
        description: 'Quiz DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.quizRepository.deleteById(id);
  }
}
