import { Type } from "unsafe-class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import WishlistEntity from "~data/entity/WishlistEntity";
import PostModel from "../PostModel/model";

export default class WishlistModel implements WishlistEntity {
  @IsString()
  @IsNotEmpty()
  id: string;

  @Type(() => PostModel)
  @IsOptional()
  posts: PostModel[];
}
