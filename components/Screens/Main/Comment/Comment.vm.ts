import { action, computed, flow, observable } from "mobx";
import FindDto from "~domain/dto/FindPostDto";
import UpdateCommentDto from "~domain/dto/UpdateCommentDto";
import CommentModel from "~domain/model/Shared/CommentModel";
import PagerModel from "~domain/model/Shared/PagerModel";
import CommentRepositoryImpl from "~domain/repository/CommentRepository";
import MeRepositoryImpl from "~domain/repository/MeRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../../BaseViewModel";

export default class CommentViewModel extends BaseViewModel {
  private static _Instance: CommentViewModel;
  private readonly _commentRepo: CommentRepositoryImpl;
  private readonly _meRepo: MeRepositoryImpl;

  static GetInstance(args: ConstructorParameter) {
    if (!CommentViewModel._Instance) {
      CommentViewModel._Instance = new CommentViewModel(args);
    }
    return CommentViewModel._Instance;
  }
  private constructor(args: ConstructorParameter) {
    super(args);
    if (args.accessToken) {
      this.setAccessToken(args.accessToken);
    }
    this._commentRepo = CommentRepositoryImpl.GetInstace({
      accessToken: args.accessToken,
    });
    this._meRepo = MeRepositoryImpl.GetInstace({
      accessToken: args.accessToken,
    });
  }

  @observable
  private _isLoading = observable.box<boolean>(false);

  @observable
  private _isError = observable.box<boolean>(false);

  @observable
  private _pager = observable.box<PagerModel>(undefined);

  @observable
  private _comments = observable.map<string, CommentModel>(undefined);

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @computed
  public get isError() {
    return this._isError.get();
  }

  @computed
  public get comments() {
    return [...this._comments.values()];
  }

  @computed
  public get pager() {
    return this._pager.get();
  }

  @action
  load = flow(function* (
    this: CommentViewModel,
    postId: string,
    query: FindDto
  ) {
    try {
      // 페이지에서 새롭게 조회할 때 리셋
      this._comments.clear();
      this._isLoading.set(true);
      const commentInstances = yield this._commentRepo.find({
        parameter: {
          postId,
        },
        query,
      });
      commentInstances.forEach((item: CommentModel) => {
        this._comments.set(item.commentId, item);
      });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  addComment = flow(function* (
    this: CommentViewModel,
    postId: string,
    comment: string,
    group?: number
  ) {
    try {
      this._isLoading.set(true);
      const id = yield this._commentRepo.addComment({
        body: {
          postId,
          comment,
          group,
        },
      });

      if (id) {
        const commentInstances = yield this._commentRepo.find({
          parameter: {
            postId,
          },
        });
        commentInstances.forEach((item: CommentModel) => {
          this._comments.set(item.commentId, item);
        });
      }
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  updateComment = flow(function* (
    this: CommentViewModel,
    commentId: string,
    dto: UpdateCommentDto
  ) {
    try {
      this._isLoading.set(true);
      yield this._commentRepo.updateComment({
        paramenter: {
          commentId,
        },
        body: dto,
      });
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  deleteComment = flow(function* (this: CommentViewModel, commentId: string) {
    try {
      this._isLoading.set(true);
      const id = yield this._commentRepo.deleteComment({
        parameter: {
          commentId,
        },
      });
      if (id) {
        this._comments.delete(commentId);
      }
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  reportComment = flow(function* (this: CommentViewModel) {
    try {
      this._isLoading.set(true);
      yield this._commentRepo.reportComment();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });
}
