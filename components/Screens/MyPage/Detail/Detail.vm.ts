import { action, computed, flow, observable } from "mobx";
import FindDto from "~domain/dto/FindPostDto";
import PostListModel from "~domain/model/Local/PostListModel";
import CommentModel from "~domain/model/Shared/CommentModel";
import PagerModel from "~domain/model/Shared/PagerModel";
import CommentRepositoryImpl from "~domain/repository/CommentRepository";
import MeRepositoryImpl from "~domain/repository/MeRepository";
import PostRepositoryImpl from "~domain/repository/PostRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../../BaseViewModel";

export default class MyPageDetailViewModel extends BaseViewModel {
  private static _Instance: MyPageDetailViewModel;
  private readonly _postRepo: PostRepositoryImpl;
  private readonly _meRepo: MeRepositoryImpl;

  static GetInstance(args: ConstructorParameter) {
    if (!MyPageDetailViewModel._Instance) {
      MyPageDetailViewModel._Instance = new MyPageDetailViewModel(args);
    }
    return MyPageDetailViewModel._Instance;
  }
  private constructor(args: ConstructorParameter) {
    super(args);
    if (args.accessToken) {
      this.setAccessToken(args.accessToken);
    }
    this._postRepo = PostRepositoryImpl.GetInstace({
      accessToken: args.accessToken,
    });
    this._meRepo = MeRepositoryImpl.GetInstace({
      accessToken: args.accessToken,
    });
  }

  @observable
  private _isLoading = observable.box<boolean>(false);

  @observable
  private _post = observable.box<PostListModel>(undefined);

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @computed
  public get post() {
    return this._post.get();
  }

  @action
  load = flow(function* (this: MyPageDetailViewModel) {
    try {
      this._isLoading.set(true);
      const post: any = this._postRepo.findPostById();
      this._post.set(post);
    } catch (error) {
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  addLikes = flow(function* (
    this: MyPageDetailViewModel,
    postId: string,
    userId: string
  ) {
    try {
      yield this._meRepo.addLikes({
        parameter: {
          postId,
          userId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  @action
  deleteLikes = flow(function* (
    this: MyPageDetailViewModel,
    postId: string,
    userId: string
  ) {
    try {
      yield this._meRepo.deleteLikes({
        parameter: {
          postId,
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  });
}
