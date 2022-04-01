import PostRepositoryImpl from "domain/repository/PostRepository";
import { action, computed, flow, observable } from "mobx";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../../BaseViewModel";

export default class LikesViewModel extends BaseViewModel {
  private static _Instance: LikesViewModel;

  static GetInstance(args: ConstructorParameter) {
    if (!LikesViewModel._Instance) {
      LikesViewModel._Instance = new LikesViewModel(args);
    }
    return LikesViewModel._Instance;
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

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @computed
  public get isError() {
    return this._isError.get();
  }

  @action
  load = flow(function* (this: LikesViewModel) {
    this._isLoading.set(true);
    this._isLoading.set(false);
  });
}
