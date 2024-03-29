import SidebarWithLogo from "../../../Components/Admin/Sidebar";
import Dashboard from '../../../Components/Admin/Dashboard';

const Home = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SidebarWithLogo />
      </div>
      <div className="w-3/4 mt-20">
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
