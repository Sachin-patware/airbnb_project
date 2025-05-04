import React, {useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import useFormValidation  from "../hooks/useFormValidation";



const EditListing = () => {
  useFormValidation();
  const navigate = useNavigate();
  const location = useLocation();
  const { listing } = location.state;

  if (!listing) return <div>No listing data provided</div>;


     const [formData, setFormData] = useState({
       listing: {
         title:listing.title || '',
         description:listing.description || '',
         image_url: listing.image_url || '',
         price: listing.price || '',
         location: listing.location || '',
         country:listing.country || '',
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
      try {
        const res = await axios.put(
          `http://localhost:5555/listing/${listing._id}`,
          formData
        );
        toast.success(res.data.message || "Listing Updated successfully");
        navigate(`/listing/${listing._id}`);
       } catch (error) {
            if (error.response && error.response.data) {
            
              const serverError = error.response.data.error;
              const errorMessage = Array.isArray(serverError)
                ? serverError.join("\n")
                : serverError;
              toast.error(errorMessage);
            } 
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
     Title Looks good!
    </div>
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
        required
       
      />
       <div className="invalid-feedback">
        image_url should be valid .
      </div>
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
      <button type="submit" className="btn btn-danger">Save</button>
      <button type="button" className="btn btn-secondary">Cancel</button>
    </div>
  </form>
 
      </div>
    );
}
export default EditListing;