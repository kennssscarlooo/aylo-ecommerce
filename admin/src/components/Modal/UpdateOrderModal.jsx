import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { closeModal } from "../../redux/modalRedux";
import { updateOrder } from "../../redux/authRedux";
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
const Message = styled.p`
  margin: 30px auto;
  width: 90%;
  text-align: center;
`;

const Form = styled.form`
  margin: auto;
  text-align: center;
`;
const Agreement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;
const Label = styled.label`
  display: block;
  font-size: 16px;
  margin: 0 10px;
  color: #555;
  cursor: pointer;
`;
const Radio = styled.input`
  width: 15px;
  height: 15px;
  padding: 0;
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  cursor: pointer;
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

const UpdateOrderModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const orderUrl = location.pathname.split("/").at(-1);
  const modal = useSelector((state) => state.modal);
  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderUrl)
  );
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdate(true);
    setInput({ [e.target.name]: e.target.value });
    const orderId = order?._id;
    const userInput = { ...input };
    setLoading(true);
    updateOrder(orderId, userInput, dispatch);
    setTimeout(() => {
      updateHelper();
      navigate("/orders");
    }, 2000);
  };
  const updateHelper = () => {
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

  return (
    <ModalContainer display={modal.open ? "flex" : "none"}>
      <Notification open={update} setOpen={setUpdate} type="update" />
      <FormContainer>
        <CloseButton>
          <CloseIcon onClick={handleClose} />
        </CloseButton>
        <Header>Update Order Status</Header>
        <Form onSubmit={handleUpdate}>
          <Message>Do you want to ship this order?</Message>
          <Agreement>
            <Label htmlFor="yes">
              <Radio
                type="radio"
                name="status"
                value="Shipped"
                onChange={handleInput}
                id="yes"
                required
              />
              Yes
            </Label>
            <Label htmlFor="no">
              <Radio
                type="radio"
                name="status"
                value={order.status}
                onChange={handleInput}
                id="no"
                required
              />
              No
            </Label>
          </Agreement>
          <Button type="submit" disabled={loading ? true : false}>
            Update Order
          </Button>
        </Form>
      </FormContainer>
    </ModalContainer>
  );
};

export default UpdateOrderModal;
