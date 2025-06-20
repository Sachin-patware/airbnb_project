import { useState } from "react";
import axios from "../axiosInstance";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFormValidation from "../hooks/useFormValidation";

const EditListing = () => {
  useFormValidation();
  const navigate = useNavigate();
  const location = useLocation();
  const { listing } = location.state;
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: listing.title || "",
    description: listing.description || "",
    price: listing.price || "",
    location: listing.location || "",
    category: listing.category || "",
    country: listing.country || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      if (imageFile) {
        data.append("image_url", imageFile);
      }

      const res = await axios.post(`/listing/${listing._id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-HTTP-Method-Override": "PUT",
        },
      });

      toast.success(res.data.message || "Listing updated successfully!");
      navigate(`/listing/${listing._id}`);
    } catch (error) {
      const warning_login = error.response?.data?.warning_login;
      const warning_owner = error.response?.data?.warning_owner;

      if (warning_login) {
        toast.warning(warning_login);
        navigate("/login");
        return;
      }

      if (warning_owner) {
        toast.warning(warning_owner);
        return;
      }

      const serverError = error.response?.data?.error;
      const errorMessage = Array.isArray(serverError)
        ? serverError.join("\n")
        : serverError;
      toast.error(
        errorMessage || "Something went wrong while updating the listing."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mb-5">
  <h1 className="mb-4 mt-3 text-center">Edit Listing</h1>

  <form
    onSubmit={handleSubmit}
    className="needs-validation mx-auto p-4 shadow rounded-4"
       style={{
   borderRadius: "20px",
    background: "rgba(114, 142, 151, 0.29)",
     backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
    border: "1px solid rgba(24, 23, 23, 0.18)",
    boxShadow: "0 5px 5px rgba(10, 10, 10, 0.39)",
    color: "#ffffff",
  }}
    noValidate
    encType="multipart/form-data"
 
  >
    {/* Title */}
    <div className="mb-3">
      <label htmlFor="title" className="form-label fw-medium text-dark">Title</label>
      <input
        type="text"
        className="form-control border_field"
        placeholder="Enter your Title"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <div className="invalid-feedback">Title is required.</div>
    </div>

    {/* Description */}
    <div className="mb-3">
      <label htmlFor="description" className="form-label fw-medium text-dark">Description</label>
      <textarea
        className="form-control border_field"
        id="description"
        name="description"
        rows="3"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <div className="invalid-feedback">Please enter a short description.</div>
    </div>

    {/* Current Image */}
    <div className="mb-2 fw-medium text-dark">Current image</div>
    <img
      src={
        listing.image_url?.url
          ? listing.image_url.url.replace("/upload/", "/upload/w_180/")
          : "/default.jpg"
      }
      alt="Listing"
      className="img-thumbnail rounded mb-3"
      style={{
        width: "100%",
        maxWidth: "180px",
        objectFit: "cover",
      }}
    />

    {/* Upload Image */}
    <div className="mb-3">
      <label htmlFor="image_url" className="form-label fw-medium text-dark">Upload New Image</label>
      <input
        type="file"
        className="form-control border_field"
        id="image_url"
        name="image_url"
        accept="image/*"
        onChange={handleFileChange}
      />
     <div className="form-text text-muted">No file selected? We’ll continue using your current image.</div>

    </div>

    {/* Price, Category, Country */}
    <div className="row">
      <div className="mb-3 col-12 col-md-4">
        <label htmlFor="price" className="form-label fw-medium text-dark">Price</label>
        <input
          type="number"
          className="form-control border_field"
          id="price"
          name="price"
          placeholder="1200"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">Price should be valid.</div>
      </div>

      <div className="mb-3 col-12 col-md-4">
        <label htmlFor="category" className="form-label fw-medium text-dark">Category</label>
        <select
        className="form-select border_field"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="trending">Trending</option>
          <option value="new">New</option>
          <option value="home">Home</option>
          <option value="beach">Beach</option>
          <option value="iconic cities">Iconic Cities</option>
          <option value="mountains">Mountains</option>
          <option value="amazing pools">Amazing Pools</option>
          <option value="farms">Farms</option>
          <option value="castales">Castales</option>
          <option value="arctic">Arctic</option>
          <option value="camping">Camping</option>
        </select>
        <div className="invalid-feedback">Category should be valid.</div>
      </div>

      <div className="mb-3 col-12 col-md-4">
        <label htmlFor="country" className="form-label fw-medium text-dark">Country</label>
        <input
          type="text"
          className="form-control border_field"
          id="country"
          name="country"
          placeholder="Enter country"
          value={formData.country}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">Country should be valid.</div>
      </div>
    </div>

    {/* Location */}
    <div className="mb-3">
      <label htmlFor="location" className="form-label fw-medium text-dark">Location</label>
      <input
        type="text"
        className="form-control border_field"
        id="location"
        name="location"
        placeholder="Enter location"
        value={formData.location}
        onChange={handleInputChange}
        required
      />
      <div className="invalid-feedback">Location should be valid.</div>
    </div>

    {/* Buttons */}
    <div className="d-flex justify-content-end gap-2">
      <button type="submit" className="btn btn-outline-danger" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
      <Link to={`/listing/${listing._id}`} className="btn btn-outline-dark">
        Cancel
      </Link>
    </div>
  </form>
</div>

  );
};

export default EditListing;
