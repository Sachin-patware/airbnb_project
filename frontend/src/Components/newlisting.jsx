import { useState} from "react";
import axios from "../axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import useFormValidation from "../hooks/useFormValidation";

const NewListing = () => {
  useFormValidation();
  
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    listing: {
      title: "",
      description: "",
      image_url: "",
      price: "",
      location: "",
      country: "",
    },
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
      const res = await axios.post("/listing", formData);

      toast.success(res.data.message);
      navigate("/listing");
    } catch (error) {
      const warning = error.response?.data?.warning;
      if (warning) {
        toast.warning( warning ||"You must be loggedIn to create a listing.");
        navigate("/login");
        return;
      }

      if (error.response && error.response.data) {
        const serverError = error.response.data.error;
        const errorMessage = Array.isArray(serverError)
          ? serverError.join("\n")
          : serverError;
        toast.error(errorMessage||"somthing went wrong");
      }
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="mb-5">
      <h1 className="mb-4 mt-3 text-center ">Create a New Listing</h1>

      <form
        onSubmit={handleSubmit}
        className="needs-validation  container p-4 border rounded shadow-sm bg-light mb-5"
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Title"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <div className="valid-feedback">Looks good !</div>
          <div className="invalid-feedback">Title is required.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">
            please enter a short description .
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="image_url" className="form-label">
            Image URL
          </label>
          <input
            type="url"
            className="form-control"
            id="image_url"
            name="image_url"
            placeholder="Enter image URL/link"
            value={formData.image_url}
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <div className="mb-3 col-4">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              placeholder="1200"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">Price should be valid .</div>
          </div>

          <div className="mb-3 col-8">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Enter location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">Location should be valid .</div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter country"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">Country should be valid .</div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="submit" className="btn btn-outline-danger" disabled={loading}>
           {loading ? "Adding..." : " Add"} 
          </button>
          <Link to="/listing" className="btn btn-outline-dark">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
export default NewListing;
