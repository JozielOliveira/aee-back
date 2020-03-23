import {inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository} from '@loopback/repository';
import {AeeDataSource} from '../datasources';
import {Question, Response, ResponseRelations, Student} from '../models';

export class ResponseRepository extends DefaultCrudRepository<
  Response,
  typeof Response.prototype.id,
  ResponseRelations
  > {

  public readonly student: BelongsToAccessor<Student, typeof Student.prototype.id>;
  public readonly question: BelongsToAccessor<Question, typeof Question.prototype.id>;

  constructor(
    @inject('datasources.aee') dataSource: AeeDataSource,
  ) {
    super(Response, dataSource);
  }
}
