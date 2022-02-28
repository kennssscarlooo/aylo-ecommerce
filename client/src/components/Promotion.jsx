import styled, { keyframes } from "styled-components";
import { mobile } from "../responsive";

const pulse = keyframes`
  0% {
    background-color: rgba(255,127,80, 0.8);
	}

	50% {
    background-color: rgba(255,127,80, 0.9);
	}

	100% {
		background-color: rgba(255,127,80, 0.8);
	}
`;

const Container = styled.div`
  width: 100vw;
  height: 30px;
  background-color: white;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  animation: ${pulse} 2s infinite;
  ${mobile({ fontSize: "12px" })};
`;

const Promotion = () => {
  return <Container>Get 20% off on selected items</Container>;
};

export default Promotion;
