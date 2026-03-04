import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DashboardLayout from "./layouts/DashboardLayout";
import SessionContent from "./components/SessionContent";
import SessionDetails from "./components/SessionDetails";
import ConfigList from "./pages/ConfigList";
import ConfigEntityDetailsPage from "./pages/ConfigEntityDetailsPage";
import { DynamicPage } from "./pages/DynamicPage";

import DynamicFormPage from "./pages/DynamicFormPage";
import { DashboardPage } from "./pages/DashboardPage";
import DynamicDetailsPage from "./pages/DynamicDetailsPage";

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
            <Route index element={<DashboardPage />} />
            {/* <Route path="user-create" element={<UserCreatePage />} /> */}
            {/* <Route path="users/:id" element={<UserDetailsPage />} />  */}

            <Route path="configurations" element={<ConfigList />} />
            <Route
              path="configurations/:id"
              element={<ConfigEntityDetailsPage />}

            />
             
            <Route path="sessions" element={<SessionContent />} />
            <Route path="session-details/:id" element={<SessionDetails />} />

            <Route path=":entity" element={<DynamicPage />} />
            <Route path=":entity/create" element={<DynamicFormPage />} />
            <Route path=":entity/:id" element={   <DynamicDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

