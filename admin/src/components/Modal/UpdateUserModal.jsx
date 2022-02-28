import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../redux/modalRedux";
import { updateMember } from "../../redux/authRedux";
import styled from "styled-components";
import { mobile } from "../../responsive";
import Notification from "./Notification";
import CloseIcon from "@mui/icons-material/Close";

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
`;
const FormContainer = styled.div`
  max-height: 400px;
  position: relative;
  background-color: white;
  margin: auto;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  padding: 50px 30px;
  ${mobile({ width: "80%" })};
`;
const Header = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  margin: 15px 0px;
`;
const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 5%;
  right: 5%;
  color: black;
`;
const Form = styled.form`
  margin: auto;
  text-align: center;
`;
const InputContainer = styled.div`
  margin: 30px auto;
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid gray;
`;

const Input = styled.input`
  border: none;
  border-radius: 20px;
  flex: 8;
  padding-left: 20px;
  &:focus {
    outline: none !important;
  }
  ${mobile({ flex: "5" })}
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

const UpdateUserModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modal = useSelector((state) => state.modal);
  const currentUser = useSelector((state) => state.user.currentUser);
  const adminId = currentUser._id;
  const admin = useSelector((state) =>
    state.member.members.find((admin) => admin._id === adminId)
  );
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdate(true);
    const userID = currentUser?._id;
    const userInput = { ...input };
    setLoading(true);
    updateMember(userID, userInput, dispatch);
    setTimeout(() => {
      updateHelper();
      navigate("/users");
    }, 2000);
  };
  const updateHelper = () => {
    document.getElementById("modalForm").reset();
    setLoading(false);
    dispatch(closeModal());
  };
  const handleClose = () => {
    setInput({});
    dispatch(closeModal());
  };
  const handleInput = (e) => {
    setInput({ [e.target.name]: e.target.value });
  };
  const capitalize = (text) => {
    return text[0].toUpperCase() + text.slice(1);
  };
  const type = () => {
    if (modal.type === "First Name") {
      return "text";
    } else if (modal.type === "Last Name") {
      return "text";
    } else if (modal.type === "Username") {
      return "text";
    } else if (modal.type === "Email") {
      return "email";
    } else if (modal.type === "Password") {
      return "password";
    }
  };
  const name = () => {
    if (modal.type === "First Name") {
      return "firstname";
    } else if (modal.type === "Last Name") {
      return "lastname";
    } else if (modal.type === "Username") {
      return "username";
    } else if (modal.type === "Email") {
      return "email";
    } else if (modal.type === "Password") {
      return "password";
    }
  };
  const placeholder = () => {
    if (modal.type === "First Name") {
      return capitalize(admin.firstname);
    } else if (modal.type === "Last Name") {
      return capitalize(admin.lastname);
    } else if (modal.type === "Username") {
      return admin.username;
    } else if (modal.type === "Email") {
      return admin.email;
    } else if (modal.type === "Password") {
      return "•••••••••••";
    }
  };
  return (
    <ModalContainer display={modal.open ? "flex" : "none"}>
      <Notification open={update} setOpen={setUpdate} type="update" />
      <FormContainer>
        <CloseButton>
          <CloseIcon onClick={handleClose} />
        </CloseButton>
        <Header>Update Your {modal.type}</Header>
        <Form onSubmit={handleUpdate} id="modalForm">
          <InputContainer>
            <Input
              type={type()}
              name={name()}
              placeholder={placeholder()}
              onChange={handleInput}
              required
              minLength={
                modal.type === "Password"
                  ? 8
                  : modal.type === "Username"
                  ? 5
                  : 2
              }
            />
          </InputContainer>
          <Button type="submit" disabled={loading ? true : false}>
            Update
          </Button>
        </Form>
      </FormContainer>
    </ModalContainer>
  );
};

export default UpdateUserModal;
