import { validate } from "class-validator";
import { plainToClass } from "unsafe-class-transformer";
import CommentEntity from "~data/entity/CommentEntity";
import ListEntity from "~data/entity/ListEntity";
import FindDto from "~domain/dto/FindCommentDto";
import CommentModel from "~domain/model/Shared/CommentModel/model";
import PagerModel from "~domain/model/Shared/PagerModel/model";
import BaseRepository, { ConstructorParameter } from "./Repository";

interface CommentRepository {}

export default class CommentRepositoryImpl
  extends BaseRepository
  implements CommentRepository
{
  private static _Instance: CommentRepositoryImpl;
  static GetInstace(args: ConstructorParameter) {
    if (!CommentRepositoryImpl._Instance) {
      CommentRepositoryImpl._Instance = new CommentRepositoryImpl(args);
    }
    return CommentRepositoryImpl._Instance;
  }

  private constructor(args: ConstructorParameter) {
    super(args);
  }

  async find(dto: { query: FindDto }): Promise<[PagerModel, CommentModel[]]> {
    const postlistEntities = await this._remote._fetcher<
      ListEntity<CommentEntity>
    >("/comments");

    const commentInstances = postlistEntities.items.map((post) =>
      plainToClass<CommentModel, CommentEntity>(CommentModel, { ...post })
    );

    const pagerInstance = plainToClass(PagerModel, {
      count: postlistEntities.count,
      total: postlistEntities.total,
      limit: postlistEntities.limit,
      offset: postlistEntities.offset,
    });

    commentInstances.forEach(async (item) => {
      const postError = await validate(item);
      if (postError.length > 0) {
        throw postError;
      }
    });

    const pagerErrors = await validate(pagerInstance);
    if (pagerErrors.length > 0) {
      throw pagerErrors;
    }

    return [pagerInstance, commentInstances];
  }
}
