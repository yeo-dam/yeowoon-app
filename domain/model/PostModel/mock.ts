import { plainToClass } from "class-transformer";
import PostEntity from "~data/entity/PostEntity";
import { genUserMockObject } from "~domain/model/UserModel/mock";
import PostModel from "./model";
import { genCommentMockObject } from "../CommentModel/mock";
import { genImageFileMockObject } from "../ImageFileModel/mock";
import { genPlaceMockObject } from "../PlaceModel/mock";
import { genTagMockObject } from "../TagModel/mock";

export const genPostMockObject = (): PostEntity => {
  return {
    id: String(Math.random() * 1000),
    user: genUserMockObject(),
    place: genPlaceMockObject(),
    title: "강남역 쉑쉑버거",
    description:
      "런칭당시부터 그리고 지금까지도 인기가 대단한 그 버거를 이제야 먹어봤어여 강남 쉑쉑버거 방문했습니당 :)",
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      genImageFileMockObject(),
      genImageFileMockObject(),
      genImageFileMockObject(),
    ],
    comments: [genCommentMockObject(), genCommentMockObject()],
    tags: [genTagMockObject(), genTagMockObject(), genTagMockObject()],
  };
};

export const genPostMockInstance = (): PostModel => {
  return plainToClass(PostModel, genPostMockObject());
};
