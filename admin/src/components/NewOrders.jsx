import styled from "styled-components";
import { formatAmount } from "../utility/formatAmount";
import { formatDate } from "../utility/formatDate";
import { useState, useEffect } from "react";
import { userRequest } from "../request";
import { useNavigate } from "react-router-dom";
import { mobile, tablet, bigtablet } from "../responsive";

const TransactionContainer = styled.div`
  flex: 2.5;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
  border-radius: 10px;
  ${mobile({ minWidth: "250px", marginTop: "20px" })}
`;
const Wrapper = styled.div`
  overflow: hidden;
  height: 300px;
`;
const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  margin-left: 10px;
  ${bigtablet({ fontSize: "20px" })}
  ${tablet({ fontSize: "18px" })}
  ${mobile({ fontSize: "16px" })}
`;
const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`;
const TableHeading = styled.thead``;
const TableBody = styled.tbody``;
const TableHeader = styled.th`
  text-align: left;
  ${mobile({ fontSize: "14px" })}
`;
const TableRow = styled.tr`
  text-align: left;
`;

const Info = styled.td`
  font-weight: 300;
  ${mobile({ fontSize: "12px" })}
`;

const Action = styled.div`
  width: 100%;
  text-align: center;
  margin: auto;
  padding: 5px;
`;
const Status = styled.h3`
  color: ${(props) => props.color};
  font-size: 16px;
  ${mobile({ fontSize: "12px" })}
`;
const Button = styled.button`
  width: 120px;
  border: none;
  background-color: #110f12;
  color: white;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
`;

const NewOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders/?new=true");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
  const CurrentStatus = ({ type }) => {
    return (
      <Status
        color={
          type === "Delivered"
            ? "#5cb85c"
            : type === "Shipped"
            ? "#0275d8"
            : type === "To Ship"
            ? "#110f12"
            : "#d9534f"
        }
      >
        {type}
      </Status>
    );
  };
  return (
    <TransactionContainer>
      <Title>Latest orders</Title>
      <Wrapper>
        <Table>
          <TableHeading>
            <TableRow>
              <TableHeader>User</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHeading>
          <TableBody>
            {orders.map((item) => (
              <TableRow key={item._id}>
                <Info>{item.name}</Info>
                <Info>{formatDate(item.createdAt)}</Info>
                <Info>{formatAmount(item.amount)}</Info>
                <Info>
                  <CurrentStatus type={item.status} />
                </Info>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>

      <Action>
        <Button
          onClick={() => {
            navigate("/orders");
          }}
        >
          View all
        </Button>
      </Action>
    </TransactionContainer>
  );
};
export default NewOrders;
