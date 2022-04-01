import PostEntity from "../PostEntity";

export default interface Entity {
  id: string;
  title: string;
  posts: PostEntity[];
  createAt: Date;
  updatedAt?: Date;
}
