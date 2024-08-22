import styled from "styled-components";
import useDarkMode from "../hooks/useDarkMode";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;
const Logo = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"} alt="logo" />
    </StyledLogo>
  );
};
export default Logo;
