import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {AeeDataSource} from '../datasources';
import {Response, Student, StudentRelations, User} from '../models';
import {ResponseRepository} from './response.repository';

export class StudentRepository extends DefaultCrudRepository<
  Student,
  typeof Student.prototype.id,
  StudentRelations
  > {

  public readonly user: BelongsToAccessor<User, typeof User.prototype.id>;
  public readonly responses: HasManyRepositoryFactory<Response, typeof Response.prototype.id>;

  constructor(
    @inject('datasources.aee') dataSource: AeeDataSource,
    @repository.getter('ResponseRepository')
    getResponseRepository: Getter<ResponseRepository>,
  ) {
    super(Student, dataSource);

    this.responses = this.createHasManyRepositoryFactoryFor(
      'responses',
      getResponseRepository,
    );
  }
}
