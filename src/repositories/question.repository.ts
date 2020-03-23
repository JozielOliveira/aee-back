import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {AeeDataSource} from '../datasources';
import {Question, QuestionRelations, Response, Steps} from '../models';
import {ResponseRepository} from './response.repository';

export class QuestionRepository extends DefaultCrudRepository<
  Question,
  typeof Question.prototype.id,
  QuestionRelations
  > {

  public readonly step: BelongsToAccessor<Steps, typeof Steps.prototype.id>;
  public readonly responses: HasManyRepositoryFactory<Response, typeof Response.prototype.id>;

  constructor(
    @inject('datasources.aee') dataSource: AeeDataSource,
    @repository.getter('ResponseRepository') getResponseRepository: Getter<ResponseRepository>,
  ) {
    super(Question, dataSource);

    this.responses = this.createHasManyRepositoryFactoryFor(
      'responses',
      getResponseRepository,
    );
  }
}
