import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {AeeDataSource} from '../datasources';
import {Quiz, QuizRelations, Steps} from '../models';
import {StepsRepository} from './steps.repository';

export class QuizRepository extends DefaultCrudRepository<
  Quiz,
  typeof Quiz.prototype.id,
  QuizRelations
  > {

  public readonly steps: HasManyRepositoryFactory<Steps, typeof Steps.prototype.id>;

  constructor(
    @inject('datasources.aee') dataSource: AeeDataSource,
    @repository.getter('StepsRepository')
    getStepRepository: Getter<StepsRepository>,
  ) {
    super(Quiz, dataSource);

    this.steps = this.createHasManyRepositoryFactoryFor(
      'steps',
      getStepRepository,
    );
  }
}
