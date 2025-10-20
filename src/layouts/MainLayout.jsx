import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "../pages/Home";
import BiographySlide from "./BiographySlide";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContact,setShowContact] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* هدر */}
      <header className="bg-success text-white">
        <nav className="navbar navbar-expand-lg navbar-dark container">
          <Link className="navbar-brand" to="/">Farsi Class</Link>

          {/* دکمه همبرگر */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu} // کنترل توسط React
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* منو */}
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/Home-ClassA/" onClick={() => setIsOpen(false)}>Home</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link" style={{cursor:"pointer"}} onClick={()=>setShowContact(!showContact)}>contact</span>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/Home-ClassA/" onClick={() => setIsOpen(false)}>Alphabet</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Home-ClassA/" onClick={() => setIsOpen(false)}>Word</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Home-ClassA/" onClick={() => setIsOpen(false)}>Story</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Home-ClassA/" onClick={() => setIsOpen(false)}>TodayPlan</Link>
              </li> */}
            </ul>
          </div>
        </nav>
        <div style={{height:"400px", opacity:"0.9"}}>
          {/* <img className='w-100 h-100' src="/images/webPic/ad-2.png" alt="" /> */}
          <img className='w-100 h-100' src={`${process.env.PUBLIC_URL}/images/webPic/ad-2.png`} alt="" />
        </div>
      </header>

      {/* محتوای صفحه */}
      <main className="flex-fill container p-0 border border-danger my-4">
        {/* <Outlet /> */}
        {showContact && <BiographySlide/> }
        
        <Home/>
      </main>

      {/* فوتر */}
      <footer className="bg-success text-white text-center py-3 mt-auto" style={{position:"relative",bottom:0}}>
              <div className="container py-4">
        <div className="row">
          <div className="col-md-4 text-center px-4">
            <h5>در باره ما</h5>
            <p className='text-center'>کلاس فارسی آنلاین ما با آموزش تعاملی و باکیفیت، یادگیری زبان فارسی را برای همه ساده و لذت‌بخش می‌کند </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link className="text-white" to={'/Home-ClassA/'} >Alphabet</Link></li>
              <li><Link className="text-white" to={'/Home-ClassA/'} >Word</Link></li>
              <li><Link className="text-white" to={'/Home-ClassA/'} >Story</Link></li>
              <li className="nav-item">
                <span className="nav-link" style={{cursor:"pointer"}} onClick={()=>setShowContact(!showContact)}>contact</span>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><Link className="text-white" to={'https://www.instagram.com/masooma_farsi_learn/'} >Instagram</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; {new Date().getFullYear()} Masooma-learnFarsi. All rights reserved.</p>
        </div>
      </div>
      </footer>
    </div>
  );
}
