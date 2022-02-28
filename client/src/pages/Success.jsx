import styled from "styled-components";
import Navbar from "../components/Navbar";
import Promotion from "../components/Promotion";
import VerifiedIcon from "@mui/icons-material/Verified";
import { mobile, tablet } from "../responsive";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { publicRequest } from "../apiRequest";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { paidProduct } from "../redux/bagRedux";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  background-color: #f8f8f8;
`;
const Container = styled.div`
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 30px 0;
  max-width: 450px;
  width: 90vw;
  height: 400px;
  border: none;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.25);
  ${mobile({ width: "80vw" })}
`;

const Message = styled.div`
  padding: 10px 40px;
  ${mobile({ padding: "10px 20px" })}
`;
const Icon = styled.div`
  margin: 20px;
  color: #00c851;
  width: 60px;
  height: 60px;
  margin: auto;
`;
const Header = styled.h1`
  margin: 20px 0;
  font-size: 24px;
  text-align: center;
  color: #00c851;
`;
const Subheader = styled.p`
  margin: 20px 0;
  font-size: 15px;
  text-align: center;
  ${mobile({ fontSize: "14px" })}
`;
const Receipt = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  text-decoration: none;
  color: grey;
  &:hover {
    color: black;
  }
  ${mobile({ fontSize: "12px" })}
`;
const Action = styled.div`
  text-align: center;
  padding-top: 20px;
`;
const Button = styled.button`
  width: 120px;
  padding: 12px 10px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  font-size: 14px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin: 0 20px;
  transition: 0.2s ease-in;
  &:hover {
    opacity: 0.8;
  }
  ${tablet({ width: "100px", fontSize: "11x", margin: "0 10px" })}
  ${mobile({ width: "100px", fontSize: "10x", margin: "0 10px" })}
`;
const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = location.state?.data;
  const bag = location.state?.bag;
  const user = useSelector((state) => state.user.currentUser);

  if (window.history.replaceState)
    window.history.replaceState(null, null, window.location.href);
  useEffect(() => {
    data === undefined && navigate("/");
    const shipping = bag.total > 4999 ? 0 : 250;
    const totalAmount = bag.total + shipping;
    async function createOrder() {
      try {
        await publicRequest.post("orders", {
          userId: user?._id || "Guest",
          amount: totalAmount,
          address: data.billing_details.address,
          name: data.billing_details.name,
          products: bag.products.map((product) => ({
            productId: product,
          })),
        });
        data && dispatch(paidProduct());
      } catch (error) {
        console.error(error);
      }
    }
    data && createOrder();
  }, [bag, data, user, navigate, dispatch]);
  return (
    <MainContainer>
      <Promotion />
      <Navbar />
      <Container>
        <Message>
          <Icon>
            <VerifiedIcon sx={{ fontSize: 56 }} />
          </Icon>
          <Header>Your payment was successful!</Header>
          <Subheader>
            Your order was confirmed. You will receive an automated transaction
            receipt shortly via email. Thank you for shopping
          </Subheader>
          <Receipt href={data?.receipt_url} target="_blank">
            View Receipt
            <ArrowRightAltIcon />
          </Receipt>
          <Action>
            <Button
              bg={"#f8f8f8"}
              color={"black"}
              onClick={() => {
                navigate("/orders");
              }}
            >
              View orders
            </Button>
            <Button
              bg={"black"}
              color={"white"}
              onClick={() => {
                navigate("/products/instock");
              }}
            >
              Shop more
            </Button>
          </Action>
        </Message>
      </Container>
    </MainContainer>
  );
};

export default Success;
