import { action, computed, flow, observable } from "mobx";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../../../BaseViewModel";

export default class SearchViewModel extends BaseViewModel {
  private static _Instance: SearchViewModel;

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
  load = flow(function* (this: SearchViewModel) {
    this._isLoading.set(true);
    this._isLoading.set(false);
  });
}
