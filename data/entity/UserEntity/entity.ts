import ProviderType from "~domain/enum/ProviderType";
import UserMbtiType from "~domain/enum/UserMbtiType";
import ImageFileEntity from "../ImageFileEntity";

export default interface Entity {
  userId: string;
  userName: string;
  email: string;
  userType: UserMbtiType;
  createdAt: Date;
  providerType?: ProviderType;
  userImage?: ImageFileEntity;
}
