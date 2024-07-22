import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../redux/rtk/features/user/userApi";

function Logout() {
  const id = Number(localStorage.getItem("id"));
  const [logout] = useLogoutMutation()
  useEffect(() => {
    logout(id)
  }, [logout, id]);
}
export default Logout;
