import UserEntity from "../UserEntity";

export default interface Entity {
  id: string;
  content: string;
  user: UserEntity;
  createDateTime: Date;
  likeCount: number;
}
