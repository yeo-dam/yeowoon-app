import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { isDevelopmentMode } from "utils/detectMode";
import CommentEntity from "~data/entity/CommentEntity";
import ListEntity from "~data/entity/ListEntity";
import FindDto from "~domain/dto/FindCommentDto";
import { genCommentMockObject } from "~domain/model/CommentModel/mock";
import CommentModel from "~domain/model/CommentModel/model";
import PagerModel from "~domain/model/PagerModel/model";
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
    if (isDevelopmentMode) {
      const limitNum = Number(dto.query.limit);
      const offsetNum = Number(dto.query.offset);
      const mockArr = new Array(4);

      for (let index = 0; index < 4; index++) {
        mockArr[index] = genCommentMockObject();
      }

      const mockList: ListEntity<CommentEntity> = {
        items: [...mockArr.slice(offsetNum, offsetNum + limitNum)],
        count: 4,
        total: 100,
        limit: limitNum,
        offset: offsetNum,
      };

      const commentInstances = mockList.items.map((post) =>
        plainToClass<CommentModel, CommentEntity>(CommentModel, { ...post })
      );

      const pagerInstance = plainToClass(PagerModel, {
        count: mockList.count,
        total: mockList.total,
        limit: mockList.limit,
        offset: mockList.offset,
      });

      commentInstances.forEach(async (item) => {
        const postError = await validate(item);
        if (postError.length > 0) {
          throw postError;
        }
      });

      return [pagerInstance, commentInstances];
    } else {
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
}
