import PagerModel from "~domain/model/Shared/PagerModel";
import WishlistModel from "~domain/model/Shared/BookmarkModel";
import { action, computed, flow, observable } from "mobx";
import MeRepositoryImpl from "~domain/repository/MeRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../BaseViewModel";
import UserModel from "~domain/model/Shared/UserModel/model";

export default class ThisViewModel extends BaseViewModel {
  private static _Instance: ThisViewModel;
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
    this._meRepo = MeRepositoryImpl.GetInstace({
      accessToken: args.accessToken,
    });
  }

  @observable
  private _isLoading = observable.box<boolean>(false);

  @observable
  private _isError = observable.box<boolean>(false);

  @observable
  private _pager = observable.box<PagerModel>(undefined);

  @observable
  private _user = observable.box<UserModel>(undefined);

  @observable
  private _wishlist = observable.map<string, WishlistModel>(undefined);

  @computed
  public get user() {
    return this._user.get();
  }

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @computed
  public get isError() {
    return this._isError.get();
  }

  @computed
  public get wishlists() {
    return [...this._wishlist.values()];
  }

  @computed
  public get pager() {
    return this._pager.get();
  }

  @action
  load = flow(function* (this: ThisViewModel) {
    try {
      this._isLoading.set(true);
      // const [pager, wishlistInstances] = yield this._meRepo.findWishlist();
      // wishlistInstances.forEach((item: WishlistModel) => {
      //   this._wishlist.set(item.id, item);
      // });
      // this._pager.set(pager);
    } catch (error) {
      console.error(error);
      this._isError.set(true);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  });
}
