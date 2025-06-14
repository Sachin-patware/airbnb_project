import { useState } from "react";
import axios from "../axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import useFormValidation from "../hooks/useFormValidation";

const NewListing = () => {
  useFormValidation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category:"",
    location: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submissionData = new FormData();
      for (const key in formData) {
        submissionData.append(key, formData[key]);
      }

      const res = await axios.post("/listing", submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      const warning_login = error.response?.data?.warning_login;
      if (warning_login) {
        toast.warning(warning_login || "You must be loggedIn to create a listing.");
        navigate("/login");
        return;
      }

      const serverError = error.response?.data?.error;
      const errorMessage = Array.isArray(serverError)
        ? serverError.join("\n")
        : serverError;
      toast.error(errorMessage || "Something went wrong while creating the listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" container mb-5 ">
      <h1 className="mb-4 mt-3 text-center">Create a New Listing</h1>
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

        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-medium text-dark">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">Title is required.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-medium text-dark">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">Please enter a short description.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="image_url" className="form-label fw-medium text-dark">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="image_url"
            name="image_url"
            onChange={handleInputChange}
            accept="image/*"
          />
          <div className="form-text">Optional — Default image will be used if none selected.</div>
        </div>

        <div className="row">
          <div className="mb-3 col-12 col-md-4">
            <label htmlFor="price" className="form-label fw-medium text-dark">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">Price should be valid.</div>
          </div>

          <div className="mb-3 col-12 col-md-4">
            <label htmlFor="category" className="form-label fw-medium text-dark">Category</label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="trending">Trending</option>
              <option value="home">Home</option>
              <option value="beach">Beach</option>
              <option value="iconic cities">Iconic Cities</option>
              <option value="mountains">Mountains</option>
              <option value="amazing pools">Amazing Pools</option>
              <option value="farms">Farms</option>
              <option value="castales">Castales</option>
              <option value="arctic">Arctic</option>
              <option value="new">New</option>
              <option value="camping">Camping</option>
            </select>
            <div className="invalid-feedback">Category should be valid.</div>
          </div>

          <div className="mb-3 col-12 col-md-4">
            <label htmlFor="country" className="form-label fw-medium text-dark">Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">Country should be valid.</div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label fw-medium text-dark">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">Location should be valid.</div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="submit" className="btn btn-outline-danger" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
          <Link to="/" className="btn btn-outline-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default NewListing;
