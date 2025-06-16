import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import LoginLayout from "./components/Layout/LoginLayout";
import Login from "./pages/Auth/Login";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores/Stores";
import Users from "./pages/Users";
import Plans from "./pages/Plans";
import Setting from "./pages/Setting";
// import CreateStore from "./pages/Stores/CreateStore";
import BulkUpload from "./pages/Products/BulkUpload";
import Products from "./pages/Products/Products";
import AddManual from "./pages/Products/AddManual";
import SignupLayout from "./components/Layout/SignupLayout";
import InviteSignup from "./pages/Auth/InviteSignup";
import Merchants from "./pages/Merchants/Merchants";
import UpdateStore from "./pages/Stores/UpdateStore";
import ReSubmitStore from "./pages/Stores/ReSubmitStore";
import { CreateStore } from "./pages/Stores/CreateStore";
import LibraryComponent from "./pages/Library/LibraryComponent";
import useAuth from "./services/useAuth";
import { jwtDecode } from "jwt-decode";


function App() {
  const { token, highestRole } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* // Protected routes can be added below this */}
          <Route element={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/bulk-upload/:storeId"
              element={<BulkUpload />}
            />
            <Route
              path="/products/add-manual/:storeId"
              element={<AddManual />}
            />
            <Route path="/products/update/:productId" element={<AddManual />} />

            <Route path="/stores" element={<Stores />} />
            <Route path="/stores/create-store" element={<CreateStore />} />
            <Route
              path="/stores/update-store/:storeId"
              element={<UpdateStore />}
            />
            <Route
              path="/stores/resubmit-store/:storeId"
              element={<ReSubmitStore />}
            />

            <Route path="/users" element={<Users />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/setting" element={<Setting />} />
            {highestRole === "SUPERADMIN" && (
              <>
                <Route path="/library" element={<LibraryComponent />} />
                <Route path="/merchants" element={<Merchants />} />
              </>
            )}
          </Route>
          {/* // Non-Protected routes can be added below this */}
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route element={<SignupLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/invite-signup" element={<InviteSignup />} />
          </Route>
          <Route
            path="/*"
            element={
              Cookies.get("token") ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

const Protected = () => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      Cookies.remove("token");
      return <Navigate to="/login" replace />;
    }

    return (token && decoded.highest_role) ? (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ) : (
      <Navigate to="/login" replace />
    );
  } catch (err) {
    console.error("Invalid token");
    Cookies.remove("token");
    return <Navigate to="/login" replace />;
  }
};
