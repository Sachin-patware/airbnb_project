import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListingPage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5555/listing")
      .then((res) => setListings(res.data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);

  return (
    <div >
      <h1 className="header ">All Listings</h1>
      <div className="card_container m-3">
        {listings.map((listing, index) => (
          <div
            className="card rounded-3 "
            style={{ width: "18rem" }}
            key={index}
          >
          <Link to={`/listing/${listing._id}` } className="nav-link">
            <img
              src={listing.image_url}
              className="card-img-top rounded-3 img-height "
              alt={listing.title}

            />
            <div class="card-img-overlay ">airbnb</div>
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
  );
};

export default ListingPage;
