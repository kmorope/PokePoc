import { Navbar } from "components/shared";
import { Outlet } from "react-router-dom";
const Shell = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Shell;
