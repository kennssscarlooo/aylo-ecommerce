import { FavoriteBorderOutlined } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "styled-components";
import { formatAmount } from "../utility/formatAmount";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateWishlistProducts } from "../redux/authRedux";
import { useState } from "react";
import Notification from "../components/Modal/Notification";

const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  max-width: 300px;
  height: 350px;
  display: flex;
  align-items: center;
  background-color: #efefef;
  position: relative;
  ${mobile({ height: "250px", margin: "10px auto", minWidth: "230px" })}
`;
const Info = styled.div`
  width: 100%;
  height: 30%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: white;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s ease;
`;
const Logo = styled.div`
  opacity: 1;
  width: 20%;
  height: 20%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoImage = styled.img`
  width: 50%;
  transition: all 0.5s ease;
`;
const Name = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 5px;
`;
const InfoText = styled.p`
  font-size: 0.9rem;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Image = styled.img`
  width: 70%;
  z-index: 2;
  align-items: center;
  padding-bottom: 30px;
  margin: auto;
  cursor: pointer;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #efefef;
  }
`;

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const currentWishlist = useSelector((state) => state.wish.wishlist);
  const wishlistId = useSelector((state) => state.wish.wishlistId);

  const isLike = currentWishlist?.includes(item._id);

  const handleAdd = () => {
    setAdd(true);
    const updatedWishlist = [...currentWishlist, item._id];
    const newWishlist = { wishlist: updatedWishlist };
    updateWishlistProducts(wishlistId, newWishlist, dispatch);
  };
  const handleRemove = () => {
    setRemove(true);
    const productIndex = currentWishlist.indexOf(item._id);
    const updatedWishlist = [
      ...currentWishlist.slice(0, productIndex),
      ...currentWishlist.slice(productIndex + 1),
    ];
    const newWishlist = { wishlist: updatedWishlist };
    updateWishlistProducts(wishlistId, newWishlist, dispatch);
  };

  return (
    <Container>
      <Notification open={add} setOpen={setAdd} type="add" />
      <Notification open={remove} setOpen={setRemove} type="remove" />
      <Image
        src={item.img}
        onClick={() => {
          navigate(`/product/${item._id}`);
        }}
      />
      <Logo>
        <LogoImage src={item.logo} />
      </Logo>
      <Info>
        <Left>
          <Name>{item.name}</Name>
          <InfoText>{formatAmount(item.price)}</InfoText>
        </Left>
        <Right>
          {user && (
            <Icon>
              {isLike ? (
                <FavoriteIcon onClick={handleRemove} />
              ) : (
                <FavoriteBorderOutlined onClick={handleAdd} />
              )}
            </Icon>
          )}
        </Right>
      </Info>
    </Container>
  );
};

export default ProductItem;
