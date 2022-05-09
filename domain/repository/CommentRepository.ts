import { validate } from "class-validator";
import { plainToClass } from "unsafe-class-transformer";
import CommentEntity from "~data/entity/CommentEntity";
import CreateCommentDto from "~domain/dto/CreateCommentDto";
import FindDto from "~domain/dto/FindCommentDto";
import UpdateCommentDto from "~domain/dto/UpdateCommentDto";
import CommentModel from "~domain/model/Shared/CommentModel/model";
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
    query?: FindDto;
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

  // 댓글 달기
  /** User <--> Comments <--> Post (Many to Many) **/
  async addComment(dto: { body: CreateCommentDto }) {
    try {
      return await this._remote._fetcher("/comment/new", {
        method: "PUT",
        body: JSON.stringify(dto.body),
      });
    } catch (error) {
      throw error;
    }
  }

  // 댓글 수정하기
  async updateComment(dto: {
    paramenter: {
      commentId: string;
    };
    body: UpdateCommentDto;
  }) {
    try {
      const { id } = await this._remote._fetcher(
        `/comment/edit/${dto.paramenter.commentId}`,
        {
          method: "POST",
          body: JSON.stringify(dto.body),
        }
      );

      return id;
    } catch (error) {
      throw error;
    }
  }

  // 댓글 삭제하기
  async deleteComment(dto: {
    parameter: {
      commentId: string;
    };
  }) {
    try {
      const id = await this._remote._fetcher(
        `/comment/delete/${dto.parameter.commentId}`,
        {
          method: "DELETE",
        }
      );

      if (id) {
        console.log(id);
      }

      return id;
    } catch (error) {
      throw error;
    }
  }

  // 댓글 신고하기
  async reportComment() {}
}
