import { useDispatch } from "react-redux";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { tryAgain } from "../../redux/userRedux";
import { useLocation } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: ${(prop) => prop.display};
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  height: 250px;
  position: relative;
  background-color: white;
  margin: auto;
  text-align: center;
  border-radius: 20px;
  max-width: 350px;
  overflow: hidden;
  padding: 20px;
  ${mobile({ width: "80%" })};
`;
const Header = styled.h1`
  font-size: 1.5rem;
  margin: 15px 0px;
`;

const Subheader = styled.h3`
  font-size: 1rem;
  margin: 30px 0px;
`;

const Button = styled.button`
  cursor: pointer;
  flex: 1;
  border-radius: 20px;
  border: none;
  padding: 10px 20px;
  background-color: #110f12;
  color: white;
`;

const FailedModal = ({ display }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(tryAgain());
  };
  return (
    <Container display={display}>
      <Wrapper>
        {path === "sign-up" ? (
          <Header>Unable to Sign Up</Header>
        ) : (
          <Header>Unable to Sign In</Header>
        )}
        {path === "sign-up" ? (
          <Subheader>
            The username/email is already taken. Please try again.
          </Subheader>
        ) : (
          <Subheader>
            Your username/password is incorrect. Please try again.
          </Subheader>
        )}
        <Button onClick={closeModal}>Okay</Button>
      </Wrapper>
    </Container>
  );
};

export default FailedModal;
