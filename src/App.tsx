import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DashboardLayout from "./layouts/DashboardLayout";
import UserList from "./pages/UserList";
import SessionContent from "./components/SessionContent";
import SessionDetails from "./components/SessionDetails";
import ConfigList from "./pages/ConfigList";
import ConfigEntityDetailsPage from "./pages/ConfigEntityDetailsPage";
import { DynamicPage } from "./pages/DynamicPage";

import DynamicFormPage from "./pages/DynamicFormPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route index path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<UserList />} />
            {/* <Route path="user-create" element={<UserCreatePage />} />
            <Route path="user-details/:id" element={<UserDetailsPage />} /> */}

            <Route path="configurations" element={<ConfigList />} />
            <Route
              path="configurations/:id"
              element={<ConfigEntityDetailsPage />}
            />
            <Route path="sessions" element={<SessionContent />} />
            <Route path="session-details/:id" element={<SessionDetails />} />

            <Route path=":entity" element={<DynamicPage />} />
            <Route path=":entity/create" element={<DynamicFormPage />} />
            <Route path=":entity/:id" element={<DynamicPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

