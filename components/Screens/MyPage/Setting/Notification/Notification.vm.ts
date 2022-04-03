import PagerModel from "~domain/model/Shared/PagerModel";
import PostModel from "~domain/model/Shared/PostModel/model";
import { action, computed, flow, observable } from "mobx";
import NotificationModel from "~domain/model/Shared/NotificationModel";
import MeRepositoryImpl from "~domain/repository/MeRepository";
import NotificationRepositoryImpl from "~domain/repository/NotificationRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "components/Screens/BaseViewModel";

export default class ThisViewModel extends BaseViewModel {
  private static _Instance: ThisViewModel;
  private readonly _NotificationRepo: NotificationRepositoryImpl;
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
    this._NotificationRepo = NotificationRepositoryImpl.GetInstace({
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
  private _notifications = observable.map<string, NotificationModel>(undefined);

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
    return [...this._notifications.values()];
  }

  @computed
  public get pager() {
    return this._pager.get();
  }

  @action
  load = flow(function* (this: ThisViewModel) {
    try {
      this._isLoading.set(true);
      const [pager, postInstances] = yield this._meRepo.findNotifications();
      // TODO : 추후에 아래 메서드로 변경해 줄 것.
      // const [pager, postInstances] = yield this._meRepo.findPosts();
      postInstances.forEach((item: NotificationModel) => {
        this._notifications.set(item.id, item);
      });
      this._pager.set(pager);
    } catch (error) {
      console.error(error);
      this._isError.set(true);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  deleteNotificationById = flow(function* (this: ThisViewModel) {
    try {
      this._isLoading.set(true);
      yield this._meRepo.deleteNotificationById();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });
}
