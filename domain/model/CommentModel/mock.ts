import CommentEntity from "~data/entity/CommentEntity";
import { genUserMockObject } from "../UserModel/mock";

export const genCommentMockObject = (): CommentEntity => {
  const newDay = new Date();
  return {
    id: String(Math.random() * 20),
    content: "강남은 언제왔다갔냠 쥐도새도모르게....쉑쉑 가격대비 별루",
    user: genUserMockObject(),
    createDateTime: new Date(newDay.setDate(newDay.getDate() - 1)),
    likeCount: 20,
  };
};
