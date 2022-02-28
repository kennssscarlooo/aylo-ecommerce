import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Bag from "./pages/Bag";
import Order from "./pages/Order";
import Success from "./pages/Success";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import OrderHistory from "./pages/Orders";
import { useSelector } from "react-redux";
import ScrollToTop from "./utility/ScrollToTop";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/products/" element={<ProductList />}></Route>
          <Route path="/products/:category" element={<ProductList />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
          <Route path="/bag" element={<Bag />}></Route>
          <Route
            path="/account"
            element={user === null ? <Navigate to="/sign-in" /> : <Account />}
          ></Route>
          <Route
            path="/orders"
            element={
              user === null ? <Navigate to="/sign-in" /> : <OrderHistory />
            }
          ></Route>
          <Route
            path="/order/:id"
            element={user === null ? <Navigate to="/sign-in" /> : <Order />}
          ></Route>
          <Route
            path="/success"
            element={user === null ? <Navigate to="/sign-in" /> : <Success />}
          ></Route>
          <Route
            path="/sign-in"
            element={user ? <Navigate to={-1} /> : <SignIn />}
          ></Route>
          <Route
            path="/sign-up"
            element={user ? <Navigate to={-2} /> : <SignUp />}
          ></Route>
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;
