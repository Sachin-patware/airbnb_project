import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axiosInstance"; 
const Logout = ({setUser}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        const res = await axios.get("/logout");
        toast.success(res.data.message || "Logout successful");
        setUser(res.data.user)
         setUser(res.data.userid);
        navigate("/listing"); 
      } catch (err) {
        console.error("Logout failed:", err);
        toast.error("Something went wrong during logout");
      }
    };

    doLogout();
  }, [navigate]);

  return null; 
};

export default Logout;
