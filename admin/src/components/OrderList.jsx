import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { formatAmount } from "../utility/formatAmount";
import { formatDate } from "../utility/formatDate";
import { getOrders } from "../redux/authRedux";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  margin: 20px auto;
  width: 90vw;
  max-width: 1000px;
  height: 65vh;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 110,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/order/" + params.row._id);
            }}
          >
            {formatDate(params.row.createdAt)}
          </ListItem>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 190,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/order/" + params.row._id);
            }}
          >
            {params.row.name}
          </ListItem>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 370,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/order/" + params.row._id);
            }}
          >
            {params.row.address.line1}, {params.row.address.city},{" "}
            {params.row.address.country}
          </ListItem>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 140,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/order/" + params.row._id);
            }}
          >
            {formatAmount(params.row.amount)}
          </ListItem>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => {
        return (
          <ListItem
            style={{
              color:
                params.row.status === "Delivered"
                  ? "#5cb85c"
                  : params.row.status === "Shipped"
                  ? "#0275d8"
                  : params.row.status === "To Ship"
                  ? "#110f12"
                  : "#d9534f",
            }}
            onClick={() => {
              navigate("/order/" + params.row._id);
            }}
          >
            {params.row.status}
          </ListItem>
        );
      },
    },
  ];

  return (
    <MainContainer>
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8, 16, 40]}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </MainContainer>
  );
};
export default OrderList;
