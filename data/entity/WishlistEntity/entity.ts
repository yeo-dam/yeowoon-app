import PostEntity from "../PostEntity";

export default interface Entity {
  id: string;
  posts: PostEntity[];
}
