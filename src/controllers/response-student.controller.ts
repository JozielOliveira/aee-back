import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Response, Student} from '../models';
import {ResponseRepository} from '../repositories';

export class ResponseStudentController {
  constructor(
    @repository(ResponseRepository)
    public responseRepository: ResponseRepository,
  ) {}

  @get('/responses/{id}/student', {
    responses: {
      '200': {
        description: 'Student belonging to Response',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Student)},
          },
        },
      },
    },
  })
  async getStudent(
    @param.path.number('id') id: typeof Response.prototype.id,
  ): Promise<Student> {
    return this.responseRepository.student(id);
  }
}
