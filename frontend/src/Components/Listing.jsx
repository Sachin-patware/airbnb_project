import axios from "../axiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ListingPage = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  useEffect(async () => {
    try {
      const res = await axios.get("/listing");
      setListings(res.data);
    } catch (err) {
      toast.error("Failed to fetch Listing");

      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {listings.length === 0 ? (
        <div className="  d-flex justify-content-center align-items-cente mt-100">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2hkcTdxejU3N2Y1amMzdnZ4ejg0emNkZXc0eWtlbjRlZmM0eDM4NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oEjI6SIIHBdRxXI40/giphy.gif"
            alt="loder"
          />
        </div>
      ) : (
        <div>
          <h1 className="header ">All Listings</h1>
          <div className="card_container m-3">
            {listings.map((listing, index) => (
              <div
                className="card rounded-3 "
                style={{ width: "18rem" }}
                key={index}
              >
                <Link to={`/listing/${listing._id}`} className="nav-link">
                  <img
                    src={listing.image_url}
                    className="card-img-top rounded-3 img-height "
                    alt={listing.title}
                  />
                  <div className="card-img-overlay "></div>
                  <div className="card-body">
                    <h5 className="card-title fs-5">{listing.title}</h5>
                    <p className="card-text fw-semibold fs-6 ">
                      &#8377;{listing.price.toLocaleString("en-IN")}{" "}
                      <small className="text-muted">/night</small>
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ListingPage;
