import styled from "styled-components";
import Notification from "./Notification";
import { mobile } from "../../responsive";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalRedux";
import CloseIcon from "@mui/icons-material/Close";
import { updateOrderStatus } from "../../redux/authRedux";

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
const Modal = styled.div`
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
const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 5%;
  right: 5%;
  color: black;
`;
const Header = styled.h2`
  text-align: center;
  margin: 10px auto;
  font-weight: 300;
  ${mobile({ fontSize: "24px" })}
`;

const Form = styled.form`
  margin: auto;
  text-align: center;
`;
const Message = styled.p`
  margin: 30px auto;
  width: 90%;
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
  margin: 0 10px;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const modal = useSelector((state) => state.modal);
  const orderUrl = location.pathname.split("/").at(-1);
  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderUrl)
  );

  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdate(true);
    const orderId = order?._id;
    updateOrderStatus(orderId, status, dispatch);
    setLoading(true);
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
    setStatus({});
    dispatch(closeModal());
  };
  const handleInput = (e) => {
    setStatus({ [e.target.name]: e.target.value });
  };

  return (
    <ModalContainer display={modal.open ? "flex" : "none"}>
      <Notification open={update} setOpen={setUpdate} type="update" />
      <Modal>
        <CloseButton>
          <CloseIcon onClick={handleClose} />
        </CloseButton>
        <Header>Update Order Status</Header>
        <Form onSubmit={handleUpdate}>
          <Message>
            {order.status === "To Ship"
              ? "Are you sure you want to cancel your order? Your card will not be charge."
              : order.status === "Shipped"
              ? "Did you received your order/s properly? If you select 'yes', your card will be charge."
              : null}
          </Message>
          <Agreement>
            <Label htmlFor="yes">
              <Radio
                type="radio"
                name="status"
                value={
                  order.status === "To Ship"
                    ? "Cancelled"
                    : order.status === "Shipped"
                    ? "Delivered"
                    : null
                }
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
      </Modal>
    </ModalContainer>
  );
};

export default UpdateOrderModal;
