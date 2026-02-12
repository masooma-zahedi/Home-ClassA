import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TypingImageText = ({srcImg}) => {
  const items = [
    // {
    //   title: "خانواده در خیابان پاییزی",
    //   imageUrl:
    //     "https://thumbs.dreamstime.com/b/happy-family-walking-colorful-autumn-city-street-happy-family-walking-colorful-autumn-city-street-384103436.jpg",
    //   sentences: [
    //     "خَانواده‌ای شاد دَر خِیابان قَدَم می زَنَند.",
    //     "پِدر وَ مادر دَستِ یِکدیگَر را گِرِفته‌اند.",
    //     "هَوا خُنک و لِذّت‌بَخش است.",
    //     "آنها یِک کودَک دارَند.",
    //     "چَند ساختمان در آن طرف خیابان وجود دارَد.",
    //     "هَمه شال گَردَن به گَردَن دَارَند.",
    //     "دو دِرَخت زَرد وَ سَبز دَر کِنارِ ساختِمان وجود دارَد.",
    //     "کُودَک کُلاه زَرد پُوشیده است.",
    //     "پِدر عِینَک دَارَد.",
    //   ],
    // },
    // {
    //   title: "بازی کودکان در پارک",
    //   imageUrl:
    //     "https://i.pinimg.com/736x/26/9c/b0/269cb00a3ed03fbf51f51bcd483da204.jpg",
    //   sentences: [
    //     "کودَکان دَر پارک بازی می‌کنند.",
    //     "سارا اَز سُرسُره پایین می‌آیَد.",
    //     "آسمان آبی است.",
    //     "چَند درخت سَبز دیده می‌شود.",
    //     "آنها شاد و خوشحال هستند.",
    //     "یک پَرَنده توی آسمان پَرواز می‌کُنَد.",
    //     "مریم وَ رضا تاب می‌خورَند.",
    //     "حُسِین با کامیونِ در ماسِه‌ ها بازی می کُنَد.",
    //     "یک پروانِه به دُنبال گُل می گَردَد.",
    //     "خورشید خَندان اَست.",
    //     "سارا با بادکُنَک می دَوَد.",
    //   ],
    // },
        {
  title: "سَفَر دَر فُرودگاه",
  imageUrl:
    "https://thumbs.dreamstime.com/b/cartoon-airport-scene-featuring-travelers-various-ages-luggage-accompanied-large-passenger-airplane-adults-396595861.jpg",
  sentences: [
    "مَردُم دَر فُرودگاه ایستاده‌اند.",
    "یِک هَواپیما دَر باند قَرار دارَد.",
    "خانوادِه‌ها با چَمَدان سَفَر می‌کُنَند.",
    "دو کُودَک کِنار پِدَرشان راه می‌رَوَند.",
    "زَنی یِک چَمِدان قِرمِز دارَد.",
    "مَردی بیلیت دَر دَست دارَد.",
    "مُسافِران اَز گِیت عُبور می‌کُنَند.",
    "یِک کارمَند بَررِسی بار را اَنجام می‌دَهَد.",
    "آسمان آبی و صاف اَست.",
    "هَواپیما آمادِه‌ی پَرواز اَست.",
    "هَمه بَرای سَفَر هیجان‌زَده هستند."
  ],
    },
    {
  title: "روزِ آرام دَر روستا",
  imageUrl:
    "https://example.com/village-yard.jpg",
  sentences: [
    "یِک پِسَر‌بَچّه رویِ حَصیر دِراز کِشیده اَست.",
    "او کِتابِ رَنگی می‌خوانَد.",
    "کِتاب دَر دَستِ او باز اَست.",
    "یِک خُروس کِنارِ سَبَد ایستاده اَست.",
    "چَند تَخم‌مُرغ داخِلِ سَبَد هَست.",
    "یِک مَرد دَر حالِ پَشم‌چینیِ گوسپَند اَست.",
    "گوسپَند آرام و ساکِت اَست.",
    "خُوشه‌هایِ اَنگور اَز دِرَخت آویزان هَستَند.",
    "حِیاط بُزُرگ و روشَن اَست.",
    "خانه‌ای قَدیمی دَر پُشتِ حِیاط دیده می‌شَوَد.",
    "هَوا آفتابی و دِلپَذیر اَست.",
    "پِسَر‌بَچّه با آرامِش استِراحت می‌کُنَد."
  ],
}

  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allText, setAllText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);
  const [finished, setFinished] = useState(false);
  const [showTitleMe,setShowTitleMe] = useState(true)
  const timeoutRef = useRef(null);

  const currentSentences = items[selectedIndex].sentences;
  const currentImage = items[selectedIndex].imageUrl;

  const typeSentence = (sentence) => {
    if (!sentence) return;
    setDisplayText("");
    let i = 0;
    const type = () => {
      if (i < sentence.length) {
        const char = sentence[i] || "";
        setDisplayText((prev) => prev + char);
        i++;
        timeoutRef.current = setTimeout(type, 50);
      } else {
        setTyping(false);
        setAllText((prev) => prev + sentence + "\n");
        setDisplayText("");
      }
    };
    type();
  };

  const nextSentence = () => {
    if (currentIndex < currentSentences.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTyping(true);
    } else {
      setFinished(true);
    }
  };

  useEffect(() => {
    if (!finished && typing && currentIndex < currentSentences.length) {
      typeSentence(currentSentences[currentIndex]);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, typing, finished, selectedIndex]);

  const resetSentences = () => {
    setCurrentIndex(0);
    setAllText("");
    setDisplayText("");
    setTyping(true);
    setFinished(false);
  };

  const changeItem = (index) => {
    setSelectedIndex(index);
    setCurrentIndex(0);
    setAllText("");
    setDisplayText("");
    setTyping(true);
    setFinished(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!finished) {
          nextSentence();
        } else {
          resetSentences();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finished]);

  return (
    <div className="container mt-4  my-5 p-4 " style={{ fontFamily: "", height:'', backgroundColor: ' #efcae156' }}>
      {/* فهرست انتخاب مجموعه */}
      <h4 style={{cursor:'pointer'}} className={` ${showTitleMe ? 'text-success text-center' : 'text-danger text-center'}  `} onClick={()=> setShowTitleMe(!showTitleMe)}>موضوع</h4>
      {showTitleMe && 
        <div className="mb-3">
          {items.map((item, index) => (
            <button
              key={index}
              className={`btn me-2 ${
                selectedIndex === index ? "btn-success" : "btn-outline-secondary"
              }`}
              onClick={() => changeItem(index)}
            >
              {item.title}
            </button>
          ))}
        </div>
      }
        <div className="d-flex  align-items-center h-100">
          <div className="row ">
            <div className="col-md-5 text-center">
              <img
                src={currentImage}
                alt={items[selectedIndex].title}
                className="img-fluid rounded"
              />
              <span className="">TypingImageText</span>
            </div>
            <div className="col-md-6 d-flex h3  flex-column justify-content-center">
              <pre
                style={{
                  fontFamily: " system-ui, -apple-system",
                  // fontSize: "1rem",
                  lineHeight: "3rem",
                  minHeight: "8rem",
                  direction: "rtl",
                  textAlign: "right",
                }}
              >
                {allText}
                {displayText}
              </pre>
              <div className="mt-3">
                {!finished ? (
                  <button className="btn btn-primary" onClick={nextSentence}>
                    جمله بعدی
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={resetSentences}>
                    شروع مجدد
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
          <div className=" text-center">
            <div className="col-md-8 mx-auto">
              <h6 className=" my-3 bg-info p-4 rounded">حالا شما چند جمله در مورد تصویر زیر بسازید</h6>
                <img
                  src={srcImg}
                  alt={items[selectedIndex].title}
                  className="img-fluid rounded"
                />

            </div>
          </div>
    </div>
  );
};

export default TypingImageText;
