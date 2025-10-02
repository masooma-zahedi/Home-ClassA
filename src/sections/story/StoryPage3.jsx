import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import { database, ref, set, onValue, remove } from '../firebase';

// کامپوننت نمایش محتوای داستان
// کامپوننت نمایش محتوای داستان با هایلایت هوشمند

const StoryPage = ({ title, content, vocab, qa }) => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [accordionOpen, setAccordionOpen] = useState(null);
  const [highlightWord, setHighlightWord] = useState(""); // کلمه یا حرف برای هایلایت
  const [shoHighLight, setShowHighLight] = useState(true)
  const toggleAccordion = (index) => {
    setAccordionOpen(accordionOpen === index ? null : index);
  };

  // تابع برای هایلایت کردن متن (case-insensitive)
  const highlightText = (text) => {
    if (!highlightWord) return text;

    // regex با i برای بی‌توجهی به حروف بزرگ/کوچک انگلیسی
    const regex = new RegExp(`(${highlightWord})`, "gi");

    return text.split(regex).map((part, i) =>
      part.toLowerCase() === highlightWord.toLowerCase() ? (
        <span key={i} style={{ color: " #e81563ff", }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="p-2  border rounded shadow-sm bg-light" dir="rtl">
      <div className='text-primary h3 mb-5 d-inline-block p-2 mb-3 border-bottom border-info'>روان خوانی:</div>
      {/* اینپوت برای نوشتن حرف یا کلمه */}
      {/* {shoHighLight && 
      <div className="mb-5">
        <input
          type="text"
          className="form-control text-center"
          placeholder="یک حرف یا کلمه برای هایلایت بنویسید"
          value={highlightWord}
          onChange={(e) => setHighlightWord(e.target.value)}
        />
      </div>
      } */}

      <h2 className="mb-4 text-center h2" onClick={()=>{setShowHighLight(!shoHighLight)}} style={{ fontFamily: "Tahoma", cursor:'pointer' }}>
        {title}
      </h2>

      {/* متن داستان */}
      {content.map((item, idx) =>
        item.type === "text" ? (
          <p key={idx} style={{fontSize: window.innerWidth < 768 ? "20px" : "1.8rem", lineHeight: "1.8" }}>
            {highlightText(item.content)}
          </p>
        ) : (
          <div key={idx} className="text-center my-4">
            <img
              src={item.content}
              alt={`تصویر ${idx}`}
              className="img-fluid rounded"
              style={{ maxHeight: "400px" }}
            />
          </div>
        )
      )}

      {/* واژگان */}
      {vocab?.length > 0 && (
        <div className="mt-4">
          <h5 className="m-4">واژگان:</h5>
          <div className="row">
            <div className="col-lg-7">
              <div
                className="d-flex flex-wrap gap-2 p-3"
                style={{ backgroundColor: "rgba(235, 183, 217, 0.17)" }}
              >
                {vocab.map((v, i) => (
                  <button
                    key={i}
                    className="btn btn-outline-dark fs-6  btn-sm bg-info px-3"
                    onClick={() => setSelectedWord(v)}
                  >
                    {v.word}
                  </button>
                ))}
              </div>
            </div>
            {selectedWord && (
              <div className="col-lg-5 alert alert-info text-center h2 mt-3">
                {selectedWord.meaning}
              </div>
            )}
          </div>
        </div>
      )}

      {/* سوالات */}
      {qa?.length > 0 && (
        <div className="mt-5">
          <h5 className="mb-3 text-success">سوالات درک مطلب:</h5>
          <div className="accordion border border-warning rounded shadow" id="qaAccordion">
            {qa.map((item, idx) => (
              <div className="accordion-item" key={idx}>
                <h2 className="accordion-header" id={`heading${idx}`}>
                  <button
                    className={`accordion-button ${accordionOpen === idx ? "" : "collapsed"}`}
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                  >
                    {item.question}
                  </button>
                </h2>
                <div className={`accordion-collapse collapse ${accordionOpen === idx ? "show" : ""}`}>
                  <div className="accordion-body" style={{ fontSize: "1.1rem", color: "rgb(136, 15, 15)" }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// کامپوننت اصلی
// StoryPage3.jsx
function StoryPage3({ groupKey = 'alefba', wantedTitle }) {
  const [stories, setStories] = useState({});
  const [selectedStoryId, setSelectedStoryId] = useState(null);

  useEffect(() => {
    const storiesRef = ref(database, `stories/${groupKey}`);
    onValue(storiesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStories(data);
      } else {
        setStories({});
        setSelectedStoryId(null);
      }
    });
  }, [groupKey]);

  // پیدا کردن داستان بر اساس title
  useEffect(() => {
    if (!Object.keys(stories).length || !wantedTitle) return;

    const foundEntry = Object.entries(stories).find(
      ([id, story]) => story.title === wantedTitle
    );

    if (foundEntry) {
      const [id] = foundEntry;
      setSelectedStoryId(Number(id));
    } else {
      setSelectedStoryId(null);
    }
  }, [stories, wantedTitle]);

  const currentStory = stories[selectedStoryId];

  return (
    <div className="container mt-4">
      {currentStory ? (
        <StoryPage {...currentStory} />
      ) : (
        <p className="text-center">داستانی با این عنوان پیدا نشد.</p>
      )}
    </div>
  );
}

export default StoryPage3;


