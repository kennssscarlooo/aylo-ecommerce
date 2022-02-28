import React from "react";
import styled from "styled-components";
import { mobile, tablet } from "../../responsive";
import { Link } from "react-router-dom";
import { BrandList } from "../NavigationLinks";

const Container = styled.div`
  width: 100vw;
  height: 50px;
  background-color: #191919;
  ${tablet({ display: "none" })};
  ${mobile({ display: "none" })};
  pointer-events: none;
`;
const Wrapper = styled.div`
  width: 275px;
  margin: auto;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Center = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
`;
const MenuLinks = styled.h1`
  font-size: 14px;
  cursor: pointer;
  margin: 0 10px;
  &:before {
    content: "";
    position: absolute;
    right: 0;
    bottom: -30%;
    width: 0;
    height: 3px;
    background-color: coral;
    transition: width 0.3s ease-out;
  }
  &:hover:before {
    width: 100%;
    left: 0%;
    right: auto;
  }
  ${tablet({ margin: "5px", fontSize: "16px" })}
`;
const BrandModal = () => {
  return (
    <Container>
      <Wrapper>
        {BrandList.map((menu, index) => {
          return (
            <Center key={index}>
              <MenuLinks key={index}>
                <Link
                  key={index}
                  to={menu.path}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {menu.title}
                </Link>
              </MenuLinks>
            </Center>
          );
        })}
      </Wrapper>
    </Container>
  );
};
export default BrandModal;
