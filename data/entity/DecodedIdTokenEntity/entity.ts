import ProviderType from "~domain/enum/ProviderType";
import RoleType from "~domain/enum/RoleType";

export default interface Entity {
  email: string;
  exp: number;
  iat: number;
  provider: ProviderType;
  role: RoleType;
  sub: number;
  username: string;
}
