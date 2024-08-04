import React, { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

type Position = {
  x: number;
  y: number;
};
interface StyledListProps {
  position: Position;
}

interface MenuContextType {
  openId: number;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<number>>;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  position: Position;
}

interface MenusProps {
  children: React.ReactElement[] | React.ReactElement;
}
interface ButtonProps {
  children: React.ReactElement[] | React.ReactElement | string;
  icon: React.ReactElement;
  onClick?: () => void;
}
interface ListProps {
  children: React.ReactElement[] | React.ReactElement;
  id: number;
}

interface ToggleProps {
  id: number;
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  z-index: 999;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext<MenuContextType | null>(null);

const Menus = ({ children }: MenusProps) => {
  const [openId, setOpenId] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const close = () => setOpenId(0);
  const open = setOpenId;

  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const Toggle = ({ id }: ToggleProps) => {
  const { openId, close, open, setPosition } = useContext(
    MenuContext
  ) as MenuContextType;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const rec = target.closest("button")?.getBoundingClientRect();
    if (rec) {
      setPosition({
        x: window.innerWidth - rec.width - rec.x,
        y: rec.y + rec.height + 8,
      });
    }
    console.log("toggle");
    console.log(openId);
    openId === 0 || openId !== id ? open(id) : close();
  };
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ id, children }: ListProps) => {
  const { openId, position, close } = useContext(
    MenuContext
  ) as MenuContextType;

  const ref = useOutsideClick<HTMLUListElement>(close);

  if (openId !== id) return;

  return (
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>
  );
};

const Button = ({ children, icon, onClick }: ButtonProps) => {
  const { close } = useContext(MenuContext) as MenuContextType;
  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
