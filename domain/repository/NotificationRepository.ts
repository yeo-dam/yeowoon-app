import BaseRepository, { ConstructorParameter } from "./Repository";

interface NotificationRepository {}

export default class NotificationRepositoryImpl
  extends BaseRepository
  implements NotificationRepository
{
  private static _Instance: NotificationRepositoryImpl;
  static GetInstace(args: ConstructorParameter) {
    if (!NotificationRepositoryImpl._Instance) {
      NotificationRepositoryImpl._Instance = new NotificationRepositoryImpl(
        args
      );
    }
    return NotificationRepositoryImpl._Instance;
  }

  private constructor(args: ConstructorParameter) {
    super(args);
  }

  async find() {}
}
