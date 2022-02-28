import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { formatAmount } from "../utility/formatAmount";
import { openModal } from "../redux/modalRedux";
import { getProducts } from "../redux/authRedux";
import styled from "styled-components";

const Table = styled.div`
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

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: gray;
  &:hover {
    color: black;
  }
`;
const ProductImg = styled.img`
  width: 70px;
  object-fit: cover;
  margin-right: 15px;
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleModal = (type) => dispatch(openModal(type));

  const columns = [
    {
      field: "product",
      headerName: "Product",
      width: 350,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/product/" + params.row._id);
            }}
          >
            <ProductImg src={params.row.img} />
            {params.row.name}
          </ListItem>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 140,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/product/" + params.row._id);
            }}
          >
            {formatAmount(params.row.price)}
          </ListItem>
        );
      },
    },
    {
      field: "stocks",
      headerName: "Stock",
      width: 100,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/product/" + params.row._id);
            }}
          >
            {params.row.stocks}
          </ListItem>
        );
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 120,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/product/" + params.row._id);
            }}
          >
            {params.row.brand}
          </ListItem>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
      renderCell: (params) => {
        return (
          <ListItem
            onClick={() => {
              navigate("/product/" + params.row._id);
            }}
          >
            {params.row.category}
          </ListItem>
        );
      },
    },
    {
      field: "action",
      headerName: "Delete",
      width: 110,
      renderCell: (params) => {
        return (
          <ListItem>
            <Button>
              <DeleteOutlineOutlinedIcon
                onClick={() => handleModal(params.row._id)}
              />
            </Button>
          </ListItem>
        );
      },
    },
  ];
  return (
    <Table>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[8, 16, 40]}
        checkboxSelection
      />
    </Table>
  );
};

export default ProductList;
