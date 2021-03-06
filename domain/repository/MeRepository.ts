import { validate } from "class-validator";
import { plainToClass } from "unsafe-class-transformer";
import PlaceEntity from "~data/entity/PlaceEntity";
import UserEntity from "~data/entity/UserEntity";
import { markers } from "~domain/model/Local/MapListModel/mock";
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

      console.log(
        `TCL ~ [MeRepository.ts] ~ line ~ 50 ~ userDetail`,
        userDetail
      );

      const userInstance = plainToClass<UserDetailModel, UserDetailJson>(
        UserDetailModel,
        userDetail
      );

      const validateError = await validate(userInstance);

      if (validateError.length > 0) {
        throw validateError;
      }

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
  }) {
    try {
      const { posts: placeEntities } = await this._remote._fetcher<{
        posts: PlaceEntity[];
      }>(`/post/user/${dto.parameter.userId}`, {
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
      console.error(error);
    }
  }

  // 장소를 클릭했을 때 부를 것
  findPlaces() {
    try {
      // if (process.env.mode === "DEVELOPMENT") {
      return markers;
      // }
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
}
