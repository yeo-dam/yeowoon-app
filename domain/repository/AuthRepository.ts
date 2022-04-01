import CreateTokenDto from "~domain/dto/CreateTokenDto";
import PagerModel from "~domain/model/PagerModel/model";
import UserModel from "~domain/model/UserModel/model";
import BaseRepository, { ConstructorParameter } from "./Repository";

interface AuthRepository {}

export default class AuthRepositoryImpl
  extends BaseRepository
  implements AuthRepository
{
  private static _Instance: AuthRepositoryImpl;
  static GetInstace(args: ConstructorParameter) {
    if (!AuthRepositoryImpl._Instance) {
      AuthRepositoryImpl._Instance = new AuthRepositoryImpl(args);
    }
    return AuthRepositoryImpl._Instance;
  }

  private constructor(args: ConstructorParameter) {
    super(args);
  }

  async requestLoginToken(dto: { body: CreateTokenDto }) {
    try {
      const res = await this._remote._fetcher("/auth/loginToken", {
        method: "POST",
        body: JSON.stringify(dto.body),
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
}
