import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import AllOrders from "./pages/AllOrders";
import AllProducts from "./pages/AllProducts";
import AllUsers from "./pages/AllUsers";
import NewProduct from "./pages/NewProduct";
import NewAdmin from "./pages/NewAdmin";
import Order from "./pages/Order";
import Product from "./pages/Product";
import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "./utility/scrollToTop";

const MainContainer = styled.div`
  height: 100vh;
`;
function App() {
  const admin = useSelector((state) => state.user?.currentUser?.isAdmin);
  return (
    <MainContainer>
      <Navbar />
      <>
        <ScrollToTop>
          <Routes>
            <Route
              path="/"
              element={admin ? <Navigate to="/dashboard" /> : <SignIn />}
            ></Route>
            {admin && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/account" element={<Account />} />
                <Route path="/newadmin" element={<NewAdmin />} />
                <Route path="/newproduct" element={<NewProduct />} />
                <Route path="/orders" element={<AllOrders />} />
                <Route path="/order/:orderId" element={<Order />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/users" element={<AllUsers />} />
              </>
            )}
          </Routes>
        </ScrollToTop>
      </>
    </MainContainer>
  );
}

export default App;
