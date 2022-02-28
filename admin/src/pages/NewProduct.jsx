import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { mobile } from "../responsive";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/authRedux";
import Notification from "../components/Modal/Notification";

const Container = styled.div`
  margin: auto;
  width: 90vw;
  max-width: 1000px;
`;
const BackButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;
const Back = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  align-items: center;
  color: grey;
  font-size: 0.9rem;
  &:hover {
    color: black;
  }
`;
const Title = styled.h1`
  padding-top: 55px;
  font-weight: 300;
  ${mobile({ paddingTop: "30px" })}
`;

const TextContainer = styled.div`
  justify-content: center;
  margin: auto;
  align-items: center;
  display: flex;
`;
const Text = styled.span`
  margin-left: 5px;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  flex-wrap: wrap;
  padding: 20px;
  ${mobile({ padding: "20px 0" })}
`;
const ProductItem = styled.div`
  width: 400px;
  ${mobile({ width: "100%" })}
`;
const Label = styled.label`
  text-align: left;
  margin: 10px 0;
  font-size: 14px;
`;
const FileInput = styled.input`
  padding: 10px;
`;
const Input = styled.input`
  width: 400px;
  margin: 10px 0;
  padding: 10px;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid gray;
  ${mobile({ width: "100%" })}
`;

const Category = styled.div`
  margin: 10px 0;
`;
const CategoryLabel = styled.label`
  margin: 10px;
  font-size: 16px;
  color: #555;
  cursor: pointer;
`;
const CategoryInput = styled.input`
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
`;
const Action = styled.div``;
const Button = styled.button`
  width: 120px;
  border: none;
  background-color: black;
  color: white;
  margin: 10px 0;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  &:disabled {
    background-color: #f8f8f8;
    color: black;
    cursor: not-allowed;
  }
`;
const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const handleInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSizes = (e) => setSizes(e.target.value.split(","));
  const handleColors = (e) => setColors(e.target.value.split(","));

  const arrSizes = sizes?.map((i) => Number(i));
  const handleSubmit = (e) => {
    setAdd(true);
    e.preventDefault();
    setLoading(true);
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (progress) => {
        console.group(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const product = {
            ...inputs,
            img: downloadURL,
            size: arrSizes,
            color: colors,
          };
          addProduct(product, dispatch);
        });
      }
    );
    setTimeout(() => {
      navigate("/products");
    }, 2000);
  };
  return (
    <Container>
      <Notification open={add} setOpen={setAdd} type="add" />
      <Title>NEW PRODUCT</Title>
      <TextContainer style={{ paddingTop: "20px" }}>
        <BackButton>
          <Back
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
            <Text>back</Text>
          </Back>
        </BackButton>
      </TextContainer>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="name"
            required
            onChange={handleInput}
          />
          <Input
            name="brand"
            type="text"
            placeholder="brand"
            required
            onChange={handleInput}
          />
          <Input
            name="price"
            type="number"
            placeholder="price"
            required
            onChange={handleInput}
          />
          <Input
            name="color"
            type="text"
            placeholder="available color/s"
            required
            onChange={handleColors}
          />
          <Input
            name="size"
            type="text"
            placeholder="available size/s"
            required
            onChange={handleSizes}
          />
          <Input
            name="stocks"
            type="number"
            placeholder="stocks"
            required
            onChange={handleInput}
          />
          <Input
            name="credit"
            type="text"
            placeholder="brand's website url"
            required
            onChange={handleInput}
          />
          <Input
            name="logo"
            type="text"
            placeholder="logo image url"
            required
            onChange={handleInput}
          />
          <Category>
            <CategoryLabel>Category:</CategoryLabel>
            <CategoryInput
              type="radio"
              name="category"
              id="men"
              value="men"
              onChange={handleInput}
            />
            <CategoryLabel htmlFor="men">Men</CategoryLabel>
            <CategoryInput
              type="radio"
              name="category"
              id="women"
              value="women"
              onChange={handleInput}
            />
            <CategoryLabel htmlFor="women">Women</CategoryLabel>
          </Category>
          <ProductItem>
            <Label>Image</Label>
            <FileInput
              name="img"
              type="file"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
          </ProductItem>
          <Action>
            <Button type="submit" disabled={loading ? true : false}>
              Add Product
            </Button>
          </Action>
        </Form>
      </Wrapper>
    </Container>
  );
};
export default NewProduct;
