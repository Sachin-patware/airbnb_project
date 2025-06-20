import { useEffect, useState, useRef } from "react";
import axios from "../axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, Link, useParams } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import DeleteListing from "./delete";
import Review from "./review";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ListingDetail = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  useFormValidation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [listing, setListing] = useState();
  const [refreshKey, setRefreshKey] = useState(0);

  const [userid, setUserid] = useState(null);

  useEffect(() => {
    if (!listing || !mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAP_API;
    if (mapRef.current) {
      mapRef.current.remove();
    }

    setTimeout(() => {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: listing.Geometry[0].coordinates,
        zoom: 10,
        dragPan: true,
        scrollZoom: true,
        doubleClickZoom: true,
        touchZoomRotate: true,
      });

      new mapboxgl.Marker({ color: "#FF0000" })
        .setLngLat(listing.Geometry[0].coordinates)
        .addTo(mapRef.current)
        .setPopup(
          new mapboxgl.Popup({ offset: 20 }).setHTML(`
              <div >
              <p class="mapboxgl-popup-content">Exact location will be provided after booking</p></div>`)
        );
      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    }, 100);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [listing]);

  // for hide button
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user");
        setUserid(res.data.userid);
      } catch (err) {
        if (err.response?.status === 401) {
          console.warn("Not logged in");
        } else {
          console.error("Failed to fetch user", err);
        }
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
        toast.error("Failed to fetch listing details");

        const timer = setTimeout(() => {
          navigate("/", { replace: true });
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
        <div className="d-flex justify-content-center align-items-center height_80 ">
          <DotLottieReact
            src="/Animation - 1749891415232.lottie"
            loop
            autoplay
            style={{ width: "180px", height: "180px" }}
          />
        </div>
      ) : (
        <>
          <div className="container pb-4">
            <h2 className="my-3 text-center fw-bold">{listing.title}</h2>
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
                  <li className="list-group-item fs-5 ">
                    Price: ₹{listing.price.toLocaleString("en-IN")}
                  </li>
                  <li className="list-group-item">
                    Category: {listing.category}
                  </li>
                  <li className="list-group-item">
                    Location: {listing.location}
                  </li>
                  <li className="list-group-item">
                    Country: {listing.country}
                  </li>
                </ul>
                <div className="card-body position-relative ">
                  {userid === listing.owner[0]._id && (
                    <div className="mb-2 d-flex mb-1 gap_btns">
                      <Link
                        to="/listing/edit"
                        state={{ listing }}
                        className="btn btn-outline-danger shadow-sm py-2"
                      >
                        Update
                      </Link>
                      <DeleteListing listing={listing} />
                    </div>
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

          {listing.reviews.length !== 0 && (
            <>
              <hr />
              <h2 className="mb-4 text-center fw-bold">All Reviews</h2>

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
                              className="starability-result mt-2"
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

          {listing.Geometry.length !== 0 && (
            <>
              <hr />
              <div className="container mb-5">
                <h2 className="mb-4 text-center fw-bold">Map Location</h2>
                <div className="row justify-content-center mx-3">
                  <div className="col-12 col-md-10 col-lg-8 p-0">
                    <div
                      style={{ height: "360px", width: "100%" }}
                      ref={mapContainerRef}
                      className="map-container"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="mx-3">
            <div className="container contact-card border rounded-4 p-3 shadow-sm bg-light mb-4">
              <h5 className="mb-3 text-dark">Contact Information</h5>

              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-person-circle fs-4 text-secondary me-2"></i>
                <span className="text-dark">
                  <strong>{listing.owner[0].username}</strong>
                </span>
              </div>

              <div className="d-flex align-items-center">
                <i className="bi bi-envelope fs-5 text-success me-2"></i>
                <a
                  href={`mailto:${listing.owner[0].email}`}
                  className="text-decoration-none text-dark"
                >
                  <strong>{listing.owner[0].email}</strong>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListingDetail;
