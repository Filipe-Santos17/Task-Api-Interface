// components/Layout.js
import { Outlet } from "react-router-dom";
import LoginBackground from "./LoginBg";

function LayoutLogin() {
  return (
    <section className="grid w-screen h-screen grid-cols-2 overflow-y-hidden">
        <LoginBackground />
        <section className="flex items-center justify-center bg-bgBody">
            <Outlet />
        </section>
    </section>
  );
}

export default LayoutLogin;
