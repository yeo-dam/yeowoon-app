import { IsNotEmpty, IsString, IsNumber } from "class-validator";

class ImageFileModel {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export default ImageFileModel;
