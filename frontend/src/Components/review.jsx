import { useState, useRef } from "react";
import axios from "../axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";

const Review = ({ listing, setRefreshKey }) => {
  useFormValidation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const formData = {
      review: {
        rating: Number(rating),
        comment: comment,
      },
    };

    try {
      const res = await axios.post(`/listing/${listing._id}/reviews`, formData);
      toast.success(res.data.message);
      setRefreshKey((prev) => prev + 1);
      setRating(1)
      setComment("");
      form.classList.remove("was-validated");
    } catch (error) {
      const warning_login = error.response?.data?.warning_login;
      if (warning_login) {
        toast.warning(warning_login || "you must be loggedIn to add Review");
        navigate("/login");
        return;
      }
      if (error.response && error.response.data) {
        const serverError = error.response.data.error;
        const errorMessage = Array.isArray(serverError)
          ? serverError.join("\n")
          : serverError;
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2 className="mb-4 text-center fw-bold">Leave a Review</h2>
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="needs-validation p-4 border rounded shadow-sm bg-light my-5"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <div>
          <label htmlFor="rating" className="form-label mb-0">
            Rating:
          </label>
          <fieldset className="starability-slot mb-2 ">
            <input
              type="radio"
              id="first-rate1"
              name="rating"
              value="1"
              checked={rating === 1}
              onChange={() => setRating(1)}
            />
            <label htmlFor="first-rate1" title="Terrible">
              1 star
            </label>
            <input
              type="radio"
              id="first-rate2"
              name="rating"
              value="2"
              checked={rating === 2}
              onChange={() => setRating(2)}
            />
            <label htmlFor="first-rate2" title="Not good">
              2 stars
            </label>
            <input
              type="radio"
              id="first-rate3"
              name="rating"
              value="3"
              checked={rating === 3}
              onChange={() => setRating(3)}
            />
            <label htmlFor="first-rate3" title="Average">
              3 stars
            </label>
            <input
              type="radio"
              id="first-rate4"
              name="rating"
              value="4"
              checked={rating === 4}
              onChange={() => setRating(4)}
            />
            <label htmlFor="first-rate4" title="Very good">
              4 stars
            </label>
            <input
              type="radio"
              id="first-rate5"
              value="5"
              checked={rating === 5}
              onChange={() => setRating(5)}
            />
            <label htmlFor="first-rate5" title="Amazing">
              5 stars
            </label>
          </fieldset>
        </div>

        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            Comment
          </label>
          <textarea
            className="form-control"
            id="comment"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
            required
          />
          <div className="invalid-feedback">
            Please add some Comment for review .
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-outline-danger"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Review;
