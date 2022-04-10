import PagerModel from "~domain/model/Shared/PagerModel";
import PostModel from "~domain/model/Shared/PostModel/model";
import PostRepositoryImpl from "domain/repository/PostRepository";
import { action, computed, flow, observable } from "mobx";
import FindDto from "~domain/dto/FindPostDto";
import MeRepositoryImpl from "~domain/repository/MeRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../BaseViewModel";
import PostListModel from "~domain/model/Local/PostListModel";

export default class MainViewModel extends BaseViewModel {
  private static _Instance: MainViewModel;
  private readonly _postRepo: PostRepositoryImpl;
  private readonly _meRepo: MeRepositoryImpl;

  static GetInstance(args: ConstructorParameter) {
    if (!MainViewModel._Instance) {
      MainViewModel._Instance = new MainViewModel(args);
    }

    return MainViewModel._Instance;
  }
  private constructor(args: ConstructorParameter) {
    super(args);
    if (args.accessToken) {
      this.setAccessToken(args.accessToken);
    }
    this._postRepo = PostRepositoryImpl.GetInstace({
      accessToken: args.accessToken,
    });
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
  private _posts = observable.map<string, PostListModel>(undefined);

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @computed
  public get isError() {
    return this._isError.get();
  }

  @computed
  public get posts() {
    return [...this._posts.values()];
  }

  @computed
  public get pager() {
    return this._pager.get();
  }

  @action
  load = flow(function* (this: MainViewModel, query: FindDto) {
    try {
      this._isLoading.set(true);
      const postInstances = yield this._postRepo.find({ query });
      postInstances.forEach((item: PostListModel) => {
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
  addWishlist = flow(function* (this: MainViewModel) {
    try {
      yield this._meRepo.addWishlist();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    }
  });

  @action
  addLikes = flow(function* (
    this: MainViewModel,
    postId: string,
    userId: string
  ) {
    try {
      yield this._meRepo.addLikes({
        parameter: {
          postId,
          userId,
        },
      });
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    }
  });

  @action
  deleteLikes = flow(function* (
    this: MainViewModel,
    postId: string,
    userId: string
  ) {
    try {
      yield this._meRepo.deleteLikes({
        parameter: {
          postId,
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  });

  @action
  downloadImage = flow(function* (this: MainViewModel) {
    try {
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    }
  });

  @action
  share = flow(function* (this: MainViewModel) {
    try {
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
    }
  });
}
