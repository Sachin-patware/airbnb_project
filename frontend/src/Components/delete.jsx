import axios from "axios";
import { useNavigate } from "react-router-dom";



const DeleteListing = ({ listing }) => {
    const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5555/listing/${listing._id}`
        
      );

      navigate("/listings");
      console.log("Deleted:", res.data);
    } catch (err) {
      console.error("Error deleting listing:", err);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-outline-secondary shadow-sm px-3 py-2">
      Delete
    </button>
  );
};

export default DeleteListing;
