import styled from "styled-components";
import Promotion from "../components/Promotion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OrderHistory from "../components/OrderHistory";
import { mobile, tablet } from "../responsive";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;
const MainContainer = styled.div`
  margin: auto;
  max-width: 1295px;
  width: 90vw;
  padding: 55px 0;
`;

const Wrapper = styled.div`
  margin: auto;
  max-width: 900px;
  width: 90vw;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
  min-width: 240px;
  ${tablet({ flex: "1" })}
  ${mobile({ padding: "0", flexWrap: "wrap", minWidth: "120px" })}
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  margin: auto;
  align-items: center;
  max-width: 300px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px 0;
  ${tablet({ flex: "0.75" })}
  ${mobile({ flex: "1", padding: "0" })}
`;

const Title = styled.h1`
  font-weight: 300;
  ${mobile({ fontSize: "24px" })}
`;
const TextContainer = styled.div`
  justify-content: center;
  margin: auto;
  align-items: center;
  display: flex;
  ${mobile({ paddingTop: "20px" })}
`;
const Text = styled.span`
  margin-left: 5px;
  text-align: center;
  ${mobile({ fontSize: "0.8rem" })};
`;
const Action = styled.div`
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
const Navigation = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: lightgrey;
  &:hover {
    color: black;
  }
  &.active {
    color: black;
  }
`;
const Divider = styled.div`
  height: 25px;
  border: 1px solid lightgrey;
`;

const Orders = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Promotion />
      <Navbar />
      <MainContainer>
        <Title>Orders</Title>
        <TextContainer>
          <Left>
            <Action
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
              <Text>back</Text>
            </Action>
          </Left>
        </TextContainer>
        <TextContainer style={{ marginBottom: "30px" }}>
          <Center>
            <Navigation>
              <Text
                onClick={() => {
                  navigate("/account");
                }}
              >
                Account Settings
              </Text>
            </Navigation>
            <Divider></Divider>
            <Navigation className="active">
              <Text>Order History</Text>
            </Navigation>
          </Center>
        </TextContainer>
        <Wrapper>
          <OrderHistory />
        </Wrapper>
      </MainContainer>
      <Footer />
    </Container>
  );
};

export default Orders;
