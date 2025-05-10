import axios from '../axiosInstance';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteListing = ({ listing }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `/listing/${listing._id}`
      );
      toast.success(res.data.message);
      navigate("/listings");
    } catch (err) {
      toast.error("Failed to delete listing");
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
