import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMembers } from "../redux/authRedux";
import { openModal } from "../redux/modalRedux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Table = styled.div`
  margin: 20px auto;
  width: 90vw;
  max-width: 1000px;
  height: 65vh;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
`;
const Action = styled.div`
  margin: 0 10px;
  cursor: pointer;
  color: gray;
  &:hover {
    color: black;
  }
`;

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const members = useSelector((state) => state.member.members);
  const fullName = (first, last) => {
    const firstName = first.charAt(0).toUpperCase() + first.slice(1);
    const lastName = last.charAt(0).toUpperCase() + last.slice(1);
    const completeName = firstName + " " + lastName;
    return completeName;
  };
  useEffect(() => {
    getMembers(dispatch);
  }, [dispatch]);

  const handleModal = (type) => {
    console.log(type);
    dispatch(openModal(type));
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
      renderCell: (params) => {
        return (
          <ListItem
            style={{ cursor: "pointer" }}
            onClick={() => {
              params.row.isAdmin && navigate("/account");
            }}
          >
            {fullName(params.row.firstname, params.row.lastname)}
          </ListItem>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 280,
      renderCell: (params) => {
        return (
          <ListItem
            style={{ cursor: "pointer" }}
            onClick={() => {
              params.row.isAdmin && navigate("/account");
            }}
          >
            {params.row.email}
          </ListItem>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <ListItem
            style={{ cursor: "pointer" }}
            onClick={() => {
              params.row.isAdmin && navigate("/account");
            }}
          >
            {params.row.username}
          </ListItem>
        );
      },
    },
    {
      field: "action",
      headerName: "Delete User",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            <Action>
              <DeleteOutlineOutlinedIcon
                onClick={() => handleModal(params.row._id)}
              />
            </Action>
          </>
        );
      },
    },
  ];

  return (
    <Table>
      <DataGrid
        rows={members}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8, 16, 40]}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </Table>
  );
};
export default UserList;
