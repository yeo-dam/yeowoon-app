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

  async find(dto: {
    parameter: { postId: string };
    query: FindDto;
  }): Promise<CommentModel[]> {
    try {
      const { comments: commentEntities } = await this._remote._fetcher<{
        comments: CommentEntity[];
      }>(`/comment/list/${dto.parameter.postId}`);

      const commentInstances = commentEntities.map((comment) =>
        plainToClass<CommentModel, CommentEntity>(CommentModel, { ...comment })
      );

      commentInstances.forEach(async (item) => {
        if (item) {
          const postError = await validate(item);
          if (postError.length > 0) {
            throw postError;
          }
        }
      });
      return commentInstances;
    } catch (error) {
      throw error;
    }
  }
}
