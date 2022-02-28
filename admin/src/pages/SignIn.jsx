import styled from "styled-components";
import FailedModal from "../components/Modal/FailedModal";
import NotAdmin from "../components/Modal/NotAdmin";
import { useState } from "react";
import { signinRequest } from "../redux/authRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;
const MainContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Title = styled.h1`
  color: black;
  font-weight: bold;
  margin: 20px auto;
  text-align: center;
`;
const Wrapper = styled.div`
  width: 85vw;
  max-width: 400px;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  flex: 1;
  width: 85%;
  min-width: 40%;
  margin: 10px auto;
  padding: 10px;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid lightgrey;
`;
const Button = styled.button`
  text-align: center;
  width: 40%;
  border: none;
  padding: 10px 0;
  background-color: #110f12;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  margin: 15px auto;
  transition: all 0.3s ease-out;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: #f8f8f8;
    color: black;
    cursor: not-allowed;
  }
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    signinRequest(dispatch, { username, password });
  };
  return (
    <Container>
      <NotAdmin display={currentUser?.isAdmin === false ? "flex" : "none"} />
      <FailedModal display={error === false ? "none" : "flex"} />
      <MainContainer>
        <Title>AYLO ADMIN DASHBOARD</Title>
        <Wrapper>
          <Form>
            <InputField
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <InputField
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button onClick={handleSubmit} disabled={isFetching ? true : false}>
              Sign In
            </Button>
          </Form>
        </Wrapper>
      </MainContainer>
    </Container>
  );
};

export default SignIn;
