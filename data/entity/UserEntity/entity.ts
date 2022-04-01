import ProviderType from "domain/enum/ProviderType";
import UserMbtiType from "domain/enum/UserMbtiType";
import ImageFileEntity from "../ImageFileEntity";

export default interface Entity {
  id: string;
  name: string;
  email: string;
  userType: UserMbtiType;
  createdAt: Date;
  providerType?: ProviderType;
  avatar?: ImageFileEntity;
}
