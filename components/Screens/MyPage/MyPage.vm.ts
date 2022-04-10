import PagerModel from "~domain/model/Shared/PagerModel";
import WishlistModel from "~domain/model/Shared/BookmarkModel";
import { action, computed, flow, observable } from "mobx";
import MeRepositoryImpl from "~domain/repository/MeRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../BaseViewModel";
import UserModel from "~domain/model/Shared/UserModel/model";
import UserDetailModel from "~domain/model/Local/UserDetailModel";
import PostListModel from "~domain/model/Local/PostListModel";

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
  private _userDetail = observable.box<UserDetailModel>(undefined);

  @observable
  private _posts = observable.map<string, PostListModel>(undefined);

  @observable
  private _wishlist = observable.map<string, WishlistModel>(undefined);

  @computed
  public get userDetail() {
    return this._userDetail.get();
  }

  @computed
  public get posts() {
    return [...this._posts.values()];
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
  loadPosts = flow(function* (
    this: ThisViewModel,
    userId: string,
    pageNum: number
  ) {
    try {
      this._isLoading.set(true);
      const userMePosts = yield this._meRepo.findPosts({
        parameter: {
          userId,
        },
        querystring: {
          pageNum,
        },
      });
      userMePosts.forEach((item: PostListModel) => {
        this._posts.set(item.postId, item);
      });
    } catch (error) {
      console.error(error);
      this._isError.set(true);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  loadProfile = flow(function* (this: ThisViewModel, userId: string) {
    try {
      this._isLoading.set(true);
      const userMeInfo = yield this._meRepo.findProfileById({
        parameter: {
          userId,
        },
      });

      this._userDetail.set(userMeInfo);
    } catch (error) {
      console.error(error);
      this._isError.set(true);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  });
}
