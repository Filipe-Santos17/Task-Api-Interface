// components/Layout.js
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Layout() {
  return (
    <div className="mx-auto my-4 sm:max-w-[440px] md:max-w-[600px] lg:max-w-[768px]">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
