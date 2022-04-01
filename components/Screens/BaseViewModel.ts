import { ConstructorParameter } from "~domain/repository/Repository";

export default abstract class BaseViewModel {
  public _accessToken: string;

  constructor(args: ConstructorParameter) {
    if (args.accessToken) {
      this.setAccessToken(args.accessToken);
    }
  }

  setAccessToken(accessToken: string) {
    this._accessToken = accessToken;
  }
}
