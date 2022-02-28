import styled from "styled-components";
import Promotion from "../components/Promotion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile, tablet, bigtablet } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../redux/modalRedux";
import { formatAmount } from "../utility/formatAmount";
import { formatDate } from "../utility/formatDate";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import UpdateOrderModal from "../components/Modal/UpdateOrderModal";

const Container = styled.div``;

const Wrapper = styled.div`
  margin: auto;
  max-width: 1295px;
  width: 90vw;
  padding: 55px 0;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  padding: 10px 0;
  min-width: 240px;
  ${tablet({ flex: "3" })}
  ${mobile({ padding: "0", flexWrap: "wrap", minWidth: "120px" })}
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px 0;
  ${tablet({ flex: "0.75" })}
  ${mobile({ flex: "1", padding: "0" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  padding: 10px 0;
  text-align: right;
  align-items: center;
  justify-content: flex-end;
  ${tablet({ flex: "0.75" })}
  ${mobile({ padding: "0" })}
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
`;
const Text = styled.span`
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

  ${mobile({ paddingTop: "20px" })}
`;
const OrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column", paddingTop: "20px" })}
`;

const ProductContainer = styled.div`
  flex: 2.5;
  ${bigtablet({ flex: "2" })}
  ${tablet({ flex: "2" })}
`;

const Item = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between;
  ${mobile({ paddingTop: "10px" })};
`;
const Info = styled.div`
  flex: 1;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "0" })}
`;
const Details = styled.div`
  margin: auto;
  display: flex;
  flex: 1;
`;
const ProductDetails = styled.div`
  min-width: 240px;
  padding: 0 10px;
  flex: 1;
  ${mobile({ minWidth: "120px" })}
`;
const ProductImage = styled.div`
  width: 140px;
  height: 110px;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  background-color: #efefef;
  margin: auto;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  ${bigtablet({ width: "100px", flex: "1" })}
  ${mobile({ width: "70px", height: "100px" })}
`;

const Image = styled.img`
  width: 80%;
  margin: auto;
`;
const ProductName = styled.h3`
  font-size: 1rem;
  ${mobile({ fontSize: "0.85rem" })}
`;
const ProductInfo = styled.p`
  font-size: 0.85rem;
  margin: 2px 0;
  color: gray;
  ${mobile({ fontSize: "0.8rem" })}
`;

const ProductColor = styled.div`
  flex: 1;
`;
const ColorOutline = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  border: 1px solid black;
  ${mobile({
    width: "15px",
    height: "15px",
  })}
`;
const BoxColor = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  ${mobile({
    width: "13px",
    height: "13px",
  })}
`;

const ProductPrice = styled.p`
  align-items: center;
  justify-content: center;
  font-weight: 200;
  flex: 1;
  font-size: 1rem;
  ${mobile({ fontSize: "0.9rem" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  margin-top: 5px;
  border: none;
  height: ${(props) => props.height};
  ${mobile({ margin: "10px 0" })}
`;
const SummaryContainer = styled.div`
  flex: 1;
  padding-left: 40px;
  ${tablet({ padding: "0" })}
  ${mobile({ padding: "0" })}
`;
const Summary = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const SummaryLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${tablet({ marginTop: "20px", flexDirection: "row" })}
  ${mobile({ marginTop: "20px" })}
`;

const SummaryDiv = styled.div`
  flex: 1;
  ${tablet({ marginLeft: (props) => props.left === "left" && "40px" })}
`;
const Subtitle = styled.h2`
  font-weight: 200;
  padding: 10px 0;
  font-size: 20px;
  ${mobile({ fontSize: "18px", padding: "5px 0" })}
`;

const SummaryItem = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  ${tablet({ marginTop: "15px 0" })}
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  text-align: center;
  font-size: 0.8rem;
  width: 120px;
  background-color: ${(prop) => prop.bg};
  color: ${(prop) => prop.color};
  cursor: pointer;
  padding: 10px;
  ${mobile({ padding: "8px" })};
`;
const SummaryItemLeft = styled.span`
  ${mobile({ fontSize: "14px" })}
`;

const SummaryItemRight = styled.span`
  ${mobile({ fontSize: "14px" })}
`;

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderID = location.pathname.split("/").at(-1);
  const orders = useSelector((state) => state.order.orders);
  const item = orders.find((item) => item._id === orderID);
  const products = item.products;
  const status = item.status;
  const totalAmount = item.amount;
  const handleModal = (type) => dispatch(openModal(type));
  return (
    <Container>
      <UpdateOrderModal />
      <Promotion />
      <Navbar />
      <Wrapper>
        <Title>Order #{item._id.substring(0, 8)}</Title>
        <TextContainer>
          <Left>
            <Action
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
              <Text style={{ marginLeft: "5px" }}>back</Text>
            </Action>
          </Left>
          <Right style={{ padding: "0" }}>
            {status === "To Ship" ? (
              <Action>
                <Button
                  color={"black"}
                  bg={"#f8f8f8"}
                  onClick={() => handleModal("Cancel")}
                >
                  Cancel Order
                </Button>
              </Action>
            ) : status === "Shipped" ? (
              <Action>
                <Button
                  color={"white"}
                  bg={"#110f12"}
                  onClick={() => handleModal("Receive")}
                >
                  Order Received
                </Button>
              </Action>
            ) : null}
          </Right>
        </TextContainer>
        <OrderContainer>
          <ProductContainer>
            <Subtitle>Ordered Shoes</Subtitle>
            <TextContainer>
              <Left>
                <Text>Product</Text>
              </Left>
              <Center>
                <Text>Amount</Text>
              </Center>
              <Right>
                <Text>Status</Text>
              </Right>
            </TextContainer>
            <Hr height={"3px"} />
            {products?.map((i) => (
              <Item
                key={i.productId._id + i.productId.size + i.productId.color}
              >
                <Info>
                  <Product>
                    <Left>
                      <Details>
                        <ProductImage
                          onClick={() => {
                            navigate(`/product/${i.productId._id}`);
                          }}
                        >
                          <Image src={i.productId.img} />
                        </ProductImage>
                        <ProductDetails>
                          <ProductName>{i.productId.name}</ProductName>
                          <ProductInfo>{i.productId.brand}</ProductInfo>
                          <ProductInfo> {i.productId.size} US</ProductInfo>
                          <ProductColor>
                            <ColorOutline>
                              <BoxColor color={i.productId.color} />
                            </ColorOutline>
                          </ProductColor>
                          <ProductInfo>Qty: {i.productId.quantity}</ProductInfo>
                        </ProductDetails>
                      </Details>
                    </Left>
                    <Center>
                      <ProductPrice>
                        {formatAmount(i.productId.quantity * i.productId.price)}
                      </ProductPrice>
                    </Center>
                    <Right>
                      <ProductPrice>{status}</ProductPrice>
                    </Right>
                  </Product>
                </Info>
              </Item>
            ))}
          </ProductContainer>
          <SummaryContainer>
            <Summary>
              <SummaryLeft>
                <SummaryDiv>
                  <Subtitle>Billing Summary</Subtitle>
                  <SummaryItem>
                    <SummaryItemLeft>{item.name}</SummaryItemLeft>
                    <SummaryItemRight>
                      {formatDate(item.createdAt)}
                    </SummaryItemRight>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemLeft>{item.address.line1},</SummaryItemLeft>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemLeft>
                      {item.address.city}, {item.address.postal_code}
                    </SummaryItemLeft>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemLeft>{item.address.country}</SummaryItemLeft>
                  </SummaryItem>
                </SummaryDiv>
                <SummaryDiv left={"left"}>
                  <Subtitle>Order Summary</Subtitle>
                  <SummaryItem>
                    <SummaryItemLeft>Subtotal</SummaryItemLeft>
                    <SummaryItemRight>
                      {totalAmount < 5249
                        ? formatAmount(totalAmount - 250)
                        : formatAmount(totalAmount)}
                    </SummaryItemRight>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemLeft>Shipping</SummaryItemLeft>
                    <SummaryItemRight>
                      {totalAmount > 4999 ? "free" : formatAmount(250)}
                    </SummaryItemRight>
                  </SummaryItem>
                  <Hr height={"2px"} />
                  <SummaryItem>
                    <SummaryItemLeft>Total</SummaryItemLeft>
                    <SummaryItemRight>
                      {formatAmount(totalAmount)}
                    </SummaryItemRight>
                  </SummaryItem>
                </SummaryDiv>
              </SummaryLeft>
            </Summary>
          </SummaryContainer>
        </OrderContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Order;
