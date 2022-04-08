import { useNavigate } from "react-router-dom";
import { IconSearch, IconDoorExit } from "@tabler/icons";
import { useAuth } from "context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div
      className="navbar bg-base-100 fixed z-50"
      style={{ marginTop: "-16px" }}
    >
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <button
          onClick={() => navigate("/")}
          className="btn btn-ghost normal-case text-xl my-3"
        >
          PokePoc
        </button>
      </div>
      <div className="navbar-end">
        <div className="btn btn-ghost btn-circle" onClick={logout}>
          <IconDoorExit
            className="h-5 w-5 my-3"
            stroke={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
