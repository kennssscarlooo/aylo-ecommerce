import styled from "styled-components";
import ProductItem from "./ProductItem";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { publicRequest } from "../apiRequest";

const Container = styled.div`
  margin: 20px auto;
  max-width: 1290px;
  width: 90vw;
  ${mobile({ padding: "10px" })}
`;
const Wrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  ${mobile({ fontSize: "24px" })}
`;
const PopularProducts = ({ path, description }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          path === "/" ? "products?instock" : "products/"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [path]);
  return (
    <Container>
      <Title>{description}</Title>
      <Wrapper>
        {products.slice(0, 8).map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default PopularProducts;
