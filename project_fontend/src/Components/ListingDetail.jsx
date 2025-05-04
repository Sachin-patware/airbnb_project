import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import DeleteListing from "./delete";

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:5555/listing/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error("Error loading listing:", err);
      }
    };

    fetchListing();
  }, [id]);

  return (
    <div className="container py-5">
  <h1 className="mb-4 text-center fw-bold">Listing Details</h1>

  {!listing ? (
    <div className="text-center">
      <p className="fs-5">Loading...</p>
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <div className="card shadow-lg rounded-4" style={{ width: '40rem' }}>
        <img
          src={listing.image_url}
          className="card-img-top rounded-top-4"
          alt="show-image"
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h3 className="card-title fw-semibold">{listing.title}</h3>
          <p className="card-text text-muted">{listing.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item fs-5 fw-semibold">
            Price: ₹{listing.price.toLocaleString("en-IN")}
          </li>
          <li className="list-group-item">Location: {listing.location}</li>
          <li className="list-group-item">Country: {listing.country}</li>
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
  )}
</div>


  );
};

export default ListingDetail;
