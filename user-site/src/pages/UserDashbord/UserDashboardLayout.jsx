import React from "react";
import { Outlet } from "react-router-dom";
import SidebarWithBurgerMenu from "../../components/SidebarWithBurgerMenu";

const UserDashboardLayout = () => {
  return (
    <div className="flex">
      <SidebarWithBurgerMenu />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboardLayout;
