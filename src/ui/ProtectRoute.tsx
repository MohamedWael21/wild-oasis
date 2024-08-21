import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/auth/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

interface ProtectRouteProps {
  children: React.ReactNode;
}

const StyledProtectRoute = styled.div`
  display: flex;
  background-color: var(--color-grey-50);
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <StyledProtectRoute>
        <Spinner />
      </StyledProtectRoute>
    );

  if (isAuthenticated) return children;
};
export default ProtectRoute;
