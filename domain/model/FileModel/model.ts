import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";
import TransformDate from "helper/transformDate";

class FileModel {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDate()
  @TransformDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @TransformDate()
  @IsNotEmpty()
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  bucket: string;

  @IsBoolean()
  @IsNotEmpty()
  resizable: boolean;

  @IsBoolean()
  @IsNotEmpty()
  downloadable: boolean;

  @IsString()
  @IsNotEmpty()
  filePath: string;

  @IsString()
  @IsNotEmpty()
  filename: string;
}

export default FileModel;
