import axios from "../axiosInstance";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
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
} from "react-icons/fa6";
import { BiSolidCastle } from "react-icons/bi";
import { PiFarmBold } from "react-icons/pi";

const ListingPage = () => {
  const [listings, setListings] = useState([]);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const scrollRef = useRef(null);

  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // scroll functionality
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  useEffect(() => {
    let timer;
    const fetchListings = async () => {
      try {
        const res = await axios.get("/listing");
        setListings(res.data);
      } catch (err) {
        toast.error("Failed to fetch Listing");
        timer = setTimeout(() => {
          setHasError(true);
        }, 2000);
      }
    };

    fetchListings();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (hasError) {
    return (
      <div className="container text-center mt-5 height_70">
        <h1 className="display-4 text-danger fw-bold">
          500 - Internal Server Error
        </h1>
        <p className="lead">
          Something went wrong while fetching the listings.
        </p>
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {listings.length === 0 ? (
        <div className="  d-flex justify-content-center align-items-cente mt-100 ">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2hkcTdxejU3N2Y1amMzdnZ4ejg0emNkZXc0eWtlbjRlZmM0eDM4NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oEjI6SIIHBdRxXI40/giphy.gif"
            alt="loder"
          />
        </div>
      ) : (
        <div>
          <div className="filters_bar m-4 mt-4 p-0  d-flex align-items-center">
            <div className=" position-relative d-flex align-items-center flex-nowrap overflow-hidden">
              <button className="scroll-arrow start-0" onClick={scrollLeft}>
                <FaChevronLeft />
              </button>
              <button className="scroll-arrow end-0" onClick={scrollRight}>
                <FaChevronRight />
              </button>
              <div
                className="filters-scroll-wrapper overflow-auto"
                style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
                ref={scrollRef}
              >
                <div className="d-flex align-items-center gap-3 flex-wrap filters-bar">
                  <div className="filter-item text-center">
                    <FaFire size={20} className="mb-1" />
                    <p className="mb-0">Trending</p>
                  </div>

                  <div className="filter-item text-center">
                    <FaBed size={20} className="mb-1" />
                    <p className="mb-0">Rooms</p>
                  </div>

                  <div className="filter-item text-center">
                    <FaUmbrellaBeach size={20} className="mb-1" />
                    <p className="mb-0">Beach</p>
                  </div>

                  <div className="filter-item text-center">
                    <FaMountainCity size={20} className="mb-1" />
                    <p className="mb-0">Iconic cities</p>
                  </div>

                  <div className="filter-item text-center">
                    <BiSolidCastle size={20} className="mb-1" />
                    <p className="mb-0">Castles</p>
                  </div>

                  <div className="filter-item text-center">
                    <FaPersonSwimming size={20} className="mb-1" />
                    <p className="mb-0">Amazing pools</p>
                  </div>

                  <div className="filter-item text-center">
                    <FaMountain size={20} className="mb-1" />
                    <p className="mb-0">Mountains</p>
                  </div>

                  <div className="filter-item text-center">
                    <PiFarmBold size={22} className="mb-1" />
                    <p className="mb-0">Farms</p>
                  </div>

                  <div className="filter-item text-center">
                    <FaRegSnowflake size={20} className="mb-1" />
                    <p className="mb-0">Arctic</p>
                  </div>

                  <div className="filter-item text-center">
                    <FaCampground size={20} className="mb-1" />
                    <p className="mb-0">Camping</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="taxes_div px-3 py-2 bg-white border border-secondary rounded-4 shadow-sm tax-toggle">
              <div className="d-flex justify-content-between align-items-center flex-nowrap gap-3 ">
                <span
                  className="fw-medium mb-0 text-truncate"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Display total after taxes
                </span>
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

          <div className="card_container  ">
            {listings.map((listing, index) => (
              <div
                className="card  rounded-3 "
                key={index}
              >
                <Link to={`/listing/${listing._id}`} className="nav-link">
                  <img
                    src={listing.image_url.url}
                    className="card-img-top rounded-3 img-height "
                    alt={listing.title}
                  />
                  <div className="card-img-overlay "></div>
                  <div className="card-body">
                    <h5 className="card-title">{listing.title}</h5>
                    <p className="card-text fw-semibold ">
                      &#8377;{listing.price.toLocaleString("en-IN")}{" "}
                      <small className="text-muted">/night </small>
                      <small
                        className={`text-muted ${
                          isChecked ? "d-inline" : "d-none"
                        }`}
                      >
                        +15% GST{" "}
                      </small>
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
