import UserEntity from "../UserEntity";

export default interface Entity {
  commentId: string;
  content: string;
  user: UserEntity;
  likeCount: number;
  group?: number;
  createdDateTime: Date;
  isGroup: boolean;
  isWriter: boolean;
}
