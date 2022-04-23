import { action, computed, flow, observable } from "mobx";
import FindDto from "~domain/dto/FindPostDto";
import CommentModel from "~domain/model/Shared/CommentModel";
import PagerModel from "~domain/model/Shared/PagerModel";
import CommentRepositoryImpl from "~domain/repository/CommentRepository";
import MeRepositoryImpl from "~domain/repository/MeRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../../BaseViewModel";

export default class SearchViewModel extends BaseViewModel {
  private static _Instance: SearchViewModel;
  private readonly _commentRepo: CommentRepositoryImpl;
  private readonly _meRepo: MeRepositoryImpl;

  static GetInstance(args: ConstructorParameter) {
    if (!SearchViewModel._Instance) {
      SearchViewModel._Instance = new SearchViewModel(args);
    }
    return SearchViewModel._Instance;
  }
  private constructor(args: ConstructorParameter) {
    super(args);
    if (args.accessToken) {
      this.setAccessToken(args.accessToken);
    }
    this._commentRepo = CommentRepositoryImpl.GetInstace({
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
  private _comments = observable.map<string, CommentModel>(undefined);

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @computed
  public get isError() {
    return this._isError.get();
  }

  @computed
  public get comments() {
    return [...this._comments.values()];
  }

  @computed
  public get pager() {
    return this._pager.get();
  }

  @action
  load = flow(function* (this: SearchViewModel, query: FindDto) {
    try {
      // this._isLoading.set(true);
      // const [pagerInstance, commentInstances] = yield this._commentRepo.find({
      //   query,
      // });
      // commentInstances.forEach((item: CommentModel) => {
      //   this._comments.set(item.id, item);
      // });
      // this._pager.set(pagerInstance);
    } catch (error) {
      console.error(error);
      this._isError.set(true);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  addComment = flow(function* (this: SearchViewModel) {
    try {
      this._isLoading.set(true);
      // yield this._meRepo.addComment();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  addNestedComment = flow(function* (this: SearchViewModel) {
    try {
      this._isLoading.set(true);
      yield this._meRepo.addNestedComment();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  updateComment = flow(function* (this: SearchViewModel) {
    try {
      this._isLoading.set(true);
      yield this._meRepo.updateComment();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  deleteComment = flow(function* (this: SearchViewModel) {
    try {
      this._isLoading.set(true);
      yield this._meRepo.deleteComment();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  reportComment = flow(function* (this: SearchViewModel) {
    try {
      this._isLoading.set(true);
      yield this._meRepo.reportComment();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });
}
