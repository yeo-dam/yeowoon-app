import React, { PropsWithChildren, useContext } from "react";
import AuthViewModel, { AuthTokenType } from "./AuthViewModel";

const createViewModel = ({
  accessToken,
}: Pick<AuthTokenType, "accessToken">) => {
  return {
    tab: {},
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
