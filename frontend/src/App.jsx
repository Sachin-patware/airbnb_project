import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import ListingPage from "./Components/Listing";
import ListingDetail from "./Components/ListingDetail";
import Footer from "./Components/footer";
import NewListing from "./Components/newlisting";
import EditListing from "./Components/editlisting";
import './App.css'
import { FaRegCompass } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function App() {


  return (
    <>
      <nav className="navbar navbar-expand-md bg-white border-bottom height sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
           <FaRegCompass className="fa-campass"/>

          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
           
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse"  id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link "  href="/">
                Home
              </a>
              <a className="nav-link" href="/listings">
                All Listing
              </a>
              <a className="nav-link" href="/listings/new">
                Add New Listing
              </a>
              <a className="nav-link " >
                Disa
              </a>
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer />
      <Router>
      <Routes>
        <Route path="/listings" element={<ListingPage />} />
        <Route path="/listing/edit" element={<EditListing />} />
        <Route path="/listings/new" element={<NewListing />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
      </Routes>
    </Router>
    <Footer/>

    </>
  );
}

export default App;

