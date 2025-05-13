import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import DeleteListing from "./delete";

const ListingDetail = () => {
  useFormValidation();
  const { id } = useParams();
  const [listing, setListing] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  // review
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`/listing/${id}`);
        setListing(res.data);
      } catch (err) {
        toast.error("Failed to load listing details ");

        const timer = setTimeout(() => {
          navigate("/listings", { replace: true });
        }, 4000);
        return () => clearTimeout(timer);
      }
    };

    fetchListing();
  }, [navigate, refreshKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } catch (error) {
      if (error.response && error.response.data) {
        const serverError = error.response.data.error;
        const errorMessage = Array.isArray(serverError)
          ? serverError.join("\n")
          : serverError;
        toast.error(errorMessage);
      } else {
        toast.error("Unknown error.");
      }
    }
  };

  return (
    <>
      {!listing ? (
        <div className="  d-flex justify-content-center align-items-cente mt-100">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2hkcTdxejU3N2Y1amMzdnZ4ejg0emNkZXc0eWtlbjRlZmM0eDM4NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oEjI6SIIHBdRxXI40/giphy.gif"
            alt="loder"
          />
        </div>
      ) : (
        <>
          <div className="container py-5">
            <h1 className="mb-4 text-center fw-bold">{listing.title}</h1>
            <div className="d-flex justify-content-center">
              <div className="card shadow rounded-3" style={{ width: "40rem" }}>
                <img
                  src={listing.image_url}
                  className="card-img-top rounded-top-3"
                  alt="show-image"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <p className="card-text text-muted">{listing.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item fs-5 fw-semibold">
                    Price: ₹{listing.price.toLocaleString("en-IN")}
                  </li>
                  <li className="list-group-item">
                    Location: {listing.location}
                  </li>
                  <li className="list-group-item">
                    Country: {listing.country}
                  </li>
                </ul>
                <div className="card-body d-flex gap-5">
                  <Link
                    to="/listing/edit"
                    state={{ listing }}
                    className="btn btn-outline-danger shadow-sm px-3"
                  >
                    Edit
                  </Link>
                  <DeleteListing listing={listing} />
                </div>
              </div>
            </div>
          </div>
          <hr />

          {/* add reviews */}
          <h1 className="mb-4 text-center fw-bold">Leave a Review</h1>
          <form
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

            <button type="submit" className="btn btn-outline-dark">
              Submit
            </button>
          </form>
          <hr />
          {/* all reviews  */}
          <h1 className="mb-4 text-center fw-bold">All Reviews</h1>

          <div className="container">
            <div className="row">
              {listing.reviews.map((review) => (
                <div key={review._id} className="col-md-6 mb-4">
                  <div className="card mb-1 ">
                    <div className="card-body p-3">
                      <h5 className="card-title fw-bold">@Sachin patware</h5>
                      <h6 className="card-title ">
                        Rating: {review.rating} ⭐
                      </h6>
                      <p className="card-text text-info-emphasis fw-medium ">
                        {review.comment}
                      </p>
                    </div>
                    <div className="card-footer bg-white border-top-0 text-muted small p-3 pt-0">
                      {new Date(review.createdAt).toLocaleString()}
                    </div>

                    {/* delete review */}
                    <button
                      className="btn btn-sm btn-outline-dark shadow-sm position-absolute bottom-0 end-0 mb-2 me-2"
                      onClick={async () => {
                        try {
                          const res = await axios.delete(
                            `/listing/${listing._id}/reviews/${review._id}`
                          );

                          toast.success(res.data.message);
                          setRefreshKey((prev) => prev + 1);
                        } catch (err) {
                          toast.error("Failed to delete review");
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListingDetail;
