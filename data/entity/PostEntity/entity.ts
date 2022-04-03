import CommentEntity from "../CommentEntity";
import ImageFileEntity from "../ImageFileEntity";
import PlaceEntity from "../PlaceEntity";
import TagEntity from "../TagEntity";
import UserEntity from "../UserEntity";

export default interface Entity {
  postId: string;
  user: UserEntity;
  place: PlaceEntity;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
  imageLocations: ImageFileEntity[];
  comments?: CommentEntity[];
  tags?: TagEntity[];
}
