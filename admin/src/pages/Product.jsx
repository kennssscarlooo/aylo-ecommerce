import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Chart from "../components/Chart";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import styled from "styled-components";
import { userRequest } from "../request";
import { mobile } from "../responsive";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { formatAmount } from "../utility/formatAmount";
import { openModal } from "../redux/modalRedux";
import UpdateProductModal from "../components/Modal/UpdateProductModal";

const Container = styled.div``;
const MainContainer = styled.div`
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
const AddButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
`;
const Nav = styled.div`
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

const Wrapper = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const ProductContainer = styled.div`
  margin: auto;
  text-align: center;
`;
const ProductDetails = styled.div`
  margin: 20px;
`;
const Left = styled.div`
  flex: 1.5;
  margin-right: 10px;
`;
const Right = styled.div`
  flex: 1;
  position: relative;
  padding: 20px;
  border-radius: 10px;
  ${mobile({ width: "100%", margin: "10px 0" })}
`;
const ProductImg = styled.img`
  width: 100px;
  object-fit: cover;
  margin-right: 20px;
`;
const ProductInfo = styled.div`
  width: 100%;
  padding: 5px 10px;
  display: flex;
`;

const ProductKey = styled.span`
  font-weight: 300;
  text-align: left;
  width: 100px;
`;
const ProductValue = styled.span`
  font-weight: 500;
  text-align: left;
`;

const EditButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 5%;
  right: 5%;
  color: grey;
  border: none;
  padding: 5px 7px;
  margin: auto;
  text-align: center;
  border-radius: 50%;
  &:hover {
    background-color: #f0f0f0;
    color: black;
  }
`;

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [stats, setStats] = useState([]);
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const handleOpen = () => dispatch(openModal());
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);
  return (
    <Container>
      <UpdateProductModal />
      <MainContainer>
        <Title>PRODUCT ID #{product._id.substring(0, 12)}</Title>
        <TextContainer style={{ paddingTop: "20px" }}>
          <BackButton>
            <Nav
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
              <Text>back</Text>
            </Nav>
          </BackButton>
          <AddButton>
            <Nav
              onClick={() => {
                navigate("/newproduct");
              }}
            >
              <AddIcon />
              <Text>add product</Text>
            </Nav>
          </AddButton>
        </TextContainer>
        <Wrapper>
          <Left>
            <Chart
              data={stats}
              minWidth={150}
              dataKey="Sales"
              title="Sales Performance"
            />
          </Left>
          <Right>
            <EditButton>
              <EditIcon onClick={() => handleOpen()} />
            </EditButton>
            <ProductContainer>
              <ProductImg src={product.img} />
              <ProductDetails>
                <ProductInfo>
                  <ProductKey>name:</ProductKey>
                  <ProductValue>{product.name}</ProductValue>
                </ProductInfo>
                <ProductInfo>
                  <ProductKey>brand:</ProductKey>
                  <ProductValue>{product.brand}</ProductValue>
                </ProductInfo>
                <ProductInfo>
                  <ProductKey>category:</ProductKey>
                  <ProductValue>{product.category}</ProductValue>
                </ProductInfo>
                <ProductInfo>
                  <ProductKey>price:</ProductKey>
                  <ProductValue>{formatAmount(product.price)}</ProductValue>
                </ProductInfo>
                <ProductInfo>
                  <ProductKey>stock/s:</ProductKey>
                  <ProductValue>{product.stocks}</ProductValue>
                </ProductInfo>
              </ProductDetails>
            </ProductContainer>
          </Right>
        </Wrapper>
      </MainContainer>
    </Container>
  );
};

export default Product;
