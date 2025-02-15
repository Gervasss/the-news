import styled from "@emotion/styled";

type AdminPageContainerProps = {
  display?: string;
  padding?: number | string;
};

export const AdminPageContainer = styled.div<AdminPageContainerProps>`
  width: 100%;
  height: 100vh;
  padding: ${({ padding }) => padding || "1rem"};
  display: ${({ display }) => display || "block"};
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f5f7f9;
`;
