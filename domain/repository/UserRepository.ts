import { validate } from "class-validator";
import { plainToClass } from "unsafe-class-transformer";
import ListEntity from "~data/entity/ListEntity";
import UserEntity from "~data/entity/UserEntity";
import PagerModel from "~domain/model/PagerModel/model";
import UserModel from "~domain/model/UserModel/model";
import BaseRepository, { ConstructorParameter } from "./Repository";

interface UserRepository {
  find(): Promise<[PagerModel, UserModel[]]>;
}

export default class UserRepositoryImpl
  extends BaseRepository
  implements UserRepository
{
  private static _Instance: UserRepositoryImpl;
  static GetInstace(args: ConstructorParameter) {
    if (!UserRepositoryImpl._Instance) {
      UserRepositoryImpl._Instance = new UserRepositoryImpl(args);
    }
    return UserRepositoryImpl._Instance;
  }

  private constructor(args: ConstructorParameter) {
    super(args);
  }

  async find(): Promise<[PagerModel, UserModel[]]> {
    const userlistEntities = await this._remote._fetcher<
      ListEntity<UserEntity>
    >("/users");
    const userListInstances = userlistEntities.items.map((post) =>
      plainToClass(UserModel, {
        ...post,
      })
    );

    const pagerInstance = plainToClass(PagerModel, {
      count: userlistEntities.count,
      total: userlistEntities.total,
      limit: userlistEntities.limit,
      offset: userlistEntities.offset,
    });

    userListInstances.forEach(async (item) => {
      const err = await validate(item);
      if (err.length > 0) {
        throw err;
      }
    });

    const pagerErrors = await validate(pagerInstance);
    if (pagerErrors.length > 0) {
      throw pagerErrors;
    }

    return [pagerInstance, userListInstances];
  }

  async findOneById() {}
}
