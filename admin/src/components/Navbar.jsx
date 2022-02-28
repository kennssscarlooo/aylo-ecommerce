import React from "react";
import styled from "styled-components";
import UserModal from "./Modal/UserModal";
import { useSelector } from "react-redux";
import GridViewIcon from "@mui/icons-material/GridView";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #110f12;
  color: white;
  z-index: 10;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 90vw;
  max-width: 1295px;
  margin: auto;
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
`;
const Logo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  ${mobile({ fontSize: "1.5rem" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin: 0 10px;
`;
const Menu = styled.span`
  margin-left: 5px;
  ${mobile({ display: "none" })}
`;
const MenuLinks = styled.h3`
  font-size: 16px;
  cursor: pointer;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s all;
  &:before {
    content: "";
    position: absolute;
    right: auto;
    bottom: -35%;
    width: 0%;
    height: 3px;
    background-color: coral;
    transition: width 0.2s ease-out;
  }
  &.active:before {
    width: 100%;
    left: 0%;
    right: auto;
  }
  ${tablet({ margin: "0", transform: "scale(0.9)" })}
  ${mobile({ margin: "0" })}
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const admin = useSelector((state) => state.user?.currentUser?.isAdmin);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>A Y L O</Logo>
        </Left>
        {admin && (
          <Center>
            <Center>
              <MenuItem onClick={() => navigate("/dashboard")}>
                <MenuLinks className={path === "dashboard" ? "active" : null}>
                  <GridViewIcon />
                  <Menu>Dashboard</Menu>
                </MenuLinks>
              </MenuItem>
            </Center>
            <Center>
              <MenuItem onClick={() => navigate("/orders")}>
                <MenuLinks className={path === "orders" ? "active" : null}>
                  <ReceiptOutlinedIcon />
                  <Menu>Orders</Menu>
                </MenuLinks>
              </MenuItem>
            </Center>
            <Center>
              <MenuItem onClick={() => navigate("/products")}>
                <MenuLinks className={path === "products" ? "active" : null}>
                  <AllInboxIcon />
                  <Menu>Products</Menu>
                </MenuLinks>
              </MenuItem>
            </Center>
            <Center>
              <MenuItem onClick={() => navigate("/users")}>
                <MenuLinks className={path === "users" ? "active" : null}>
                  <GroupOutlinedIcon />
                  <Menu>Users</Menu>
                </MenuLinks>
              </MenuItem>
            </Center>
          </Center>
        )}
        <Right>
          {admin && (
            <MenuItem>
              <UserModal />
            </MenuItem>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};
export default Navbar;
