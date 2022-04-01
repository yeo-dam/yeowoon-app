import UserEntity from "~data/entity/UserEntity";
import ProviderType from "~domain/enum/ProviderType";
import UserMbtiType from "~domain/enum/UserMbtiType";

const genAvatarMockObject = () => {
  return {
    width: 200,
    height: 200,
    id: "11",
    createdAt: new Date(),
    updatedAt: new Date(),
    bucket: "bucket",
    resizable: false,
    downloadable: false,
    filePath: "https://picsum.photos/200/300",
    filename: "sampleImage",
  };
};

export const genUserMockObject = (): UserEntity => {
  return {
    id: "1",
    name: "love_trip",
    email: "MickeySeo@gmail.com",
    userType: UserMbtiType.EFFICIENT_TRAVELER,
    createdAt: new Date(),
    providerType: ProviderType.GOOGLE,
    avatar: genAvatarMockObject(),
  };
};
