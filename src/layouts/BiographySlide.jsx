
import React, { useState } from "react";
// import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";


export default function BiographySlide({
  title = "Masooma-LearnFarsi",
  subtitle = "هدیه ای ارزشمند برای کودکان ",
  lines = [
    "فارسی گنجینه ای از شعر، ادب و فرهنگ",
  ],
  imageSrc = "/images/webPic/mm-1.jpg", // replace with your image path or URL
}) {
  // const [showContact,setShowContact]= useState(false);
  const closePage = ()=>{
    document.querySelector(".fullPage").style.display= "none";
  }
  return (
      <div className="container-fluid bg-white py-5 fullPage">
        {/* Required Bootstrap CSS (ensure included in your index.html):
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
        */}
  
        <div className="row justify-content-center">
          <div className="col-11 col-xl-10 shadow rounded-4 overflow-hidden position-relative" style={{minHeight: '520px'}}>
  
            <div className="row g-0" dir="rtl">
              <div className="col-lg-5 position-relative d-flex align-items-center justify-content-center p-4" style={{background: 'transparent'}}>
                {/* blue rounded corner decorative element */}
                <div style={{position: 'absolute', right: -40, top: -10, width: 200, height: 140, borderRadius: '0 0 40px 40px', background: 'linear-gradient(135deg, #7fd3ff, #2b9cf0)'}}></div>
  
                {/* circular outline */}
                <div style={{position: 'absolute', left: 60, top: 80, width: 88, height: 88, borderRadius: '50%', border: '3px solid rgba(59,130,246,0.35)'}}></div>
  
                <div style={{position: 'absolute', right: 260, bottom: 160, width: 68, height: 68, borderRadius: '50%', border: '3px solid rgba(59, 186, 120, 0.35)'}}></div>
                <div style={{position: 'absolute', right: 60, bottom: 60, width: 88, height: 88, borderRadius: '50%', border: '3px solid rgba(59, 108, 186, 0.35)'}}></div>
                {/* image container with diagonal rounded mask */}
                <div>
                  <div className="position-relative overflow-hidden rounded-4 border border-warning p-1" style={{width: '100%',height: "420px",  maxHeight: '72vh'}}>
                      <svg viewBox="0 0 1 1" style={{position: 'absolute', width: 0, height: 0}}>
                      <defs>
                          <clipPath id="diagClipBoot" clipPathUnits="objectBoundingBox">
                          {/* polygon that resembles the diagonal-rounded shape */}
                          <path d="M0.25,0 L1,0 L1,0.75 C0.88,0.95 0.6,1 0.25,1 L0,0.25 C0.08,0.05 0.18,0 0.25,0 Z" />
                          </clipPath>
                      </defs>
                      </svg>
                      <div className=" h-75 p-3">
                          <img
                          src={process.env.PUBLIC_URL+imageSrc}
                          alt="profile"
                          style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              WebkitClipPath: 'polygon(25% 0,100% 0,100% 75%,60% 100%,0 100%,0 25%)',
                              clipPath: 'polygon(25% 0,100% 0,100% 75%,60% 100%,0 100%,0 25%)'
                          }}
                          // className="w-100 h-100"
                          />
                      <h2 className="fw-bold mb-1 text-center text-warning mt-2 p-2">معصومه زاهدی</h2>
  
                      </div>
  
                  </div>
  
                </div>
  
                {/* small logo-like shape bottom-right */}
                <div className="" style={{position: 'absolute', right: 24, bottom: 20, width: 48, height: 48}}>
                  <svg viewBox="0 0 40 40" className="w-100 h-100">
                    <path d="M8 6 Q20 0 32 6 Q36 10 32 20 Q20 36 8 20 Q4 12 8 6 Z" fill="#ffd24a"/>
                    <path d="M10 8 Q20 2 30 8 Q34 12 30 18 Q20 32 10 18 Q6 10 10 8 Z" fill="#ef3b3b" opacity="0.9"/>
                  </svg>
                </div>
  
              </div>
              {/* LEFT: text column */}
              <div className="col-lg-7 p-5 d-flex flex-column justify-content-between">
                <div>
                  <h1 className="display-5 fw-bold text-primary">{title}</h1>
                  <h6 className="text-muted text-uppercase mb-4">{subtitle}
                                <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
              <span className="badge bg-light text-primary">گفتاری</span>
              <span className="badge bg-light text-primary">داستان‌خوانی</span>
              <span className="badge bg-light text-primary">بازی‌محور</span>
            </div>
  
                  </h6>
                  
                  <p>سلام! من معصومه زاهدی هستم، معلم زبان فارسی برای کودکان و نوجوانان دوزبانه. سال‌هاست با علاقه به آموزش زبان فارسی مشغولم و باور دارم یادگیری زبان، پلی است به شناخت هویت و ریشه‌های فرهنگی هر فرد.</p>
                  <p>در کلاس‌های من، یادگیری همراه با بازی، داستان، و فعالیت‌های خلاقانه‌ست تا زبان فارسی برای شاگردانم زنده، شیرین و پرانرژی باشد.</p>
                  <p>هدف من این است که کودکان بتوانند با اعتمادبه‌نفس فارسی بخوانند، بنویسند و صحبت کنند، در حالی که از یادگیری لذت می‌برند.</p>
                  <hr />
              <h5 className="fw-bold mb-2 text-primary">
                اهداف کلاس‌های من
              </h5>
              <ul className="mb-3 text-dark" style={{ lineHeight: "1.8" }}>
                <li>آموزش حروف الفبای فارسی</li>
                <li>تقویت مهارت خواندن و نوشتن</li>
                <li>افزایش اعتمادبه‌نفس در مکالمه</li>
                <li>گسترش دایرهٔ واژگان از طریق بازی</li>
                <li>یادگیری لذت‌بخش با داستان و تصویر</li>
              </ul>
              <h6>شماره تماس: 5064-563-(346)</h6>
              <div className=" w-50">
                  <ul className="list-unstyled">
                      <li><Link className="text-danger" to={'https://www.instagram.com/masooma_farsi_learn/'} >Instagram</Link></li>
                  </ul>
              </div>
  
                  <div className="fs-5 text-dark">
                    {lines.map((l, i) => (
                      <p key={i} className="mb-2">{l}</p>
                    ))}
                  </div>
                </div>
  
                {/* decorative orange curved shape (svg) */}
                <div className="mt-4" style={{width: '60%', maxWidth: '320px'}}>
                  <svg viewBox="0 0 400 120" className="w-100 h-auto">
                    <path d="M0 120 C120 0, 280 0, 400 120 L0 120 Z" fill="#f5a663" />
                  </svg>
                </div>
                <button className="btn btn-danger d-inline-block " onClick={closePage}>close </button>
              </div>
  
              {/* RIGHT: image + decorations */}
  
            <div className="mt-auto small opacity-75 mt-4">
            </div>
  
            </div>
  
          </div>
        </div>
        {/* <div className="border border-warning"> */}
          {/* <TeacherBio/> */}
        {/* </div> */}
  
        {/* Small helper CSS for responsiveness if you want to include inline styles */}
        <style>{`
          @media (max-width: 991px) {
            .display-5 { font-size: 2rem; }
          }
          @media (max-width: 576px) {
            .col-lg-7, .col-lg-5 { padding: 1.25rem !important; }
          }
          }
        `}</style>
      </div>

    
  );
}
