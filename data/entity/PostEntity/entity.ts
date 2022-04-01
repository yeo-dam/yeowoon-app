import CommentEntity from "../CommentEntity";
import ImageFileEntity from "../ImageFileEntity";
import PlaceEntity from "../PlaceEntity";
import TagEntity from "../TagEntity";
import UserEntity from "../UserEntity";

export default interface Entity {
  id: string;
  user: UserEntity;
  place: PlaceEntity;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
  images: ImageFileEntity[];
  comments?: CommentEntity[];
  tags?: TagEntity[];
}
