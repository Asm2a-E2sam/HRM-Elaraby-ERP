import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../../redux/rtk/features/user/userApi";

function Logout() {
  const id = Number(localStorage.getItem("id"));
  const [logout] = useLogoutUserMutation()
  useEffect(() => {
    logout(id)
  }, [logout, id]);
}
export default Logout;
