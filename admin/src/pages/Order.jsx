import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import styled from "styled-components";
import { openModal } from "../redux/modalRedux";
import { mobile, tablet, bigtablet } from "../responsive";
import { formatAmount } from "../utility/formatAmount";
import { formatDate } from "../utility/formatDate";
import UpdateOrderModal from "../components/Modal/UpdateOrderModal";

const Container = styled.div``;
const Wrapper = styled.div`
  margin: auto;
  width: 90vw;
  max-width: 1000px;
`;
const BackButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
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
const ShipButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
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
const OrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column" })}
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
  ${tablet({ paddingTop: "20px", paddingLeft: "0" })}
  ${mobile({ paddingTop: "20px", paddingLeft: "0" })}
`;
const Summary = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const SummaryLeft = styled.div`
  flex: 1;
`;
const SummaryRight = styled.div`
  max-width: 300px;
  flex: 1;
  ${tablet({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "90vw",
  })}
  ${mobile({ maxWidth: "90vw" })}
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
  font-weight: ${(props) => props.font === "total" && "500"};
  font-size: ${(props) => props.font === "total" && "24px"};
  ${bigtablet({
    fontSize: (props) => (props.font === "total" ? "20px" : "16px"),
  })}
  ${tablet({ marginTop: "15px 0" })}
  ${mobile({ fontSize: (props) => (props.font === "total" ? "18px" : "14px") })}
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  text-align: center;
  font-size: 0.8rem;
  width: 120px;
  background-color: #110f12;
  color: white;
  cursor: pointer;
  padding: 10px;
`;
const SummaryItemLeft = styled.span``;

const SummaryItemRight = styled.span``;
const Order = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderID = location.pathname.split("/").at(-1);
  const orders = useSelector((state) => state.order.orders);
  const item = orders.find((item) => item._id === orderID);
  const products = item.products;
  const status = item.status;
  const handleModal = (type) => dispatch(openModal(type));
  return (
    <Container>
      <UpdateOrderModal />
      <Wrapper>
        <Title>ORDER ID #{item._id.substring(0, 12)}</Title>
        <TextContainer style={{ paddingTop: "20px" }}>
          <BackButton>
            <Action
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
              <Text>back</Text>
            </Action>
          </BackButton>
          <ShipButton>
            {status === "To Ship" ? (
              <Action>
                <Button onClick={() => handleModal("Ship")}>Ship Order</Button>
              </Action>
            ) : null}
          </ShipButton>
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
              </SummaryLeft>
              <SummaryRight></SummaryRight>
            </Summary>
          </SummaryContainer>
        </OrderContainer>
      </Wrapper>
    </Container>
  );
};

export default Order;
