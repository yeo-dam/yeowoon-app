import { IsNotEmpty, IsString } from "class-validator";

class PlaylistModel {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}

export default PlaylistModel;
