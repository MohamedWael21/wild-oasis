import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface ModalContextType {
  open: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
  openName: string;
}

interface ModalProps {
  children: React.ReactNode;
}

interface WindowProps {
  children: React.ReactNode;
  name: string;
}

interface OpenProps {
  children: React.ReactNode;
  opens: string;
}

const ModalContext = createContext<ModalContextType | null>(null);

const Modal = ({ children }: ModalProps) => {
  const [openName, setOpenName] = useState("");

  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ open, openName, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: windowOpenName }: OpenProps) => {
  const { open } = useContext(ModalContext) as ModalContextType;

  return cloneElement(children as React.ReactElement, {
    onClick: () => open(windowOpenName),
  });
};

const Window = ({ children, name }: WindowProps) => {
  const { close, openName } = useContext(ModalContext) as ModalContextType;

  const ref = useOutsideClick<HTMLDivElement>(close, true);

  if (openName !== name) return;

  return (
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>
          <div>
            {cloneElement(children as React.ReactElement, {
              onCloseModal: close,
            })}
          </div>
        </div>
      </StyledModal>
    </Overlay>
  );
};

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
