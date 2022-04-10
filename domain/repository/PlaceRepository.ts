import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import PlaceSearchDto from "~domain/dto/PlaceSearchDto";
import PlaceListModel, {
  PlaceListJson,
} from "~domain/model/Local/PlaceListModel";
import BaseRepository, { ConstructorParameter } from "./Repository";

interface PlaceRepository {}

export default class PlaceRepositoryImpl
  extends BaseRepository
  implements PlaceRepository
{
  private static _Instance: PlaceRepositoryImpl;
  static GetInstace(args: ConstructorParameter) {
    if (!PlaceRepositoryImpl._Instance) {
      PlaceRepositoryImpl._Instance = new PlaceRepositoryImpl(args);
    }
    return PlaceRepositoryImpl._Instance;
  }

  private constructor(args: ConstructorParameter) {
    super(args);
  }

  async findPlace(dto: { query: PlaceSearchDto }): Promise<PlaceListModel[]> {
    try {
      const placeList = await this._remote._fetcher<PlaceListJson[]>(
        `/place/search?keyword=${dto.query.keyword}`,
        {
          method: "GET",
        }
      );

      const placeInstances = placeList.map((place: PlaceListJson) =>
        plainToClass<PlaceListModel, PlaceListJson>(PlaceListModel, place)
      );

      placeInstances.forEach(async (item: PlaceListModel) => {
        const postError = await validate(item);
        if (postError.length > 0) {
          throw postError;
        }
      });

      return placeInstances;
    } catch (error) {
      throw error;
    }
  }

  async findPlaceById(dto: {
    parameter: {
      placeId: number;
    };
  }) {
    try {
      return await this._remote._fetcher(
        `/place/detail/${dto.parameter.placeId}`
      );
    } catch (error) {
      throw error;
    }
  }
}
