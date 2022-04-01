import Fetcher, { FetcherRequest } from "helper/fetcher";
import { ConstructorParameter } from "~domain/repository/Repository";

class RemoteDataSource {
  private static _Instance: RemoteDataSource;
  public _accessToken?: string;
  public _fetcher = Fetcher;

  static GetInstance(args?: ConstructorParameter) {
    if (!RemoteDataSource._Instance) {
      RemoteDataSource._Instance = new RemoteDataSource(args);
    }
    return RemoteDataSource._Instance;
  }

  constructor(accessToken: any) {
    this.setAccessToken(accessToken);
  }

  setAccessToken(accessToken: any) {
    this._accessToken = accessToken;
    this._fetcher = (url: string, options?: FetcherRequest) => {
      return Fetcher(url, {
        ...options,
        accessToken: this._accessToken,
      });
    };
  }
}

export default RemoteDataSource;
