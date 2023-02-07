import { Navigate } from "react-router-dom";
import { removeAuth } from "../../util/storage"

export const loader = () => {
  removeAuth();
  return null;
}

const Logout = () => {
  return <Navigate to={'/'} />
}

export default Logout;
