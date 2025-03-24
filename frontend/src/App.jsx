import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// import Dashboard from './pages/Dashboard'4;
import LoginOTPVerification from './pages/LoginOtpPage';
import PrivateRoute from './context/PrivateRoute';
import MainLayout from './pages/layout/MainLayout';
import User_Info from './pages/UserInfo';
import Landing_Page from './pages/LandingPage';
import Inventory from './pages/Inventory';
import Invoice from './pages/Invoice';
import { RoutesPathName } from './constants';
// import PrivateRoute from './context/PrivateRoute';


const router = createBrowserRouter([

  {
    path: '/',
    element: <Landing_Page />,  // Landing Page should be first
  },
  {
    path: RoutesPathName.SIGNUP_PAGE,
    element: <Register />,
  },
  {
    path: RoutesPathName.LOGIN_PAGE,
    element: <Login />,
  },
  {
    path: RoutesPathName.LoginOTPVerification_Page,
    element: <LoginOTPVerification />,
  },
  {
    path: RoutesPathName.User_Info,
    element: <User_Info />,
  }, 
  {
    path: RoutesPathName.Inventory_page,
    element: (
      <PrivateRoute>
      <Inventory />
    </PrivateRoute>
    )
  },
  {
    path: RoutesPathName.Invoice_page,
    element: (
      <PrivateRoute>
      <Invoice />
    </PrivateRoute>
    )
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;