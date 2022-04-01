import PlaceSearchDto from "~domain/dto/PlaceSearchDto";
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

  async findPlace(dto: { query: PlaceSearchDto }) {
    try {
      // response가 정의되어야 해당하는 리스트들을 뿌려줄 수 있음
      const res = await this._remote._fetcher(
        `/place/search?keyword=${dto.query.keyword}`,
        {
          method: "GET",
        }
      );
      return res;
      // FIXME : querystring으로 값이 왜 안가는지 확인해 볼 것.
      // await this._remote._fetcher("/place/search", {
      //   method: "GET",
      //   querystring: {
      //     ...dto.query
      //   },
      // });
      // this._list.set(id, res)
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
