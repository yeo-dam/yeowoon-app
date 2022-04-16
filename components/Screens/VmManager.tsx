import React, { PropsWithChildren, useContext } from "react";
import AuthViewModel, { AuthTokenType } from "./AuthViewModel";
import CommentViewModel from "./Main/Comment/Comment.vm";
import MainViewModel from "./Main/Main.vm";
import SearchViewModel from "./Main/Search/Search.vm";
import MyPageViewModel from "./MyPage/MyPage.vm";
import CreateSearchViewModel from "./Create/Post/Search/Search.vm";
import LikeViewModel from "./MyPage/Likes/Likes.vm";
import MapViewModel from "./MyPage/Map/Map.vm";
import SettingViewModel from "./MyPage/Setting/Setting.vm";
import ProfileEditViewModel from "./MyPage/Setting/ProfileEdit/ProfileEdit.vm";
import EventViewModel from "./MyPage/Setting/Event/Event.vm";
import NoticeViewModel from "./MyPage/Setting/Notice/Notice.vm";
import NotificationViewModel from "./MyPage/Setting/Notification/Notification.vm";
import PolicyViewModel from "./MyPage/Setting/Policy/Policy.vm";
import UserViewModel from "./MyPage/Users/UserList.vm";
import PostViewModel from "./Create/Post/CreatePost.vm";
import DetailViewModel from "./Main/Detail/Detail.vm";

const createViewModel = ({
  accessToken,
}: Pick<AuthTokenType, "accessToken">) => {
  return {
    tab: {
      Main: MainViewModel.GetInstance({ accessToken }),
      Search: SearchViewModel.GetInstance({ accessToken }),
      Detail: DetailViewModel.GetInstance({ accessToken }),
      CreateSearch: CreateSearchViewModel.GetInstance({ accessToken }),
      Comment: CommentViewModel.GetInstance({ accessToken }),
      Post: PostViewModel.GetInstance({ accessToken }),
      MyPage: MyPageViewModel.GetInstance({ accessToken }),
      Likes: LikeViewModel.GetInstance({ accessToken }),
      Map: MapViewModel.GetInstance({ accessToken }),
      User: UserViewModel.GetInstance({ accessToken }),
      Setting: SettingViewModel.GetInstance({ accessToken }),
      Event: EventViewModel.GetInstance({ accessToken }),
      Notice: NoticeViewModel.GetInstance({ accessToken }),
      Notification: NotificationViewModel.GetInstance({
        accessToken,
      }),
      Policy: PolicyViewModel.GetInstance({ accessToken }),
      ProfileEdit: ProfileEditViewModel.GetInstance({
        accessToken,
      }),
    },
    auth: AuthViewModel.GetInstance({ accessToken }),
  };
};

export type RootViewModel = ReturnType<typeof createViewModel>;
const vmCtx = React.createContext<RootViewModel | null>(null);

const ViewModelProvider: React.FunctionComponent<
  PropsWithChildren<Pick<AuthTokenType, "accessToken">>
> = ({ accessToken, children }) => {
  return (
    <vmCtx.Provider value={createViewModel({ accessToken })}>
      {children}
    </vmCtx.Provider>
  );
};

export const getRootViewModel = function <Selection>(
  dataSelector: (rootVm: RootViewModel) => Selection
) {
  return (function <ContextData, Store>(
    context: React.Context<ContextData>,
    storeSelector: (contextData: ContextData) => Store,
    dataSelectorFunc: (store: Store) => Selection
  ) {
    const value = useContext(context);

    if (!value) {
      throw new Error("useStore must be used within a StoreProvider");
    }
    const store = storeSelector(value);
    return dataSelectorFunc(store);
  })(vmCtx, (contextData) => contextData!, dataSelector);
};

export default ViewModelProvider;
