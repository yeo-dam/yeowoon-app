import PagerModel from "domain/model/PagerModel";
import PostModel from "domain/model/PostModel/model";
import PostRepositoryImpl from "domain/repository/PostRepository";
import { action, computed, flow, observable } from "mobx";
import FindDto from "~domain/dto/FindPostDto";
import MeRepositoryImpl from "~domain/repository/MeRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../BaseViewModel";

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
  private _posts = observable.map<string, PostModel>(undefined);

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
      const [pager, postInstances] = yield this._postRepo.find({ query });
      postInstances.forEach((item: PostModel) => {
        this._posts.set(item.id, item);
      });
      this._pager.set(pager);
    } catch (error) {
      console.error(error);
      this._isError.set(true);
      throw error;
    }
  });

  @action
  addWishlist = flow(function* (this: MainViewModel) {
    try {
      // this._isLoading.set(true);
      yield this._meRepo.addWishlist();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      // this._isLoading.set(false);
    }
  });

  @action
  addLikes = flow(function* (this: MainViewModel) {
    try {
      // this._isLoading.set(true);
      yield this._meRepo.addLikes();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      // this._isLoading.set(false);
    }
  });

  @action
  deleteLikes = flow(function* (this: MainViewModel) {
    try {
      // this._isLoading.set(true);
      yield this._meRepo.deleteLikes();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      // this._isLoading.set(false);
    }
  });

  @action
  downloadImage = flow(function* (this: MainViewModel) {
    try {
      // this._isLoading.set(true);
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      // this._isLoading.set(false);
    }
  });

  @action
  share = flow(function* (this: MainViewModel) {
    try {
      // this._isLoading.set(true);
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      // this._isLoading.set(false);
    }
  });
}
