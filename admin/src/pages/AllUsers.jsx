import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddIcon from "@mui/icons-material/Add";
import Warning from "../components/Modal/Warning";
import { mobile } from "../responsive";

const Container = styled.div``;
const MainContainer = styled.div`
  margin: auto;
  width: 90vw;
  max-width: 1000px;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
`;

const Button = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  align-items: center;
  color: grey;
  font-size: 0.9rem;
  &:hover {
    color: black;
  }
`;
const Title = styled.h1`
  padding-top: 55px;
  font-weight: 300;
  ${mobile({ paddingTop: "30px" })}
`;

const TextContainer = styled.div`
  justify-content: center;
  margin: auto;
  align-items: center;
  display: flex;
`;
const Text = styled.span`
  margin-left: 5px;
  text-align: center;
`;

const AllProducts = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Warning />
      <MainContainer>
        <Title>ALL USERS</Title>
        <TextContainer style={{ paddingTop: "20px" }}>
          <Left>
            <Button
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
              <Text>back</Text>
            </Button>
          </Left>
          <Right>
            <Button
              onClick={() => {
                navigate("/newadmin");
              }}
            >
              <AddIcon />
              <Text>new admin</Text>
            </Button>
          </Right>
        </TextContainer>
      </MainContainer>
      <UserList />
    </Container>
  );
};

export default AllProducts;
