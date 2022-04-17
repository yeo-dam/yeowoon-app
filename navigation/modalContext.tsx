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

export const getModalContext = () => {
  const value = useContext(ModalContext);
  if (!value) return;

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
