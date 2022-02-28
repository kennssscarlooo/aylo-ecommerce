import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import FailedModal from "../components/Modal/FailedModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Promotion from "../components/Promotion";
import { useState } from "react";
import { signinRequest } from "../redux/authRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;
const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
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
  ${mobile({ fontSize: "24px" })}
`;
const Wrapper = styled.div`
  width: 85vw;
  max-width: 400px;
  padding: 20px;
  ${mobile({ width: "300px", flexDirection: "column" })};
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
  ${mobile({ width: "100%" })};
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
  margin: 5px auto;
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
const Agreement = styled.label`
  color: grey;
  width: "85%";
  font-size: 12px;
  text-align: left;
  padding-bottom: 10px;
  display: block;
  margin-left: 60px;
  text-indent: -20px;
  ${mobile({ marginLeft: "25px" })};
`;
const CheckBox = styled.input`
  vertical-align: middle;
  position: relative;
  margin-right: 10px;
  bottom: 1px;
`;
const Options = styled.a`
  margin: 8px 0px;
  font-size: 12px;
  color: grey;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    signinRequest(dispatch, { username, password });
  };
  return (
    <Container>
      <FailedModal display={error === false ? "none" : "flex"} />
      <Promotion />
      <Navbar />
      <MainContainer>
        <Title>WELCOME BACK</Title>
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
            <Agreement htmlFor="log" style={{ marginTop: "10px" }}>
              <CheckBox
                type="checkbox"
                id="log"
                style={{ marginRight: "10px" }}
                defaultChecked
              />
              Keep me logged in
            </Agreement>
            <Button onClick={handleSubmit} disabled={isFetching ? true : false}>
              Sign In
            </Button>
          </Form>
          <Options>Forgot password?</Options>
          <Options
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            Not yet a member? Click here
          </Options>
        </Wrapper>
      </MainContainer>
      <Footer />
    </Container>
  );
};

export default SignIn;
