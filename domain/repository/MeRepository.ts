import { validate } from "class-validator";
import { plainToClass } from "unsafe-class-transformer";
import PlaceEntity from "~data/entity/PlaceEntity";
import UserEntity from "~data/entity/UserEntity";
import PostListModel from "~domain/model/Local/PostListModel";
import UserDetailModel, {
  UserDetailJson,
} from "~domain/model/Local/UserDetailModel";
import UserModel from "~domain/model/Shared/UserModel";
import BaseRepository, { ConstructorParameter } from "./Repository";

interface MeRepository {}

export default class MeRepositoryImpl
  extends BaseRepository
  implements MeRepository
{
  private static _Instance: MeRepositoryImpl;
  static GetInstace(args: ConstructorParameter) {
    if (!MeRepositoryImpl._Instance) {
      MeRepositoryImpl._Instance = new MeRepositoryImpl(args);
    }
    return MeRepositoryImpl._Instance;
  }

  private constructor(args: ConstructorParameter) {
    super(args);
  }

  /** User <--> User (One to One) **/
  async follow() {}

  async unfollow() {}

  /** User <--> Post (One to Many) **/
  // TODO : Map에 데이터 추가
  // TODO : 복수의 이미지 추가

  async findProfileById(dto: {
    parameter: {
      userId: string;
    };
  }): Promise<UserDetailModel> {
    try {
      const userDetail = await this._remote._fetcher<UserDetailJson>(
        `/profile/view/${dto.parameter.userId}`
      );

      // FIXME : 타입에러 잡기
      const userInstance = plainToClass<UserDetailModel, UserEntity>(
        UserDetailModel,
        userDetail
      );

      // FIXME: validation Error 잡기
      // const validateError = await validate(userInstance);

      // if (validateError) {
      //   throw validateError;
      // }

      return userInstance;
    } catch (error) {
      throw error;
    }
  }

  /** User <--> Place (One to Many) **/
  async findPosts(dto: {
    parameter: {
      userId: string;
    };
    querystring: {
      pageNum: number;
    };
  }): Promise<PostListModel[]> {
    try {
      const { posts: placeEntities } = await this._remote._fetcher<{
        posts: PlaceEntity[];
      }>(`/user/me/post/list/${dto.parameter.userId}`, {
        querystring: {
          page: dto.querystring.pageNum,
        },
      });

      const placeInstances = placeEntities.map((place: PlaceEntity) =>
        plainToClass<PostListModel, PlaceEntity>(PostListModel, { ...place })
      );

      placeInstances.forEach(async (item) => {
        const postError = await validate(item);
        if (postError.length > 0) {
          throw postError;
        }
      });

      return placeInstances;
    } catch (error) {
      throw error;
    }
  }
  // 장소를 클릭했을 때 부를 것
  async findPlaceById() {}

  /** User <--> Notification (One to Many) **/
  async findNotifications() {}

  async deleteNotificationById() {}

  /** User <--> Likes <--> Post (Many to Many) **/
  async addLikes(dto: {
    parameter: {
      postId: string;
      userId: string;
    };
  }) {
    try {
      await this._remote._fetcher<any>(
        `/like/post/${dto.parameter.postId}/${dto.parameter.userId}`,
        {
          method: "PUT",
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteLikes(dto: {
    parameter: {
      postId: string;
      userId: string;
    };
  }) {
    try {
      await this._remote._fetcher<any>(
        `/like/post/${dto.parameter.postId}/${dto.parameter.userId}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      throw error;
    }
  }

  // TODO: 어떤 테이블이 와야할지 모르겠음.
  async addWishlist() {}

  async findWishlist() {}

  /** User <--> Comments <--> Post (Many to Many) **/
  // 댓글 달기
  async addComment() {}

  // 댓글 수정하기
  async updateComment() {}

  // 댓글 삭제하기
  async deleteComment() {}

  // 댓글 신고하기
  async reportComment() {}

  // TODO : 대댓글 달기. 클라에선 코멘트 ID만 전송해주면 된다. 관계 설정하고 처리해주는 건 백엔드 몫. 단, 유즈케이스는 분리하는게 맞아보임.
  async addNestedComment() {}
}
