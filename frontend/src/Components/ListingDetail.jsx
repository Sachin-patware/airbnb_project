import { useEffect, useState } from "react";
import axios from "../axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, Link, useParams } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import DeleteListing from "./delete";
import Review from "./review";

const ListingDetail = () => {
  useFormValidation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [listing, setListing] = useState();
  const [refreshKey, setRefreshKey] = useState(0);

  const [userid, setUserid] = useState(null);
  // for hide button
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user");
        setUserid(res.data.userid);
      } catch {
        setUserid(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`/listing/${id}`);
        setListing(res.data);
      } catch (err) {
        toast.error("Failed to load listing does not exist ");

        const timer = setTimeout(() => {
          navigate("/listing", { replace: true });
        }, 4000);
        return () => clearTimeout(timer);
      }
    };

    fetchListing();
  }, [navigate, refreshKey]);

  // details of listing
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
                  src={listing.image_url.url}
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
                <div className="card-body d-flex gap-5 position-relative ">
                  {userid === listing.owner[0]._id && (
                    <>
                      <Link
                        to="/listing/edit"
                        state={{ listing }}
                        className="btn btn-outline-danger shadow-sm px-3"
                      >
                        Edit
                      </Link>
                      <DeleteListing listing={listing} />
                    </>
                  )}
                  <p className="mb-0 text-muted small fst-italic position-absolute position-set">
                    Owned by <strong>{listing.owner[0].username}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr />

          {/* add reviews */}
          <Review listing={listing} setRefreshKey={setRefreshKey} />

          {/* all reviews  */}
          <h1 className="mb-4 text-center fw-bold">All Reviews</h1>

          <div className="container">
            <div className="row">
              {listing.reviews.map((review) => (
                <div key={review._id} className="col-md-6 mb-4">
                  <div className="card mb-1 ">
                    <div className="card-body p-3">
                      <h5 className="card-title fw-bold">
                        @{review.author[0].username}
                      </h5>
                      <h6 className="card-title">
                        Rating:
                        <div 
                          class="starability-result mt-2"
                          data-rating={review.rating}
                        ></div>
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
                          const warning_login =
                            err.response?.data?.warning_login;
                          const warning_author =
                            err.response?.data?.warning_author;
                          if (warning_login) {
                            toast.warning(
                              warning_login ||
                                "you must be loggedIn to delete Review"
                            );
                            navigate("/login");
                            return;
                          } else if (warning_author) {
                            toast.warning(warning_author);
                            return;
                          } else toast.error("Failed to delete review");
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
