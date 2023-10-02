import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(user.user_metadata);
  if (!user.user_metadata.is_admin) {
    console.log("uslo");
    return navigate("/");
  }

  return <Outlet />;
};

export default ProtectedRoute;
