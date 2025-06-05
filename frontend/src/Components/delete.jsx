import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteListing = ({ listing }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/listing/${listing._id}`);
      toast.success(res.data.message);
      navigate("/listing");
    } 
    catch (error) {
        const warning_login = error.response?.data?.warning_login;
  const warning_owner = error.response?.data?.warning_owner;
     if (warning_login) {
        toast.warning(warning_login|| "You must be loggedIn to Delete a listing." );
        navigate("/login");
        return;
      }
    else if (warning_owner) {
        toast.warning(warning_owner|| "You are not authorized to perform this action");
        return;
      }
      
      else toast.error("Failed to delete listing");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-outline-dark shadow-sm px-3 py-2"
    >
      Delete
    </button>
  );
};

export default DeleteListing;
