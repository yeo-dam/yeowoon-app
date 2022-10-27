# 여운 앱

### 로컬 서버 구동방법

<br />

- git clone

```
git clone https://github.com/yeo-dam/yeowoon-app.git
```

- package install

```
yarn install
```

- ios run

```
yarn ios
```

- android run

```
yarn android
```

### 소개

- **플랫폼** : 1인 개발 상황임을 고려하여, 개발 생산성이 높은 React Native과 까다로운 패키지 관리 문제를 해결해주는 Expo를 사용.
- **아키텍처** : 프레임워크와 독립적인 개발이 가능하도록 클린 아키텍처의 개념을 차용해 도입했고 각 레이어를 Data, Domain, Presentation Layer로 구분.
- **디자인 패턴과 상태관리** : Presentation Layer에서 View에서의 비즈니스 로직을 분리하기 위해 MVVM 디자인 패턴을 도입.

### 기획/디자인 시안

[디자인 시안 링크](https://www.figma.com/file/7Tdiuj1dEEzbNLmbG2WF5J/%EC%97%AC%EB%8B%B4_%EA%B0%9C%EB%B0%9C?node-id=506%3A88)

### 프로젝트 구조

```
├── App.tsx
├── Entry.tsx
├── Readme.md
├── app.json
├── assets
├── babel.config.js
├── components
│   ├── EditScreenInfo.tsx
│   ├── Layout
│   │   ├── ContentLayout.tsx
│   │   ├── FormLayout.tsx
│   │   ├── KeyboardLayout.tsx
│   │   └── StatusBarLayout.tsx
│   ├── Local
│   │   ├── DescriptionCard
│   │   │   └── index.tsx
│   │   ├── DescriptionForm
│   │   │   └── index.tsx
│   │   ├── GoogleMap
│   │   │   └── index.tsx
│   │   ├── ImageForm
│   │   │   └── index.tsx
│   │   ├── MainItemCard
│   │   │   └── index.tsx
│   │   ├── PhotoCard
│   │   │   └── index.tsx
│   │   ├── PhotoContainer
│   │   │   └── index.tsx
│   │   ├── PlaceTypeSelector
│   │   │   └── index.tsx
│   │   ├── ProfileCard
│   │   │   └── index.tsx
│   │   └── SearchForm
│   │       └── index.tsx
│   ├── Screens
│   │   ├── AuthViewModel.ts
│   │   ├── BaseViewModel.ts
│   │   ├── Create
│   │   │   ├── Post
│   │   │   │   ├── CreatePost.vm.ts
│   │   │   │   ├── ImageUpload
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Search
│   │   │   │   │   ├── Search.vm.ts
│   │   │   │   │   └── index.tsx
│   │   │   │   └── index.tsx
│   │   │   └── index.tsx
│   │   ├── Main
│   │   │   ├── Comment
│   │   │   │   ├── Comment.vm.ts
│   │   │   │   └── index.tsx
│   │   │   ├── Detail
│   │   │   │   ├── Detail.vm.ts
│   │   │   │   └── index.tsx
│   │   │   ├── Main.vm.ts
│   │   │   ├── Map
│   │   │   │   ├── Map.vm.ts
│   │   │   │   └── index.tsx
│   │   │   ├── Search
│   │   │   │   ├── Search.vm.ts
│   │   │   │   └── index.tsx
│   │   │   ├── index.Main.tsx
│   │   │   └── index.tsx
│   │   ├── ModalScreen.tsx
│   │   ├── MyPage
│   │   │   ├── Detail
│   │   │   │   ├── Detail.vm.ts
│   │   │   │   └── index.tsx
│   │   │   ├── Likes
│   │   │   │   ├── Likes.vm.ts
│   │   │   │   └── index.tsx
│   │   │   ├── Map
│   │   │   │   ├── Map.vm.ts
│   │   │   │   └── index.tsx
│   │   │   ├── MyPage.Main.tsx
│   │   │   ├── MyPage.vm.ts
│   │   │   ├── Setting
│   │   │   │   ├── Event
│   │   │   │   │   ├── Event.vm.ts
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Notice
│   │   │   │   │   ├── Notice.vm.ts
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Notification
│   │   │   │   │   ├── Notification.vm.ts
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Policy
│   │   │   │   │   ├── Policy.vm.ts
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── ProfileEdit
│   │   │   │   │   ├── ProfileEdit.vm.ts
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Setting.Main.tsx
│   │   │   │   ├── Setting.vm.ts
│   │   │   │   └── index.tsx
│   │   │   ├── Users
│   │   │   │   ├── UserList.vm.ts
│   │   │   │   └── index.tsx
│   │   │   └── index.tsx
│   │   ├── NotFoundScreen.tsx
│   │   ├── SignInScreen.tsx
│   │   ├── TabTwoScreen.tsx
│   │   └── VmManager.tsx
│   ├── Shared
│   │   ├── Avatar
│   │   │   └── index.tsx
│   │   ├── Button
│   │   │   └── index.tsx
│   │   ├── Carousel
│   │   │   ├── index.tsx
│   │   │   └── item.tsx
│   │   ├── Divider
│   │   │   └── index.tsx
│   │   ├── DoubleTap
│   │   │   ├── images
│   │   │   │   ├── heart-outline.png
│   │   │   │   └── heart.png
│   │   │   └── index.tsx
│   │   ├── DropDownContainer
│   │   │   └── index.tsx
│   │   ├── DropDownMenu
│   │   │   └── index.tsx
│   │   ├── ErrorMsg
│   │   │   └── index.tsx
│   │   ├── FlexBox
│   │   │   └── index.tsx
│   │   ├── Form
│   │   │   └── index.tsx
│   │   ├── GoogleLogin
│   │   │   └── index.tsx
│   │   ├── Image
│   │   │   └── index.tsx
│   │   ├── ImageBrowser
│   │   │   ├── ImageTile.jsx
│   │   │   ├── ImageTile.tsx
│   │   │   ├── index.tsx
│   │   │   └── sample.jsx
│   │   ├── ImageUpload
│   │   │   └── index.tsx
│   │   ├── Input
│   │   │   └── index.tsx
│   │   ├── Interval
│   │   │   └── index.tsx
│   │   ├── Loadable
│   │   │   └── index.tsx
│   │   ├── Nav
│   │   │   └── index.tsx
│   │   ├── NoData
│   │   │   └── index.tsx
│   │   ├── PopUpContainer
│   │   │   └── index.tsx
│   │   ├── Popup
│   │   │   └── index.tsx
│   │   ├── SubmitButton
│   │   │   └── index.tsx
│   │   ├── Switch
│   │   │   └── index.tsx
│   │   ├── Tags
│   │   │   └── index.tsx
│   │   └── Typography
│   │       ├── index.tsx
│   │       ├── style.ts
│   │       └── types.ts
│   ├── StyledText.tsx
│   ├── Themed.tsx
│   └── __tests__
│       └── StyledText-test.js
├── constants
│   ├── Colors.ts
│   ├── Layout.ts
│   └── SCREEN_NAME.ts
├── data
│   ├── entity
│   │   ├── CommentEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   ├── DecodedIdTokenEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   ├── DiaryEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   ├── FileEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   ├── ImageFileEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   ├── ListEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   ├── NotificationEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   ├── PagerEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   ├── PlaceEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   ├── PlaylistEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   ├── PostEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   ├── TagEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   ├── UserEntity
│   │   │   ├── entity.ts
│   │   │   └── index.ts
│   │   └── WishlistEntity
│   │       ├── entity.ts
│   │       └── index.ts
│   └── remote
│       └── RemoteDataSource.ts
├── domain
│   ├── dto
│   │   ├── CreateCommentDto
│   │   │   └── index.ts
│   │   ├── CreatePostDto
│   │   │   └── index.ts
│   │   ├── CreateTokenDto
│   │   │   └── index.ts
│   │   ├── FindCommentDto
│   │   │   └── index.ts
│   │   ├── FindPlaceDto
│   │   │   └── index.ts
│   │   ├── FindPostDto
│   │   │   └── index.ts
│   │   ├── PlaceSearchDto
│   │   │   └── index.ts
│   │   ├── QueryDto
│   │   │   └── index.ts
│   │   ├── SearchDto
│   │   │   └── index.ts
│   │   └── UpdateCommentDto
│   │       └── index.ts
│   ├── enum
│   │   ├── PlaceReactionType.ts
│   │   ├── PlaceType.ts
│   │   ├── ProviderType.ts
│   │   ├── RoleType.ts
│   │   └── UserMbtiType.ts
│   ├── model
│   │   ├── Local
│   │   │   ├── MapListModel
│   │   │   │   ├── index.ts
│   │   │   │   └── mock.ts
│   │   │   ├── PlaceListModel
│   │   │   │   └── index.ts
│   │   │   ├── PostListModel
│   │   │   │   └── index.ts
│   │   │   └── UserDetailModel
│   │   │       └── index.ts
│   │   └── Shared
│   │       ├── BookmarkModel
│   │       │   ├── index.ts
│   │       │   └── model.ts
│   │       ├── CommentModel
│   │       │   ├── index.ts
│   │       │   ├── mock.ts
│   │       │   └── model.ts
│   │       ├── DecodedIdTokenModel
│   │       │   ├── index.ts
│   │       │   └── model.ts
│   │       ├── FileModel
│   │       │   ├── index.ts
│   │       │   └── model.ts
│   │       ├── ImageFileModel
│   │       │   ├── index.ts
│   │       │   ├── mock.ts
│   │       │   └── model.ts
│   │       ├── NotificationModel
│   │       │   ├── index.ts
│   │       │   └── model.ts
│   │       ├── PagerModel
│   │       │   ├── index.ts
│   │       │   ├── mock.ts
│   │       │   └── model.ts
│   │       ├── PlaceModel
│   │       │   ├── index.ts
│   │       │   ├── mock.ts
│   │       │   └── model.ts
│   │       ├── PlaylistModel
│   │       │   ├── index.ts
│   │       │   └── model.ts
│   │       ├── PostModel
│   │       │   ├── index.ts
│   │       │   └── model.ts
│   │       ├── StoryModel
│   │       │   ├── index.ts
│   │       │   └── model.ts
│   │       ├── TagModel
│   │       │   ├── index.ts
│   │       │   ├── mock.ts
│   │       │   └── model.ts
│   │       └── UserModel
│   │           ├── index.ts
│   │           └── model.ts
│   └── repository
│       ├── AuthRepository.ts
│       ├── CommentRepository.ts
│       ├── MeRepository.ts
│       ├── NotificationRepository.ts
│       ├── PlaceRepository.ts
│       ├── PostRepository.ts
│       ├── Repository.ts
│       └── UserRepository.ts
├── helper
│   ├── Formatter
│   │   ├── CalculateDayBefore
│   │   │   └── index.ts
│   │   ├── DateFormatter
│   │   │   └── index.tsx
│   │   ├── ErrorMessage
│   │   │   └── index.ts
│   │   ├── FollowerNumFormatter
│   │   │   └── index.tsx
│   │   └── GeoInfoFormatter
│   │       └── index.ts
│   ├── classValidator
│   │   └── index.ts
│   ├── deserializer
│   │   └── index.ts
│   ├── fetcher
│   │   └── index.ts
│   ├── mappedTypes
│   │   ├── _helper.ts
│   │   ├── _mappedTypeInterface.ts
│   │   ├── _type.ts
│   │   ├── index.ts
│   │   ├── intersectionType.ts
│   │   ├── omitType.ts
│   │   ├── partialType.ts
│   │   └── pickType.ts
│   ├── parseError
│   │   └── index.ts
│   └── transformDate
│       └── index.ts
├── hooks
│   ├── useCachedResources.ts
│   ├── useColorScheme.ts
│   └── useIsMounted.ts
├── metro.config.js
├── navigation
│   ├── LinkingConfiguration.ts
│   ├── index.tsx
│   └── modalContext.tsx
├── package.json
├── themes
│   ├── colors.ts
│   └── index.ts
├── tsconfig.json
├── types
│   └── index.d.ts
├── types.tsx
└── yarn.lock
```

- Shared : 공용 컴포넌트
- components : 로컬 컴포넌트
- data
  - entity
- domain
  - dto
  - enum
  - model
- repository : 직접 서버와 통신하는 API 함수들을 보관함
