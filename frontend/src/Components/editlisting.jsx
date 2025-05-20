import { useState } from "react";
import axios from '../axiosInstance';
import { useLocation ,Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import useFormValidation  from "../hooks/useFormValidation";



const EditListing = () => {
  useFormValidation();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { listing } = location.state;


     const [formData, setFormData] = useState({
       listing: {
         title:listing.title ||"",
         description:listing.description ||"",
         image_url: listing.image_url||"" ,
         price: listing.price ||"",
         location: listing.location ||"",
         country:listing.country ||"",
       }
     });
     const handleInputChange = (e) => {
       const { name, value } = e.target;
       setFormData((prev) => ({
         ...prev,
         listing: {
           ...prev.listing,
           [name]: value,
         },
       }));
     };
     
     const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await axios.put(
          `/listing/${listing._id}`,
          formData
        );
        toast.success(res.data.message);
        navigate(`/listing/${listing._id}`);
       } catch (error) {
        const warning = error.response?.data?.warning;
        const owner= error.response?.data?.isowner;
      if (! owner) {
        toast.warning(warning || "You must be loggedIn to Update" );
        navigate("/login");
        return;
      }
      else if(owner){
        toast.warning(warning);
        return
      }
     
      if (error.response && error.response.data) {
            
              const serverError = error.response.data.error;
              const errorMessage = Array.isArray(serverError)
                ? serverError.join("\n")
                : serverError;
              toast.error(errorMessage);
            } 
          }  
        finally{
      setLoading(false);
    }          
    };
  

   return (

    <div className="mb-5">
     
    <h1 className="mb-4 mt-3 text-center "> Edit Listing</h1>
  
  <form onSubmit={handleSubmit} className="needs-validation container p-4 border rounded shadow-sm bg-light mb-5" noValidate>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">Title</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter your Title"
        id="title"
        name="title"
        value={formData.listing.title}
        onChange={handleInputChange}
        required
      />
      <div className="valid-feedback">
      Looks good !
    </div>
     <div className="invalid-feedback">Title is required.</div>
    </div>

    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <textarea
        className="form-control"
        id="description"
        name="description"
        rows="3"
        value={formData.listing.description}
        onChange={handleInputChange}
        required
      />
      <div className="invalid-feedback">
        please enter a short description .
      </div>
    </div>

    <div className="mb-3">
      <label htmlFor="image_url" className="form-label">Image URL</label>
      <input
        type="url"
        className="form-control"
        id="image_url"
        name="image_url"
        placeholder="Enter image URL/link"
        value={formData.listing.image_url}
        onChange={handleInputChange}
      />
  
    </div>
<div className="row">
    <div className="mb-3 col-4">
      <label htmlFor="price" className="form-label">Price</label>
      <input
        type="number"
        className="form-control"
        id="price"
        name="price"
        placeholder="1200"
        value={formData.listing.price}
        onChange={handleInputChange}
        required
      />
      <div className="invalid-feedback">
        Price should be valid .
      </div>
    </div>

    <div className="mb-3 col-8">
      <label htmlFor="location" className="form-label">Location</label>
      <input
        type="text"
        className="form-control"
        id="location"
         placeholder="Enter location"
        name="location"
        value={formData.listing.location}
        onChange={handleInputChange}
        required
      />
      <div className="invalid-feedback">
        Locatin should be valid .
      </div>
    </div>
    </div>

    <div className="mb-3">
      <label htmlFor="country" className="form-label">Country</label>
      <input
        type="text"
        className="form-control"
         placeholder="Enter country"
        id="country"
        name="country"
        value={formData.listing.country}
        onChange={handleInputChange}
        required
      />
      <div className="invalid-feedback">
        Country should be valid .
      </div>
    </div>

    <div className="d-flex justify-content-end gap-2">
      <button type="submit" className="btn btn-outline-danger" disabled={loading} >
       {loading ? "Saving..." : " Save"}  
      </button>
      <Link to={`/listing/${listing._id}`} className="btn btn-outline-dark" >
           Cancel
    </Link>
    </div>
  </form>
 
      </div>
    );
}
export default EditListing;