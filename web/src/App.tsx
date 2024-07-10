import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import LayoutLogin from "./components/LayoutLogin"
import Login from "./pages/AuthPages/Login";
import CreateUser from "./pages/AuthPages/Create";
import ProtectedRouter from "./auth/authProtected.route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutLogin/>}>
          <Route path="login" element={<Login />} />
          <Route path="create-user" element={<CreateUser/>} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          } />
          <Route path=":id" element={
            <ProtectedRouter>
              <Tasks />
            </ProtectedRouter>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
