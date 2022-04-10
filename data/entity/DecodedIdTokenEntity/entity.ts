import ProviderType from "~domain/enum/ProviderType";
import RoleType from "~domain/enum/RoleType";

export default interface Entity {
  email: string;
  exp: Date;
  id: string;
  iat: Date;
  provider: ProviderType;
  role: RoleType;
  sub: number;
  username: string;
}
