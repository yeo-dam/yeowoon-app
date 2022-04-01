import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import ListEntity from "~data/entity/ListEntity";
import PlaceEntity from "~data/entity/PlaceEntity";
import PagerModel from "~domain/model/PagerModel";
import PlaceModel from "~domain/model/PlaceModel/model";
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

  /** User <--> Place (One to Many) **/
  async findPlaces(): Promise<[PagerModel, PlaceModel[]]> {
    const placeEntities = await this._remote._fetcher<ListEntity<PlaceEntity>>(
      "/places"
    );

    const placeInstances = placeEntities.items.map((place) =>
      plainToClass<PlaceModel, PlaceEntity>(PlaceModel, { ...place })
    );

    const pagerInstance = plainToClass(PagerModel, {
      count: placeEntities.count,
      total: placeEntities.total,
      limit: placeEntities.limit,
      offset: placeEntities.offset,
    });

    placeInstances.forEach(async (item) => {
      const postError = await validate(item);
      if (postError.length > 0) {
        throw postError;
      }
    });

    const pagerErrors = await validate(pagerInstance);
    if (pagerErrors.length > 0) {
      throw pagerErrors;
    }

    return [pagerInstance, placeInstances];
  }
  // 장소를 클릭했을 때 부를 것
  async findPlaceById() {}

  /** User <--> Notification (One to Many) **/
  async findNotifications() {}

  async deleteNotificationById() {}

  /** User <--> Likes <--> Post (Many to Many) **/
  async addLikes() {}

  async deleteLikes() {}

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
