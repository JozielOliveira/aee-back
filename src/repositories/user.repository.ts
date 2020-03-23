import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {AeeDataSource} from '../datasources';
import {Student, User, UserRelations} from '../models';
import {StudentRepository} from './student.repository';


export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {

  public readonly students: HasManyRepositoryFactory<Student, typeof Student.prototype.id>;

  constructor(
    @inject('datasources.aee') dataSource: AeeDataSource,
    @repository.getter('StudentRepository')
    getStudentRepository: Getter<StudentRepository>,
  ) {
    super(User, dataSource);

    this.students = this.createHasManyRepositoryFactoryFor(
      'students',
      getStudentRepository,
    );
  }
}
