import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 8rem;
  box-shadow: 0 0 0.5rem 0.1rem #ff0000;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 5px;
  color:  #ff0000;
  animation: aparecer 1s;
  @keyframes aparecer {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
