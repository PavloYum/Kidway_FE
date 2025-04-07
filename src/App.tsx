import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import OrganizationForm from "./components/OrganizationForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="organizations" element={<OrganizationForm />} />
        <Route index element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
