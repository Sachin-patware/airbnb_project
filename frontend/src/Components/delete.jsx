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
      const warning = error.response?.data?.warning;
      const owner = error.response?.data?.isowner;
     if (!owner) {
        toast.warning(warning || "You must be loggedIn to Delete a listing." );
        navigate("/login");
        return;
      }
    else if (owner) {
        toast.warning(warning);
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
