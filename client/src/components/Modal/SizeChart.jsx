import React, { useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import { mobile } from "../../responsive";
import CloseIcon from "@mui/icons-material/Close";

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  height: 95%;
  position: relative;
  border-radius: 20px;
  background-color: white;
  margin: auto;
  max-width: 500px;
  overflow-x: hidden;
  padding: 100px 20px;
  ${mobile({ width: "100%" })};
`;
const Top = styled.div`
  margin-left: 5px;
  font-size: 1.1rem;
  position: absolute;
  top: 5%;
  width: 100%;
`;
const Header = styled.h1`
  font-size: 1.5rem;
`;
const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 5%;
  right: 5%;
  color: black;
`;
const ImageContainer = styled.div`
  width: 90%;
  margin: auto;
  align-items: center;
`;
const Image = styled.img`
  width: 90%;
  margin: auto;
`;
const Subheader = styled.h3`
  font-size: 1rem;
  margin: 30px 0px;
`;
const Step = styled.span`
  border: 1px solid black;
  border-radius: 50%;
  font-size: 0.9rem;
  padding: 4px 9px;
`;
const Description = styled.p`
  font-size: 0.9rem;
  margin: 15px 0px;
`;
const Button = styled.button`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 12px 25px;
  background-color: black;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  margin: 20px auto;
  transition: all 0.3s ease-out;
  ${mobile({ width: "100%" })}
`;
const columns = [
  {
    id: "menUS",
    label: "Men US",
    minWidth: 40,
    align: "center",
  },
  {
    id: "womenUS",
    label: "Women US",
    minWidth: 40,
    align: "center",
  },
  {
    id: "uk",
    label: "UK",
    minWidth: 40,
    align: "center",
  },
  {
    id: "eu",
    label: "EU",
    minWidth: 40,
    align: "center",
  },
  {
    id: "cm",
    label: "CM",
    minWidth: 40,
    align: "center",
  },
];

const createData = (menUS, uk, eu, cm) => {
  const womenUS = menUS + 1.5;
  return { menUS, womenUS, uk, eu, cm };
};

const rows = [
  createData(3.5, 3, 35.5, 22.5),
  createData(4, 3.5, 36, 23),
  createData(4.5, 4, 36.5, 23.5),
  createData(5, 4.5, 37.5, 23.5),
  createData(5.5, 5, 38, 24),
  createData(6, 5.5, 38.5, 24),
  createData(6.5, 6, 39, 24.5),
  createData(7, 6, 40, 25),
  createData(7.5, 6.5, 40.5, 25.5),
  createData(8, 7, 41, 26),
  createData(8.5, 7.5, 42, 26.5),
  createData(9, 8, 42.5, 27),
  createData(9.5, 8.5, 43, 27.5),
  createData(10, 9, 44, 28),
  createData(10.5, 9.5, 44.5, 28.5),
  createData(11, 10, 45, 29),
  createData(11.5, 10.5, 45.5, 29.5),
  createData(12, 11, 46, 30),
  createData(12.5, 11.5, 47, 30.5),
  createData(13, 12, 47.5, 31),
  createData(13.5, 12.5, 48, 31.5),
  createData(14, 13, 48.5, 32),
  createData(14.5, 13.5, 49, 32.5),
  createData(15, 14, 49.5, 33),
];
const SizeChart = ({ showModal, setShowModal }) => {
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        document.body.style.overflow = "auto";
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  return (
    <Container>
      <Wrapper>
        <Top>
          <Header>Size Guide</Header>
        </Top>
        <CloseButton>
          <CloseIcon onClick={closeModal} />
        </CloseButton>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 550 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.menUS}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Subheader>How to measure</Subheader>
        <Step>1</Step>
        <Description>
          Put your feet on a piece of paper and make sure the paper covers your
          whole feet.
        </Description>
        <Step>2</Step>
        <Description>
          Put a mark on the back of your heel as well as at the end of your
          longest toe. Draw a horizontal line on both marks.
        </Description>
        <Step>3</Step>
        <Description>
          Measure the distance between the two horizontal line.
        </Description>
        <ImageContainer>
          <Image src="https://www.schulershoes.com/media/wysiwyg/FootMeasureIcon.jpg" />
        </ImageContainer>
        <Button onClick={closeModal}>Close</Button>
      </Wrapper>
    </Container>
  );
};

export default SizeChart;
