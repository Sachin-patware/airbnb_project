import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axiosInstance"; 
const Logout = ({setUser ,setEmail}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        const res = await axios.get("/logout");
        toast.success(res.data.message || "Logout successful");
        setUser(null)
        setEmail(null);
        navigate("/"); 
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
