import React from "react";
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./assets/theme";
import LandingPage from "./pages/LandingPage/LandingPage";
import Error from "./pages/Error/Error";
import UserComplaintsPage from "./pages/Complaints/UserComplaintsPage"
import ComplaintsPage from "./pages/Complaints/AdminComplaintsPage"
import AddComplaintPage from "./pages/Complaints/AddComplaint"
import ComplaintResolutionPage from "./pages/Complaints/ComplaintResolutionPage";
import ComplaintDetailsPage from "./pages/Complaints/ComplaintDetails";
import UserHomepage from "./pages/UserHomepage/UserHomepage";
import UploadRecipe from "./pages/UploadRecipe/UploadRecipe";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import CheckRequestStatus from "./pages/CheckRequestStatus/CheckRequestStatus";
import UploadRecipeHero from './pages/UploadRecipeHero/UploadRecipeHero';
import AdminHomepage from "./pages/AdminHomepage/AdminHomepage";
import AddDeliveryAddress from "./pages/PaymentPage/AddDeliveryAddress";
import Details from "./pages/PaymentPage/Details";
import Payment from "./pages/PaymentPage/Payment";
import Confirmation from "./pages/PaymentPage/Confirmation";
import PaymentMethod from "./pages/PaymentPage/PaymentMethod";
import SupplierDashboard from "./pages/Supplier/SupplierDashboard";
import SupplierOrders from "./pages/Supplier/SupplierOrders";
import OrderDetail from "./pages/Supplier/OrderDetail";
import OrderFulfilment from "./pages/Supplier/OrderFulfilment";
import SupplierPantry from "./pages/Supplier/SupplierPantry";
import Cart from "./pages/Cart/Cart";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Error />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/usercomplaints" element={<UserComplaintsPage />} />
        <Route path="/addcomplaint" element={<AddComplaintPage />} />

        <Route path='/complaints/ComplaintDetailsPage/'>
          <Route path=':id' element={<ComplaintDetailsPage />}></Route>
        </Route>

        <Route path='/complaints/ComplaintResolutionPage/'>
          <Route path=':id' element={<ComplaintResolutionPage />}></Route>
        </Route>
        <Route path="/uploadRecipe" element={<UploadRecipe />} />
        <Route path="/admin" element={<AdminHomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/home" element={<UserHomepage />} />
        <Route path="/home/recipe" element={<RecipeDetails />} />
        <Route path="/uploadRecipeNavigation" element={<UploadRecipeHero />} />
        <Route path="/uploadRecipe" element={<UploadRecipe />} />
        <Route path="/checkout" element={<AddDeliveryAddress />} />
        <Route path="/details" element={<Details />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/checkReqStat" element={<CheckRequestStatus />} />
        <Route path="/admin" element={<AdminHomepage />} />
        <Route path="/supplier" element={<SupplierDashboard />} />
        <Route path="/supplier/orders" element={<SupplierOrders />} />
        <Route path="/supplier/orders/:id" element={<OrderDetail />}></Route>
        <Route path="/supplier/orders/fulfilment/:id" element={<OrderFulfilment />}> </Route>
        <Route path="supplier/pantry" element={<SupplierPantry />}></Route>
        <Route path="/uploadRecipe" element={<UploadRecipe/>} />
        <Route path="/checkReqStat" element={<CheckRequestStatus/>} />
        <Route path="/admin" element={<AdminHomepage/>} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
