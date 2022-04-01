import PlaceRepositoryImpl from "~domain/repository/PlaceRepository";
import { action, computed, flow, observable } from "mobx";
import PagerModel from "~domain/model/PagerModel";
import PlaceModel from "~domain/model/PlaceModel/model";
import MeRepositoryImpl from "~domain/repository/MeRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../../BaseViewModel";

export default class MapViewModel extends BaseViewModel {
  private static _Instance: MapViewModel;
  private readonly _PlaceRepo: PlaceRepositoryImpl;
  private readonly _MeRepo: MeRepositoryImpl;

  static GetInstance(args: ConstructorParameter) {
    if (!MapViewModel._Instance) {
      MapViewModel._Instance = new MapViewModel(args);
    }
    return MapViewModel._Instance;
  }
  private constructor(args: ConstructorParameter) {
    super(args);
    if (args.accessToken) {
      this.setAccessToken(args.accessToken);
    }
    this._PlaceRepo = PlaceRepositoryImpl.GetInstace({
      accessToken: args.accessToken,
    });
    this._MeRepo = MeRepositoryImpl.GetInstace({
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
  private _places = observable.map<number, PlaceModel>(undefined);

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @computed
  public get isError() {
    return this._isError.get();
  }

  @computed
  public get places() {
    return [...this._places.values()];
  }

  @computed
  public get pager() {
    return this._pager.get();
  }

  @action
  setError = (data: boolean) => {
    this._isError.set(data);
  };

  @action
  load = flow(function* (this: MapViewModel) {
    try {
      this._isLoading.set(true);
      const [pager, placeInstances] = yield this._MeRepo.findPlaces();
      placeInstances.forEach((item: PlaceModel) => {
        this._places.set(item.placeId, item);
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
  findPlaceById = flow(function* (this: MapViewModel, placeId: number) {
    try {
      this._isLoading.set(true);
      yield this._PlaceRepo.findPlaceById({
        parameter: {
          placeId,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      this._isLoading.set(false);
    }
  });
}
