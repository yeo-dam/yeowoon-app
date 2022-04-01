import RemoteDataSource from "~data/remote/RemoteDataSource";

export type ConstructorParameter = {
  accessToken?: string;
};

class BaseRepository {
  public _accessToken?: string;
  public readonly _remote: RemoteDataSource;

  constructor(args?: ConstructorParameter) {
    if (!args) {
      return;
    }
    this._accessToken = args.accessToken;
    this._remote = RemoteDataSource.GetInstance({
      accessToken: args.accessToken,
    });
    this._remote.setAccessToken(this._accessToken);
  }

  setAccessToken(accessToken: any) {
    this._accessToken = accessToken;
    this._remote.setAccessToken(accessToken);
  }

  protected get accessToken() {
    return this._accessToken;
  }
}

export default BaseRepository;
