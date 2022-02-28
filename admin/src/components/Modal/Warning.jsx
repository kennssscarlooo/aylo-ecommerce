import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { closeModal } from "../../redux/modalRedux";
import { deleteMember, deleteProduct } from "../../redux/authRedux";
import CloseIcon from "@mui/icons-material/Close";
import Notification from "./Notification";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: ${(prop) => prop.display};
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  height: 250px;
  position: relative;
  background-color: white;
  margin: auto;
  text-align: center;
  border-radius: 20px;
  max-width: 350px;
  overflow: hidden;
  padding: 20px;
`;
const Header = styled.h1`
  font-size: 1.5rem;
  margin: 15px 0px;
`;

const Subheader = styled.h3`
  font-size: 1rem;
  margin: 30px 15px;
`;
const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 5%;
  right: 5%;
  color: black;
`;
const Button = styled.button`
  cursor: pointer;
  flex: 1;
  border-radius: 20px;
  border: none;
  padding: 10px 20px;
  background-color: #110f12;
  color: white;
  &:disabled {
    background-color: #f8f8f8;
    color: black;
    cursor: not-allowed;
  }
`;

const Warning = ({ display }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [remove, setRemove] = useState(false);
  const [loading, setLoading] = useState(false);
  const modal = useSelector((state) => state.modal);
  const handleClose = () => {
    dispatch(closeModal());
  };
  const updateHelper = () => {
    setLoading(false);
    dispatch(closeModal());
  };
  const handleDelete = (id) => {
    setRemove(true);
    if (path === "users") {
      deleteMember(id, dispatch);
    } else if (path === "products") {
      deleteProduct(id, dispatch);
    }
    setLoading(true);
    setTimeout(() => {
      updateHelper();
    }, 2000);
  };
  return (
    <Container display={modal.open ? "flex" : "none"}>
      <Notification open={remove} setOpen={setRemove} type="remove" />
      <Wrapper>
        <CloseButton>
          <CloseIcon onClick={handleClose} />
        </CloseButton>
        <Header>Warning</Header>
        <Subheader>
          Are you sure you want to delete this{" "}
          {path === "users" ? "user" : "product"}?
        </Subheader>
        <Button
          onClick={() => handleDelete(modal.type)}
          disabled={loading ? true : false}
        >
          Delete
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Warning;
