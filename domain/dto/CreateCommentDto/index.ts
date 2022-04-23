import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class CreateCommentDto {
  postId: string;
  
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  @IsOptional()
  group?: number;
}
