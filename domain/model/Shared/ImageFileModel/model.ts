import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

class ImageFileModel {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export default ImageFileModel;
