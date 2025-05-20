import { useState ,useRef} from "react";
import axios from "../axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";

const Review = ({listing,setRefreshKey}) => {
  useFormValidation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(3);
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
      setRating(3);
      setComment("");
      form.classList.remove("was-validated");
    } catch (error) {
      const warning = error.response?.data?.warning;
      if (warning) {
        toast.warning( warning|| "you must be loggedIn to add Review" );
        navigate("/login")
        return;
      }
      if (error.response && error.response.data) {
        const serverError = error.response.data.error;
        const errorMessage = Array.isArray(serverError)
          ? serverError.join("\n")
          : serverError;
        toast.error(errorMessage);
      }
    }
    finally {
    setLoading(false);
  }
  };
  return <div>
    <h1 className="mb-4 text-center fw-bold">Leave a Review</h1>
          <form
          ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            className="needs-validation p-4 border rounded shadow-sm bg-light my-5"
            style={{ maxWidth: "500px", margin: "auto" }}
          >
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating: {rating}
              </label>
              <input
                type="range"
                className="form-range"
                min="1"
                max="5"
                step="1"
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
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
            
            <button type="submit" className="btn btn-outline-danger" disabled={loading}>
               {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          <hr />
  </div>;
};

export default Review;
