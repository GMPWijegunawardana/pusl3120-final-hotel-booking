import {
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider, 
  Navigate
} from "react-router-dom";

// Context
import { NotificationProvider } from "./contexts/NotificationContext";

// protected
import ProtectedRoute from "./layouts/ProtectedRoute";

// layouts
import AuthLayout from "./layouts/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// auth
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// public
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import RoomsPage from "./pages/public/RoomsPage";
import ConfirmBookingPage from "./pages/public/ConfirmBookingPage";
import PrivacyPolicyPage from "./pages/public/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/public/TermsConditionsPage";

// admin
import UsersPage from "./pages/admin/UsersPage";
import BookingsPage from "./pages/admin/BookingsPage";
import AdminRoomsPage from "./pages/admin/AdminRoomsPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import ReviewsPage from "./pages/admin/ReviewsPage";
import NotificationsPage from "./pages/admin/NotificationsPage";
import ContactsPage from "./pages/admin/ContactsPage";

// user
import ProfilePage from "./pages/user/ProfilePage";

const App =  () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* public routes */}
        <Route path="/" element={<PublicLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="/hotel-details" element={<AboutPage/>}/>
            <Route path="/contact-us" element={<ContactPage/>}/>
            <Route path="/rooms" element={<RoomsPage/>}/>
            <Route path="/confirm-booking" element={<ConfirmBookingPage/>}/>
            <Route path="/profile" element={<ProtectedRoute roles={['user']}><ProfilePage/></ProtectedRoute>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicyPage/>}/>
            <Route path="/terms-conditions" element={<TermsConditionsPage/>}/>
        </Route>

        {/* auth routes */}
        <Route path="/auth" element={<AuthLayout/>}>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
        </Route>

        {/* super admin routes */}
        <Route path="/dashboard" element={<ProtectedRoute roles={['admin']}><DashboardLayout/></ProtectedRoute>}>
          <Route index element={<BookingsPage/>}/>
          <Route path="bookings" element={<BookingsPage/>}/>
          <Route path="rooms" element={<AdminRoomsPage/>}/>
          <Route path="users" element={<UsersPage/>}/>
          <Route path="payments" element={<PaymentsPage/>}/>
          <Route path="reviews" element={<ReviewsPage/>}/>
          <Route path="notifications" element={<NotificationsPage/>}/>
          <Route path="contacts" element={<ContactsPage/>}/>
        </Route>
      </>
    )
  )

  return (
    <NotificationProvider>
      <RouterProvider router={router}/>
    </NotificationProvider>
  );
}

export default App;