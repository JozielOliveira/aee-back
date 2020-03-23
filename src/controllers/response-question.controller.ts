import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Question, Response} from '../models';
import {ResponseRepository} from '../repositories';

export class ResponseQuestionController {
  constructor(
    @repository(ResponseRepository)
    public responseRepository: ResponseRepository,
  ) {}

  @get('/responses/{id}/question', {
    responses: {
      '200': {
        description: 'Question belonging to Response',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Question)},
          },
        },
      },
    },
  })
  async getQuestion(
    @param.path.number('id') id: typeof Response.prototype.id,
  ): Promise<Question> {
    return this.responseRepository.question(id);
  }
}
