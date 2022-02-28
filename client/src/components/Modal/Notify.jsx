import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  max-height: 400px;
  position: relative;
  background-color: white;
  margin: auto;
  border-radius: 20px;
  max-width: 500px;
  overflow: hidden;
  padding: 50px;
  ${mobile({ width: "80%", padding: "50px 30px" })};
`;
const Header = styled.h1`
  font-size: 1.5rem;
  margin: 15px 0px;
`;
const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 5%;
  right: 5%;
  color: black;
`;
const Subheader = styled.h3`
  font-size: 1rem;
  margin: 30px 0px;
`;
const InputContainer = styled.div`
  margin: 30px auto;
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid gray;
`;

const Input = styled.input`
  border: none;
  border-radius: 20px;
  flex: 8;
  padding-left: 20px;
  &:focus {
    outline: none !important;
  }
  ${mobile({ flex: "5" })}
`;
const Button = styled.button`
  cursor: pointer;
  flex: 1;
  border-radius: 20px;
  border: none;
  background-color: white;
`;

const Notify = ({ showModal, setShowModal }) => {
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        document.body.style.overflow = "auto";
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  return (
    <Container>
      <Wrapper>
        <CloseButton>
          <CloseIcon onClick={closeModal} />
        </CloseButton>
        <Header>Get Notified!</Header>
        <Subheader>
          Give us your email and we will notify you once it's on stock.
        </Subheader>
        <InputContainer>
          <Input type="email" placeholder="Enter your email here" />
          <Button onClick={closeModal}>
            <ArrowForwardIcon />
          </Button>
        </InputContainer>
      </Wrapper>
    </Container>
  );
};

export default Notify;
