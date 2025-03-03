// layouts/AuthenticatedLayout.jsx
import { Outlet } from 'react-router-dom';
import SidebarWithBurgerMenu from '../components/SidebarWithBurgerMenu';

const AuthenticatedLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarWithBurgerMenu />
      <div className="flex-1 p-4 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;