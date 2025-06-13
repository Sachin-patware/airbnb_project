
import axios from "../axiosInstance";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaFire,
  FaBed,
  FaUmbrellaBeach,
  FaMountain,
  FaMountainCity,
  FaPersonSwimming,
  FaRegSnowflake,
  FaCampground,
  FaChevronLeft,
  FaChevronRight,
  FaKey,
} from "react-icons/fa6";
import { BiSolidCastle } from "react-icons/bi";
import { PiFarmBold } from "react-icons/pi";

const categories = [
  { icon: <FaFire size={20} />, label: "trending" },
  { icon: <FaBed size={20} />, label: "home" },
  { icon: <FaUmbrellaBeach size={20} />, label: "beach" },
  { icon: <FaMountainCity size={20} />, label: "iconic cities" },
  { icon: <FaKey size={20} />, label: "new" },
  { icon: <BiSolidCastle size={20} />, label: "castales" },
  { icon: <FaPersonSwimming size={20} />, label: "amazing pools" },
  { icon: <FaMountain size={20} />, label: "mountains" },
  { icon: <PiFarmBold size={22} />, label: "farms" },
  { icon: <FaRegSnowflake size={20} />, label: "arctic" },
  { icon: <FaCampground size={20} />, label: "camping" },
];

const ListingPage = ({ searchText }) => {
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const scrollRef = useRef(null);

  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  useEffect(() => {
    let timer;
    const fetchListings = async () => {
      try {
        const res = await axios.get("/listing");
        setListings(res.data);
        setAllListings(res.data);
      } catch (err) {
        toast.error("Failed to fetch Listing");
        timer = setTimeout(() => setHasError(true), 2000);
      }
    };

    fetchListings();
    return () => timer && clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = allListings;

    if (selectedCategory) {
      filtered = filtered.filter(
        (listing) => listing.category?.toLowerCase() === selectedCategory
      );
    }

    if (searchText) {
      filtered = filtered.filter((listing) =>
        listing.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setListings(filtered);
  }, [selectedCategory, searchText]);

  if (hasError) {
    return (
      <div className="container text-center mt-5 height_70">
        <h1 className="display-4 text-danger fw-bold">500 - Internal Server Error</h1>
        <p className="lead">Something went wrong while fetching the listings.</p>
        <button className="btn btn-outline-primary mt-3" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="filters_bar m-4 mt-4 p-0 d-flex align-items-center">
        <div className="position-relative d-flex align-items-center flex-nowrap overflow-hidden">
          <button className="scroll-arrow start-0" onClick={scrollLeft}><FaChevronLeft /></button>
          <button className="scroll-arrow end-0" onClick={scrollRight}><FaChevronRight /></button>
          <div
            className="filters-scroll-wrapper overflow-auto"
            style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
            ref={scrollRef}
          >
            <div className="d-flex align-items-center gap-3 flex-wrap filters-bar">
              {categories.map(({ icon, label }) => (
                <div
                  key={label}
                  className={`filter-item text-center ${selectedCategory === label ? "text-primary" : ""}`}
                  onClick={() => setSelectedCategory(label)}
                  style={{ cursor: "pointer" }}
                >
                  {icon}
                  <p className="mb-0 text-capitalize">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
    
        <div className="taxes_div px-3 py-2 bg-white border border-secondary rounded-4 shadow-sm ms-3">
          <div className="d-flex justify-content-between align-items-center flex-nowrap gap-3">
            <span className="fw-medium mb-0 text-truncate">Display total after taxes</span>
            <div className="form-check form-switch m-0 custom-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="switchCheckDefault"
                checked={isChecked}
                onChange={handleSwitchChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card_container">
        {listings.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <p className="lead">No listings found.</p>
          </div>
        ) : (
          listings.map((listing, index) => (
            <div className="card rounded-3" key={index}>
              <Link to={`/listing/${listing._id}`} className="nav-link">
                <img
                  src={listing.image_url.url}
                  className="card-img-top rounded-3 img-height"
                  alt={listing.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{listing.title}</h5>
                  <p className="card-text fw-semibold">
                    ₹{listing.price.toLocaleString("en-IN")} <small className="text-muted">/night</small>
                    <small className={`text-muted ${isChecked ? "d-inline" : "d-none"}`}> +15% GST</small>
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ListingPage;
