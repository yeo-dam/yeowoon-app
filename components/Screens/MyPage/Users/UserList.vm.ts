import PagerModel from "~domain/model/Shared/PagerModel";
import PostModel from "~domain/model/Shared/PostModel/model";
import { action, computed, flow, observable } from "mobx";
import UserModel from "~domain/model/Shared/UserModel/model";
import MeRepositoryImpl from "~domain/repository/MeRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import UserRepositoryImpl from "~domain/repository/UserRepository";
import BaseViewModel from "../../BaseViewModel";

export default class ThisViewModel extends BaseViewModel {
  private static _Instance: ThisViewModel;
  private readonly _userRepo: UserRepositoryImpl;
  private readonly _meRepo: MeRepositoryImpl;

  static GetInstance(args: ConstructorParameter) {
    if (!ThisViewModel._Instance) {
      ThisViewModel._Instance = new ThisViewModel(args);
    }
    return ThisViewModel._Instance;
  }
  private constructor(args: ConstructorParameter) {
    super(args);
    if (args.accessToken) {
      this.setAccessToken(args.accessToken);
    }
  }

  @observable
  private _isLoading = observable.box<boolean>(false);

  @observable
  private _isError = observable.box<boolean>(false);

  @observable
  private _pager = observable.box<PagerModel>(undefined);

  @observable
  private _users = observable.map<string, UserModel>(undefined);

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @computed
  public get isError() {
    return this._isError.get();
  }

  @computed
  public get users() {
    return [...this._users.values()];
  }

  @computed
  public get pager() {
    return this._pager.get();
  }

  @action
  load = flow(function* (this: ThisViewModel) {
    try {
      this._isLoading.set(true);
      const [pagerInstance, userInstances] = yield this._userRepo.find();
      // TODO : 추후에 아래 메서드로 변경해 줄 것.
      // const [pagerInstance, userInstances] = yield this._meRepo.findPosts();
      userInstances.forEach((item: UserModel) => {
        this._users.set(item.userId, item);
      });
      this._pager.set(pagerInstance);
    } catch (error) {
      console.error(error);
      this._isError.set(true);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  follow = flow(function* (this: ThisViewModel) {
    try {
      this._isLoading.set(true);
      yield this._meRepo.follow();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  unfollow = flow(function* (this: ThisViewModel) {
    try {
      this._isLoading.set(true);
      yield this._meRepo.unfollow();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });
}
