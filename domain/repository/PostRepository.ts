import { validate } from "class-validator";
import ListEntity from "~data/entity/ListEntity";
import PostEntity from "~data/entity/PostEntity";
import PagerModel from "~domain/model/Shared/PagerModel";
import BaseRepository, { ConstructorParameter } from "./Repository";
import FindDto from "~domain/dto/FindPostDto";
import CreatePostDto from "~domain/dto/CreatePostDto";
import { plainToClass } from "unsafe-class-transformer";
import PostListModel from "~domain/model/Local/PostListModel";

export default class PostRepositoryImpl extends BaseRepository {
  private static _Instance: PostRepositoryImpl;

  static GetInstace(args: ConstructorParameter) {
    if (!PostRepositoryImpl._Instance) {
      PostRepositoryImpl._Instance = new PostRepositoryImpl(args);
    }
    return PostRepositoryImpl._Instance;
  }

  private constructor(args: ConstructorParameter) {
    super(args);
  }

  // TODO : 다양한 쿼리 추가되어야 함
  /** 전체 Post 목록 불러오기 (필요 없을 수 있음) **/
  async find(dto: { query: FindDto }): Promise<PostListModel[]> {
    const { posts } = await this._remote._fetcher<{ posts: PostEntity[] }>(
      `/post/list`,
      {
        querystring: {
          page: dto.query.pageNum,
        },
      }
    );

    const postInstances = posts.map((post: PostEntity) =>
      plainToClass<PostListModel, PostEntity>(PostListModel, post)
    );

    postInstances.forEach(async (item: PostListModel) => {
      const postError = await validate(item);
      if (postError.length > 0) {
        throw postError;
      }
    });

    return postInstances;
  }

  async createPost(dto: { body: CreatePostDto }) {
    try {
      const res = await this._remote._fetcher("/post/new", {
        method: "PUT",
        body: JSON.stringify(dto.body),
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  async uploadImages(dto: { body: FormData }) {
    try {
      return await this._remote._fetcher("/image/upload/multiple", {
        method: "POST",
        body: dto.body,
      });
      // await this._remote._fetcher("/", {
      //   method: "POST",
      //   body: dto.body,
      // });
    } catch (error) {
      throw error;
    }
  }

  async findPostById() {}

  async updatePost() {}

  async deletePost() {}
}
