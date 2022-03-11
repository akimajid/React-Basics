import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedPage = ({ children, needsLogin = false, guestOnly = false, allowedRoles}) => {
  const userSelector = useSelector((state) => state.user);

  if (guestOnly && needsLogin) {
    throw new Error("Only chose one props!");
  }

  if (needsLogin && !userSelector.id) {
    return <Navigate to="/" />;
  }

  if (guestOnly && userSelector.id) {
    return <Navigate to="/" />;
  }

  if (allowedRoles.length && !allowedRoles.includes(useSelector.role)) {
      return <Navigate to="/" />
  }

  return children;
};

export default ProtectedPage;
