import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/auth/UserAvatar";

const StyledHeader = styled.div`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(---color-grey-100);
  grid-column: 2/-1;
  display: flex;
  align-items: center;
  gap: 2.4rem;
  justify-content: end;
  /* @media (max-width: 1200px) {
    grid-column: 1/-1;
  } */
`;
const Header = () => {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
};
export default Header;
