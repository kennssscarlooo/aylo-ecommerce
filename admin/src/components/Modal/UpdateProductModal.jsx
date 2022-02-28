import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { closeModal } from "../../redux/modalRedux";
import { updateProduct } from "../../redux/authRedux";
import styled from "styled-components";
import { mobile } from "../../responsive";
import Notification from "./Notification";
import CloseIcon from "@mui/icons-material/Close";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

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
  position: relative;
  background-color: white;
  margin: auto;
  text-align: center;
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
  margin-bottom: 15px;
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
const Input = styled.input`
  width: 300px;
  margin: 10px 0;
  padding: 10px;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid gray;
  ${mobile({ width: "90%" })}
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
const Action = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;
const Upload = styled.div`
  margin: 20px auto;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileInput = styled.input`
  flex: 2;
  padding-left: 20px;
`;
const Image = styled.img`
  width: 80px;
  flex: 1;
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
  margin: 0 10px;
  &:disabled {
    background-color: #f8f8f8;
    color: black;
    cursor: not-allowed;
  }
`;

const UpdateProductModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const productId = location.pathname.split("/").at(-1);
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    brand: product.brand,
    stocks: product.stocks,
    logo: product.logo,
    credit: product.credit,
  });
  const [file, setFile] = useState(product.img);
  const [sizes, setSizes] = useState([product.size]);
  const [colors, setColors] = useState([product.color]);

  const handleInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSizes = (e) => setSizes(e.target.value.split(","));
  const handleColors = (e) => setColors(e.target.value.split(","));
  const arrSizes = sizes?.map((i) => Number(i));

  const handleUpdate = (e) => {
    e.preventDefault();
    if (product.img !== file) {
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
            const finalProduct = {
              ...inputs,
              img: downloadURL,
              size: arrSizes,
              color: colors,
            };
            updateProduct(productId, finalProduct, dispatch);
          });
        }
      );
      setTimeout(() => {
        updateHelper();
        navigate("/products");
      }, 2000);
    } else {
      setLoading(true);
      const finalProduct = {
        ...inputs,
        img: file,
        size: arrSizes,
        color: colors,
      };
      updateProduct(productId, finalProduct, dispatch);
      setTimeout(() => {
        updateHelper();
        navigate("/products");
      }, 2000);
    }
    setUpdate(true);
  };
  const updateHelper = () => {
    setLoading(false);
    dispatch(closeModal());
  };
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <ModalContainer display={modal.open ? "flex" : "none"}>
      <Notification open={update} setOpen={setUpdate} type="update" />
      <FormContainer>
        <CloseButton>
          <CloseIcon onClick={handleClose} />
        </CloseButton>
        <Header>Update {product.name}</Header>
        <Form onSubmit={handleUpdate}>
          <Input
            name="name"
            type="text"
            placeholder={product.name}
            onChange={handleInput}
          />
          <Input
            name="brand"
            type="text"
            placeholder={product.brand}
            onChange={handleInput}
          />
          <Input
            name="price"
            type="number"
            placeholder={product.price}
            onChange={handleInput}
          />
          <Input
            name="color"
            type="text"
            placeholder={product.color}
            onChange={handleColors}
          />
          <Input
            name="size"
            type="text"
            placeholder={product.size}
            onChange={handleSizes}
          />
          <Input
            name="stocks"
            type="number"
            placeholder={product.stocks}
            onChange={handleInput}
          />
          <Input
            name="credit"
            type="text"
            placeholder={product.credit}
            onChange={handleInput}
          />
          <Input
            name="logo"
            type="text"
            placeholder={product.logo}
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
          <Upload>
            <Image src={product.img} />
            <FileInput
              name="file"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Upload>
          <Action>
            <Button type="submit" disabled={loading ? true : false}>
              Update
            </Button>
          </Action>
        </Form>
      </FormContainer>
    </ModalContainer>
  );
};

export default UpdateProductModal;
