import { IsNotEmpty, IsString } from "class-validator";

export default class Model {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
