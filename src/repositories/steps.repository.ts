import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {AeeDataSource} from '../datasources';
import {Question, Quiz, Steps, StepsRelations} from '../models';
import {QuestionRepository} from './question.repository';

export class StepsRepository extends DefaultCrudRepository<
  Steps,
  typeof Steps.prototype.id,
  StepsRelations
  > {

  public readonly quiz: BelongsToAccessor<Quiz, typeof Quiz.prototype.id>;
  public readonly questions: HasManyRepositoryFactory<Question, typeof Question.prototype.id>;

  constructor(
    @inject('datasources.aee') dataSource: AeeDataSource,
    @repository.getter('QuestionRepository')
    getQuestionRepository: Getter<QuestionRepository>,
  ) {
    super(Steps, dataSource);

    this.questions = this.createHasManyRepositoryFactoryFor(
      'questions',
      getQuestionRepository,
    );
  }
}
