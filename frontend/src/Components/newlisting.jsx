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
      navigate("/listing");
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
    <div className="mb-5">
      <h1 className="mb-4 mt-3 text-center">Create a New Listing</h1>
      <form
        onSubmit={handleSubmit}
        className="needs-validation container p-4 border rounded shadow-sm bg-light mb-5"
        noValidate
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image_url" className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="image_url"
            name="image_url"
            onChange={handleInputChange}
            accept="image/*"
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
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3 col-8">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="submit" className="btn btn-outline-danger" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
          <Link to="/listing" className="btn btn-outline-dark">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default NewListing;
