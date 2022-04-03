import { action, computed, flow, observable } from "mobx";
import ProviderType from "~domain/enum/ProviderType";
import DecodedIdTokenModel from "~domain/model/Shared/DecodedIdTokenModel";
import AuthRepositoryImpl from "~domain/repository/AuthRepository";
import { ConstructorParameter } from "~domain/repository/Repository";

export type AuthTokenType = {
  accessToken: string;
  providerType?: ProviderType;
  refreshToken?: string;
};

export default class AuthViewModel {
  private static _Instance: AuthViewModel;
  private _authRepo: AuthRepositoryImpl;

  static GetInstance(args: ConstructorParameter) {
    if (!AuthViewModel._Instance) {
      AuthViewModel._Instance = new AuthViewModel(args);
    }
    return AuthViewModel._Instance;
  }

  constructor(args: ConstructorParameter) {
    this._authRepo = AuthRepositoryImpl.GetInstace(args);
  }

  @observable
  private _auth = observable.box<AuthTokenType | undefined>(undefined);

  @observable
  private _user = observable.box<DecodedIdTokenModel>(undefined);

  @computed
  public get auth() {
    return this._auth.get();
  }

  @computed
  public get user() {
    return this._user.get();
  }

  @action
  setLoginToken(accessToken: string) {
    this._auth.set({ accessToken });
  }

  @action
  deleteLoginToken() {
    this._auth.set(undefined);
  }

  @action
  setUserInfo(decodedIdToken: DecodedIdTokenModel) {
    this._user.set(decodedIdToken);
  }

  @flow
  requestLoginToken = flow(function* (
    this: AuthViewModel,
    accessToken: string,
    provider: ProviderType
  ) {
    try {
      const response = yield this._authRepo.requestLoginToken({
        body: {
          accessToken,
          provider,
        },
      });

      if (response) {
        return response;
      }
    } catch (error) {
      throw error;
    }
  });
}
