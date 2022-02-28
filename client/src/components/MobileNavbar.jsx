import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import styled from "styled-components";
import { UserMobileModal } from "../components/Modal/UserModal";
import { mobile, tablet } from "../responsive";
import { useNavigate } from "react-router-dom";
import { MenuList } from "./NavigationLinks";
import { useSelector } from "react-redux";

const Container = styled.div`
  z-index: 5;
  display: none;
  width: 100vw;
  ${tablet({ display: "flex" })}
  ${mobile({ display: "flex" })};
`;
const Left = styled.div`
  flex: 1;
  text-align: left;
  margin: auto;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  margin: auto;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const OverlayContainer = styled.div`
  height: 100vh;
  width: 0;
  position: fixed;
  z-index: 3;
  left: ${(prop) => prop.left};
  right: ${(prop) => prop.right};
  top: 0;
  background-color: #f8f8f8;
  overflow: auto;
  transition: 0.5s;
`;
const OverlayContent = styled.div`
  position: relative;
  top: 25%;
  width: 100%;
  text-align: center;
  margin-top: 10px;
`;
const OverlayItem = styled.div`
  padding: 8px;
  font-weight: 900;
  text-decoration: none;
  margin: auto;
  width: 50vw;
  border-radius: 40px;
  font-size: 18px;
  color: black;
  cursor: pointer;
  display: block;
  transition: 0.6s;
`;
const Top = styled.div`
  position: absolute;
  color: black;
  top: 15vh;
  cursor: pointer;
  margin: auto;
  text-align: center;
  width: 50vw;
`;

const CloseLeft = styled.div`
  position: absolute;
  cursor: pointer;
  top: 9px;
  left: 7vw;
  color: black;
  font-size: 60px;
  ${mobile({ left: "25px" })}
`;

const Logo = styled.h1`
  font-size: 2rem;
  cursor: pointer;
  font-weight: bold;
  ${tablet({ fontSize: "28px" })}
  ${mobile({ fontSize: "24px" })}
`;
const MenuItem = styled.div`
  font-size: 10px;
  cursor: pointer;
  ${tablet({ fontSize: "12px" })}
  ${mobile({
    paddingLeft: "0",
    justifyContent: "center",
    alignItems: "center",
  })}
`;
const MobileNavbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const handleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <Container>
      <Left>
        <MenuItem>
          <MenuIcon onClick={handleMenu} />
        </MenuItem>
      </Left>
      <Center onClick={() => navigate("/")}>
        <Logo>A Y L O</Logo>
      </Center>
      <Right>
        {user !== null ? (
          <MenuItem>
            <UserMobileModal />
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            SIGN IN
          </MenuItem>
        )}
      </Right>
      <OverlayContainer
        left={"0"}
        right={"auto"}
        style={openMenu ? { width: "50%" } : { width: "0%" }}
      >
        <CloseLeft>
          <CloseIcon onClick={handleMenu} />
        </CloseLeft>
        <Top>
          <Logo>MENU</Logo>
        </Top>
        {MenuList.map((menu, index) => {
          return (
            <OverlayContent key={index}>
              <OverlayItem
                id={menu.id}
                onClick={() => {
                  navigate(`${menu.path}`);
                }}
              >
                {menu.title}
              </OverlayItem>
            </OverlayContent>
          );
        })}
      </OverlayContainer>
    </Container>
  );
};

export default MobileNavbar;
