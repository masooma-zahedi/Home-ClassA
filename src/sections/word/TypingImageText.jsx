
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TypingImageText = () => {

  // =========================
  // Educational Content
  // =========================

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
    //     "آسمان آبی اَست.",
    //     "چَند درخت سَبز دیده می‌شَوَد.",
    //     "آنها شاد و خوشحال هَستند.",
    //     "یک پَرَنده تویِ آسِمان پَرواز می‌کُنَد.",
    //     "مَریَم وَ رضا تاب می‌خورَند.",
    //     "حُسِین با کامیون دَر ماسِه‌ ها بازی می کُنَد.",
    //     "یک پَروانِه به دُنبال گُل می گَردَد.",
    //     "خورشید خَندان اَست.",
    //     "سارا با بادکُنَک می دَوَد.",
    //   ],
    // },

    // {
    //   title: "سَفَر دَر فُرودگاه",
    //   imageUrl:
    //     "https://thumbs.dreamstime.com/b/cartoon-airport-scene-featuring-travelers-various-ages-luggage-accompanied-large-passenger-airplane-adults-396595861.jpg",
    //   sentences: [
    //     "مَردُم دَر فِرودگاه ایستاده‌اند.",
    //     "یِک هَواپیما دَر باند قَرار دارَد.",
    //     "خانوادِه‌ها با چَمَدان سَفَر می‌کُنَند.",
    //     "دو کُودَک کِنار پِدَرشان راه می‌رَوَند.",
    //     "زَنی یِک چَمِدان قِرمِز دارَد.",
    //     "مَردی بیلیت دَر دَست دارَد.",
    //     "مُسافِران اَز گِیت عُبور می‌کُنَند.",
    //     "یِک کارمَند بَررِسی بار را اَنجام می‌دَهَد.",
    //     "آسمان آبی و صاف اَست.",
    //     "هَواپیما آمادِه‌ی پَرواز اَست.",
    //     "هَمه بَرای سَفَر هیجان‌زَده هستند.",
    //   ],
    // },

    // {
    //   title: "روزِ آرام دَر روستا",
    //   imageUrl: `${process.env.PUBLIC_URL}/images/assetWord/wordSection/vilagePhoto-1.jpg`,
    //   sentences: [
    //     "یِک پِسَر‌بَچّه رویِ حَصیر دِراز کِشیده اَست.",
    //     "او کِتابِ رَنگی می‌خوانَد.",
    //     "کِتاب دَر دَستِ او باز اَست.",
    //     "یِک خُروس کِنارِ سَبَد ایستاده اَست.",
    //     "چَند تَخم‌مُرغ داخِلِ سَبَد هَست.",
    //     "یِک مَرد دَر حالِ پَشم‌چینیِ گوسفَند اَست.",
    //     "گوسفَند آرام و ساکِت اَست.",
    //     "خُوشه‌هایِ اَنگور اَز دِرَخت آویزان هَستَند.",
    //     "حِیاط بُزُرگ و روشَن اَست.",
    //     "خانه‌ای قَدیمی دَر پُشتِ حِیاط دیده می‌شَوَد.",
    //     "هَوا آفتابی و دِلپَذیر اَست.",
    //     "پِسَر‌بَچّه با آرامِش استِراحت می‌کُنَد.",
    //   ],
    // },

    // {
    //   title: "شیرینی‌پَزی دَر آشپَزخانِه",
    //   imageUrl:
    //     "https://png.pngtree.com/png-vector/20260421/ourlarge/pngtree-mother-and-children-baking-cookies-for-a-happy-s-day-png-image_19134317.webp",
    //   sentences: [
    //     "مادَر و دو کودَک دَر آشپَزخانِه هَستَند.",
    //     "آن‌ها دَر حالِ دُرُست کَردَنِ شیرینی هَستَند.",
    //     "پِسَر خَمیر را هَم می‌زَنَد.",
    //     "دُختَر چوبِ شیرینی‌پَزی را دَر دَست دارد.",
    //     "مادَر لَبخَند می‌زَنَد.",
    //     "رویِ میز آرد و خَمیر هَست.",
    //     "شیرینی‌ها رویِ سینی قَرار دارَند.",
    //     "دُختَر خیلی خوشحال اَست.",
    //     "پِسَر پیراهَنِ آبی پوشیدِه اَست.",
    //     "مادَر پیش‌بَندِ سَبز پوشیدِه اَست.",
    //     "آن‌ها با هَم آشپَزی می‌کنند.",
    //     "آشپَزخانِه تَمیز و زِیبا اَست.",
    //     "قالَب‌های شیرینی رویِ میز هَستَند.",
    //     "بچّه‌ها به مادَر کُمَک می‌کنند.",
    //     "این خانِوادِه وَقتِ خوبی با هَم دارَند.",
    //   ],
    // },

    // {
    //   title: "دُکتُر و کودَکانِ بیمـار",
    //   imageUrl:
    //     "https://i.pinimg.com/736x/b6/bd/1d/b6bd1dd2b9663b4d3edce26379d81510.jpg",
    //   sentences: [
    //     "یِک دُکتُر دَر مَطَب نِشَستِه اَست.",
    //     "دُکتُر عِینَک و گوشیِ پِزِشکی دارد.",
    //     "بَهار کِنارِ دُکتُر نِشَستِه اَست.",
    //     "دُکتُر فِشارِ خونِ بَهار را می‌گیرَد.",
    //     "بَهار لَبخَند می‌زَنَد.",
    //     "سِه کودَک رویِ نیمکَت نِشَستِه‌اَند.",
    //     "سَجاد دَست‌هایَش را رویِ سَرِش گُذاشتِه اَست .",
    //     "سَجاد سَر دَرد دارَد",
    //     "سارا دَست دَرد و پا دَرد دارَد.",
    //     "او دَستِش را رویِ بازویِ خُود گُذاشتِه اَست.",
    //     "پِسَرِ کوچَک دِل‌دَرد دارد ، اسم او ساحل اَست.",
    //     "ساحِل دَستِش را رویِ شِکَمِ خُود گُذاشتِه اَست.",
    //     "کودَکان بَرایِ مُعایِنِه نِزدِ دُکتُر آمَدِه‌اَند.",
    //     "ساعَت رویِ دیوار نَصب شُدِه اَست .",
    //     "مُطب تَمیز و آرام اَست.",
    //     "دَکتَر با مِهربانی با کودَکان صُحبَت می‌کند.",
    //     "دَکتَر به سَلامَتیِ کودَکان کُمَک می‌کند.",
    //   ],
    // },

    // {
    //   title: "خَرید با خانِوادِه",
    //   imageUrl:
    //     "https://static.vecteezy.com/system/resources/previews/020/088/574/non_2x/shopping-kids-and-family-cartoon-illustration-vector.jpg",
    //   sentences: [
    //     "یِک خانِوادِه بَرای خَرید کَردَن به فُروشگاه آمَدِه اَند.",
    //     "مادَر سَبَدِ خَرید را هُل می‌دَهَد.",
    //     "پِدَر دَر خَرید کَردَن به مادَر کُمَک می کُنَد.",
    //     "رَها رَفتن به فُروشگاه را خِیلی دوست دارَد و لَبخَند می‌زَنَد.",
    //     "آن‌ها دَر فروشگاه دنبال چیزهایی که لازم دارَند می گَردَند.",
    //     "دَر سَبَدِ خَرید خوراکی و وَسایِل زیادی هَست.",
    //     "مادَر لِباسِ زِیبا پوشیدِه اَست.",
    //     "پدَر با فُروشَنده دَر موردِ قِیمَت ها صُحبَت می‌کُند.",
    //     "آنها چیزهایِ زیادی خَریده اَند.",
    //     "فروشگاه بُزُرگ و روشَن اَست.",
    //     "هَمه به وَسایِلِ فروشگاه نِگاه می‌کُنَند.",
    //     "رَها دَر کِنارِ مادَر راه می‌رَوَد و مُراقِب است گُم نَشَوَد.",
    //     "آن‌ها بَعد اَز خَرید به خانِه بّرمی گَردَند.",
    //     "خَرید کَردَن با خانِوادِه سَرگَرَم‌کُنَندِه اَست.",
    //   ],
    // },

    {
      title: "یِک روزِ زیبا دَر پارک",
      imageUrl: `${process.env.PUBLIC_URL}/images/assetWord/wordSection/girlRead.png`,
      sentences: [
        "دُختَرِ کوچَکی دَر پارکی زیبا زیرِ یِک دِرَخت نِشَسته اَست.",
        "او با دِقَّت کِتابِ داستانِ آبی‌رَنگِ خود را می‌خوانَد.",
        "کِنارِ دُختَر، کوله‌پُشتیِ صورتی و چَند کِتابِ رنگارَنگ دیده می‌شود.",
        "پَروانه‌ای نارِنجی نَزدیکِ دُختَر رویِ گُل‌ها آرام پَرواز می‌کُنَد.",
        "دُختَر گاهی اَز کِتاب سَر بَرمی‌دارَد و به پَروانه نِگاه می‌کُنَد.",
        "آفتابِ گَرم، چَمَن‌هایِ سَبز و گُل‌ها را روشن کرده اَست.",
        "نیمکَتِ چوبیِ پارک زیرِ سایه‌یِ دِرَختِ بُلَند قَرار دارد.",
        "دُختَر امروز با کوله‌پُشتیِ صورتی برایِ کِتاب خواندن به پارک آمده اَست.",
        "او چَند کِتابِ جالِب را دَر کیفِ خود گُذاشته اَست.",
        "بادِ مُلایِمی دَر این روزِ آفتابی بَرگ‌هایِ دِرَخت را تَکان می‌دهد.",
        "گُل‌هایِ سِفید و صورتی کِنارِ چَمَنِ سَبزِ پارک رُشد کرده‌اند.",
        "دُختَر اَز دیدنِ پَروانه‌یِ زیبا بِسیار خُوشحال و هَیجان‌زَده اَست.",
        "او پَس اَز خواندنِ داستان، کِتابَش را داخِلِ کیف می‌گُذارد.",
        "دُختَر دوست دارد کِتابِ تازه‌ای بِخوانَد و چیزهایِ جَدید یاد بِگیرَد.",
        "پارکِ آرام جایِ خوبی برایِ مُطالِعه، بازی و اِستِراحت اَست.",
      ],
    },
  ];

  // =========================
  // States
  // =========================

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allText, setAllText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);
  const [finished, setFinished] = useState(false);
  const [showTitleMe, setShowTitleMe] = useState(true);

  const timeoutRef = useRef(null);

  const currentSentences = items[selectedIndex].sentences;
  const currentImage = items[selectedIndex].imageUrl;

  // =========================
  // Typing Animation
  // =========================

  const typeSentence = (sentence) => {
    if (!sentence) {
      setTyping(false);
      return;
    }

    setDisplayText("");

    let i = 0;

    const type = () => {
      if (i < sentence.length) {
        const char = sentence[i];

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

  // =========================
  // Next Sentence
  // =========================

  const nextSentence = () => {

    // جلوگیری از رد کردن جمله هنگام تایپ
    if (typing) return;

    if (currentIndex < currentSentences.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTyping(true);
    } else {
      setFinished(true);
    }
  };

  // =========================
  // Typing Effect
  // =========================

  useEffect(() => {

    if (
      !finished &&
      typing &&
      currentIndex < currentSentences.length
    ) {
      typeSentence(currentSentences[currentIndex]);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };

  }, [currentIndex, typing, finished, selectedIndex]);

  // =========================
  // Reset
  // =========================

  const resetSentences = () => {

    clearTimeout(timeoutRef.current);

    setCurrentIndex(0);
    setAllText("");
    setDisplayText("");
    setTyping(true);
    setFinished(false);
  };

  // =========================
  // Change Topic
  // =========================

  const changeItem = (index) => {

    clearTimeout(timeoutRef.current);

    setSelectedIndex(index);
    setCurrentIndex(0);
    setAllText("");
    setDisplayText("");
    setTyping(true);
    setFinished(false);
  };

  // =========================
  // Keyboard Support
  // =========================

  useEffect(() => {

    const handleKeyDown = (e) => {

      if (
        e.code === "Space" &&
        !["BUTTON", "INPUT", "TEXTAREA"].includes(
          e.target.tagName
        )
      ) {

        e.preventDefault();

        if (!finished) {
          nextSentence();
        } else {
          resetSentences();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [finished, typing, currentIndex, selectedIndex]);

  // =========================
  // Component UI
  // =========================

  return (
    <>
      {/* =========================
          Responsive CSS
      ========================= */}

      <style>{`

        .typing-image-text {
          width: 100%;
          max-width: 1500px;
          min-height: 100vh;
          margin: 0 auto;
          padding: 24px;
          background-color: #efcae156;
          box-sizing: border-box;
          font-family: system-ui, sans-serif;
        }

        .typing-image-text * {
          box-sizing: border-box;
        }

        /* Header */

        .typing-header {
          width: 100%;
          margin-bottom: 20px;
        }

        .typing-heading {
          text-align: center;
          cursor: pointer;
          font-size: 1.3rem;
          font-weight: 600;
          padding: 10px;
          user-select: none;
        }

        .typing-heading.active {
          color: #198754;
        }

        .typing-heading.collapsed {
          color: #dc3545;
        }

        .heading-arrow {
          margin-right: 10px;
          font-size: 0.75rem;
        }

        /* Topic Buttons */

        .typing-topics {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          padding: 10px 0;
        }

        .typing-topics .btn {
          white-space: normal;
          font-size: 0.95rem;
          padding: 9px 15px;
          min-height: 42px;
          border-radius: 9px;
        }

        /* Main Content */

        .typing-content {
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
          gap: 25px;
          align-items: center;
          width: 100%;
        }

        /* Image */

        .typing-image-section {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
          width: 100%;
        }

        .typing-image {
          display: block;
          width: 100%;
          max-width: 550px;
          max-height: 650px;
          object-fit: contain;
          border-radius: 14px;
        }

        /* Text */

        .typing-text-section {
          min-width: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .typing-text-box {
          width: 100%;
          min-height: 180px;
          max-height: 65vh;
          overflow-y: auto;
          padding: 20px;
          background: rgba(255, 255, 255, 0.55);
          border-radius: 12px;
        }

        .typing-text {
          font-family: system-ui, sans-serif;
          font-size: clamp(1.15rem, 2vw, 1.8rem);
          line-height: 2.3;
          min-height: 120px;
          direction: rtl;
          text-align: right;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          word-break: normal;
          margin: 0;
          color: #222;
        }

        /* Controls */

        .typing-controls {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .typing-next-btn {
          min-width: 160px;
          min-height: 48px;
          font-size: 1.1rem;
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        .typing-next-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* Tablet */

        @media (max-width: 991px) {

          .typing-image-text {
            padding: 18px;
          }

          .typing-content {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 18px;
          }

          .typing-image {
            max-height: 450px;
          }

          .typing-text {
            font-size: 1.35rem;
            line-height: 2.1;
          }

        }

        /* Mobile */

        @media (max-width: 767px) {

          .typing-image-text {
            padding: 12px;
            min-height: 100vh;
          }

          .typing-heading {
            font-size: 1.15rem;
            margin-bottom: 5px;
          }

          .typing-topics {
            gap: 8px;
            justify-content: center;
          }

          .typing-topics .btn {
            font-size: 0.85rem;
            padding: 8px 11px;
            flex: 1 1 auto;
            max-width: 100%;
          }

          .typing-content {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .typing-image-section {
            width: 100%;
          }

          .typing-image {
            width: 100%;
            max-width: 100%;
            max-height: 38vh;
            object-fit: contain;
          }

          .typing-text-section {
            width: 100%;
          }

          .typing-text-box {
            min-height: 160px;
            max-height: 45vh;
            padding: 14px;
          }

          .typing-text {
            font-size: 1.25rem;
            line-height: 2.2;
          }

          .typing-controls {
            width: 100%;
            margin-top: 15px;
          }

          .typing-next-btn {
            width: 100%;
            min-height: 50px;
          }

        }

        /* Small Mobile */

        @media (max-width: 380px) {

          .typing-image-text {
            padding: 8px;
          }

          .typing-image {
            max-height: 32vh;
          }

          .typing-text {
            font-size: 1.1rem;
            line-height: 2;
          }

          .typing-topics .btn {
            font-size: 0.8rem;
          }

        }

        /* Large Screens */

        @media (min-width: 1400px) {

          .typing-image-text {
            padding: 35px;
          }

          .typing-content {
            gap: 40px;
          }

          .typing-image {
            max-width: 650px;
          }

        }

      `}</style>

      {/* =========================
          Main Container
      ========================= */}

      <div className="typing-image-text">

        {/* Topic Selection */}

        <div className="typing-header">

          <h4
            className={`typing-heading ${
              showTitleMe ? "active" : "collapsed"
            }`}
            onClick={() => setShowTitleMe(!showTitleMe)}
          >
            موضوع

            <span className="heading-arrow">
              {showTitleMe ? "▲" : "▼"}
            </span>

          </h4>

          {showTitleMe && (

            <div className="typing-topics">

              {items.map((item, index) => (

                <button
                  key={index}
                  className={`btn ${
                    selectedIndex === index
                      ? "btn-success"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => changeItem(index)}
                >
                  {item.title}
                </button>

              ))}

            </div>

          )}

        </div>

        {/* Main Content */}

        <div className="typing-content">

          {/* Image Section */}

          <div className="typing-image-section">

            <img
              src={currentImage}
              alt={items[selectedIndex].title}
              className="typing-image"
            />

          </div>

          {/* Text Section */}

          <div className="typing-text-section">

            <div className="typing-text-box">

              <pre className="typing-text">
                {allText}
                {displayText}
              </pre>

            </div>

            {/* Next Sentence Button */}

            <div className="typing-controls">

              {!finished ? (

                <button
                  className="btn btn-primary typing-next-btn"
                  onClick={nextSentence}
                  disabled={typing}
                >
                  {typing
                    ? "در حال نمایش جمله..."
                    : "جمله بعدی"}
                </button>

              ) : (

                <button
                  className="btn btn-success typing-next-btn"
                  onClick={resetSentences}
                >
                  شروع مجدد
                </button>

              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default TypingImageText;
