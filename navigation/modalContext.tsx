import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export const ModalContext = createContext<{
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
} | null>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useModalContext = () => {
  const value = useContext(ModalContext);

  if (!value)
    throw new Error("useModalContext must be used within a ModalProvider");

  return value;
};

const ModalContextProvider = ({ children }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const value = useMemo(
    () => ({ isModalOpen, openModal, closeModal }),
    [isModalOpen, openModal, closeModal]
  );
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
