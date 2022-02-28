import styled from "styled-components";
import Navbar from "../components/Navbar";
import Promotion from "../components/Promotion";
import ProductItem from "../components/ProductItem";
import PopularProducts from "../components/PopularProducts";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { publicRequest } from "../apiRequest";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Container = styled.div``;
const Wrapper = styled.div`
  margin: auto;
  max-width: 1295px;
  width: 90vw;
  padding: 55px 0;
  ${mobile({ padding: "10 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
  min-width: 240px;
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
  padding-top: 20px;
  ${mobile({ padding: "10px 0" })}
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
const WishContainer = styled.div`
  margin: auto;
  max-width: 1290px;
  width: 90vw;
`;
const WishWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  ${mobile({ padding: "0 10px" })}
`;

const Wishlist = () => {
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wish.wishlist);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await publicRequest.get(`products`);
        setProducts(
          response.data.filter((item) => wishlist.includes(item._id))
        );
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [wishlist]);
  return (
    <Container>
      <Promotion />
      <Navbar />
      <Wrapper>
        <Title>My Wishlist</Title>
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
        <WishContainer>
          <WishWrapper>
            {products?.length === 0 && (
              <TextContainer style={{ margin: "50px auto" }}>
                <Text>You do not have any wishlist</Text>
              </TextContainer>
            )}
            {products?.map((item) => (
              <ProductItem item={item} key={item._id} />
            ))}
          </WishWrapper>
        </WishContainer>
      </Wrapper>
      <PopularProducts description="PEOPLE ALSO VIEW THESE" />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Wishlist;
