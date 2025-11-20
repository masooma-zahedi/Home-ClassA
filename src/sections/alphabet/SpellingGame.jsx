import { nanoid } from "nanoid";
import React, {useEffect, useState } from "react";
import { database, ref, set, onValue, remove } from '.././firebase';
import {cards} from "./LearnNewWords";



// for firebase
const useWords = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
// get data from firebase
  useEffect(() => {
    const wordsRef = ref(database, "words");

    const unsubscribe = onValue(wordsRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const arr = Object.entries(val).map(([id, data]) => ({ id, ...data }));
        setWords(arr);
      } else {
        setWords([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { words, loading };
};



// اگر WordCardsSingle نسخهٔ فعلی‌ت رو داری، آن را ایمپورت کن.
// در این مثال فرض می‌کنیم WordCardsSingle یک prop به نام `initialWords` می‌پذیرد.
// اگر کامپوننت فعلی‌ات از آرایهٔ داخلی استفاده می‌کند، لازم است آن را طوری تغییر دهی
// که از prop استفاده کند (نمونه‌ای پایین می‌دهم).



export default function SpellingGame() {

  const {words, loading} =useWords();
  const jobWords = words.filter((w)=>w.category === "شغل‌ها");
  const fruitD = words.filter((w)=>w.category === "میوه");
  const shopping = words.filter((w)=>w.category === "فروشگاه");
  const supplySchool = words.filter((w)=>w.category === "وسایل مدرسه");

  const partBody = cards.filter((w)=>w.category === "اعضای بدن");
  const insects = cards.filter((w)=>w.category === "حشرات");
  const healthy = cards.filter((w)=>w.category === "سلامتی");
  const animal1 = cards.filter((w)=>w.category === "حیوانات");
  const animal2 = cards.filter((w)=>w.category === "حیوانات 2");
  const homeTools = cards.filter((w)=>w.category === "وسایل خانه");
  const houseParts = cards.filter((w)=>w.category === "بخش‌های خانه");

  


//make data for collections
const createNewData = (dataArray, direction = "horizontal", extraTiles = []) => {
  return dataArray.map(item => ({
    id: nanoid(),
    word: item.word,
    image: item.image,
    title: item.english,
    direction,
    extraTiles
  }));
};

// function for cards data
const createNewDataCards = (dataArray, direction = "horizontal", extraTiles = []) => {
  return dataArray.map(item => ({
    id: nanoid(),
    word: item.persianWord,
    image: item.image,
    title: item.englishWord,
    direction,
    extraTiles
  }));
};
    

  
  
// const ff = data(fruitD);
  


  
  const collections = {
//   "داستان پیک نیک": [
//   { id: nanoid(), word: "ماشین", image: "https://img.freepik.com/premium-vector/car-vector-illustration-classic-red-car-cartoon-transportation_648083-206.jpg", title: "Car", direction: "horizontal", extraTiles: ["ر","ن","ب"] },
//   // { id: nanoid(), word: "اسباب‌بازی", image: "https://thumbs.dreamstime.com/b/heap-toys-eps-vector-illustration-48098461.jpg", title: "Toy", direction: "horizontal", extraTiles: ["گ","د","ل"] },
//   { id: nanoid(), word: "گل", image: "https://png.pngtree.com/png-vector/20240914/ourmid/pngtree-color-cartoon-flowers-png-image_13393417.png", title: "Flower", direction: "horizontal", extraTiles: ["ب","م","ر"] },
//   { id: nanoid(), word: "اردک", image: "https://static.vecteezy.com/system/resources/previews/048/507/915/non_2x/cute-baby-duck-cartoon-illustration-isolated-on-white-background-vector.jpg", title: "Duck", direction: "horizontal", extraTiles: ["ق","س","ن"] },
//   // { id: nanoid(), word: "پیک‌نیک", image: "https://www.shutterstock.com/image-vector/happy-family-on-picnic-dad-600nw-2086473274.jpg", title: "Picnic", direction: "horizontal", extraTiles: ["و","پ","ج"] },
//   // { id: nanoid(), word: "ساندویچ", image: "https://img.freepik.com/premium-vector/retro-cartoon-sub-sandwich-vector-illustration-stock-photos_1323048-25025.jpg", title: "Sandwich", direction: "horizontal", extraTiles: ["ق","ر","ز"] },
//   { id: nanoid(), word: "سیب", image: "https://cdn.pixabay.com/photo/2019/10/03/01/44/apple-4522286_1280.png", title: "Apple", direction: "horizontal", extraTiles: ["ت","ل","ح"] },
//   { id: nanoid(), word: "پرنده", image: "https://static.vecteezy.com/system/resources/previews/008/387/557/non_2x/cartoon-happy-little-bird-flying-vector.jpg", title: "Bird", direction: "horizontal", extraTiles: ["ش","ک","ن"] },
//   { id: nanoid(), word: "سنجاب", image: "https://img.freepik.com/premium-photo/3d-squirrel-cute-cartoon-character_862994-72419.jpg", title: "Squirrel", direction: "horizontal", extraTiles: ["پ","غ","ه"] },
//   { id: nanoid(), word: "فَندُق", image: "https://thumbs.dreamstime.com/b/cheerful-firefly-hazelnut-character-explores-sunny-woodland-surrounded-scattered-hazelnuts-warm-sunlight-filtering-398876260.jpg", title: "Hazelnut", direction: "horizontal", extraTiles: ["ب","س","چ"] },
//   { id: nanoid(), word: "دریاچه", image: "https://thumbs.dreamstime.com/b/cartoon-modern-background-mountain-lake-dock-boat-summer-landscape-water-trees-beautiful-sky-outdoors-316736594.jpg", title: "Lake", direction: "horizontal", extraTiles: ["ق","م","ز"] },
//   { id: nanoid(), word: "سنگ", image: "https://png.pngtree.com/background/20230410/original/pngtree-lawn-color-stone-cartoon-background-picture-image_2383302.jpg", title: "Stone", direction: "horizontal", extraTiles: ["ک","ف","ب"] },
//   { id: nanoid(), word: "ستاره‌", image: "https://static.vecteezy.com/system/resources/previews/002/547/979/non_2x/sleepy-star-in-the-night-sky-free-vector.jpg", title: "Star", direction: "horizontal", extraTiles: ["ل","ح","د"] },
//   { id: nanoid(), word: "خوراکی", image: "https://png.pngtree.com/png-clipart/20250111/original/pngtree-snacks-png-image_19912509.png", title: "Snack / Food", direction: "horizontal", extraTiles: ["ف","ش","ت"] },
// ],
// "پاییز_و_خارپشت": [
//   { id: nanoid(), word: "برگ", image: "https://png.pngtree.com/png-vector/20230808/ourmid/pngtree-cute-fall-leaves-clipart-various-autumn-leaves-set-cartoon-vector-png-image_6867180.png", title: "Leaf", direction: "horizontal", extraTiles: ["ش","پ"] },
//   { id: nanoid(), word: "خارپشت", image: "https://thumbs.dreamstime.com/b/cute-animated-hedgehog-illustration-cartoon-style-design-hedgehog-cute-animated-hedgehog-illustration-cartoon-363412797.jpg", title: "Hedgehog", direction: "horizontal", extraTiles: ["س","م"] },
//   { id: nanoid(), word: "درخت", image: "https://i.pinimg.com/736x/fe/fe/44/fefe4472da490edabdf71bd471352f15.jpg", title: "Tree", direction: "horizontal", extraTiles: ["ف","گ"] },
//   { id: nanoid(), word: "پاییز", image: "https://t4.ftcdn.net/jpg/11/49/68/49/360_F_1149684918_BajC4EcED7p8GH45HN4pOLcHxURgW8mj.jpg", title: "Autumn / Fall", direction: "horizontal", extraTiles: ["ش","ر"] },
//   { id: nanoid(), word: "زمین", image: "https://img.freepik.com/free-vector/low-point-view-nature-landscape_1308-92523.jpg?semt=ais_hybrid&w=740&q=80", title: "Ground / Earth", direction: "horizontal", extraTiles: ["چ","د"] },
//   { id: nanoid(), word: "رنگی", image: "https://png.pngtree.com/thumb_back/fh260/background/20240104/pngtree-vibrant-cartoon-texture-a-playful-and-colorful-background-image_13880204.png", title: "Colorful", direction: "horizontal", extraTiles: ["ب","م"] },
//   { id: nanoid(), word: "استراحت", image: "https://media.istockphoto.com/id/933020166/vector/cute-cartoon-boy-sleep-in-bed-good-dream-rest-character-vector-illustration.jpg?s=170667a&w=0&k=20&c=CV5uGI7uD7HDJWcPSDuhhRoxU08e9yhBP9_z5GD01us=", title: "Rest", direction: "horizontal", extraTiles: ["ش","ک"] },
//   { id: nanoid(), word: "بهار", image: "https://as2.ftcdn.net/jpg/02/56/61/45/1000_F_256614501_8ng35vnx4tr5MvH564fLZRrSynSeyP7w.jpg", title: "Spring", direction: "horizontal", extraTiles: ["ص","ن"] },
//   { id: nanoid(), word: "شاد", image: "https://c8.alamy.com/comp/G39KKD/vector-illustration-of-happy-man-cartoon-G39KKD.jpg", title: "Happy", direction: "horizontal", extraTiles: ["چ","ل"] },
//   { id: nanoid(), word: "غمگین", image: "https://cdn.pixabay.com/photo/2025/07/01/17/42/ai-generated-9691043_1280.png", title: "ُSad", direction: "horizontal", extraTiles: ["ه","ص"] },
// ],
// "شغل ها":createNewData(jobWords, "horizontal", []),
// "میوه":createNewData(fruitD, "horizontal", []),
// "فروشگاه":createNewData(shopping, "horizontal", []),
// "وسایل مدرسه":createNewData(supplySchool, "horizontal", []),

// "اعضای بدن":createNewDataCards(partBody, "horizontal", []),
// "حشرات":createNewDataCards(insects, "horizontal", []),
// "سلامتی":createNewDataCards(healthy, "horizontal", []),
// "حیوانات1":createNewDataCards(animal1, "horizontal", []),
// "حیوانات2":createNewDataCards(animal2, "horizontal", []),
"وسایل خانه":createNewDataCards(homeTools, "horizontal", []),
// "بخش های خانه":createNewDataCards(houseParts, "horizontal", []),


};
  

  


// CollectionPicker.jsx

/*
Props:
- collections: { [categoryName]: Array<{ id, word, image, title? }> }
- onPlay: function(categoryKey, items) called when user clicks "شروع بازی"
*/
// ******************************* start CollectionPicker***************************
 function CollectionPicker({ collections = {}, onPlay = () => {} }) {
  const keys = Object.keys(collections);
  const [selectedKey, setSelectedKey] = useState(keys.length ? keys[0] : null);

  const selectKey = (k) => {
    setSelectedKey(k);
  };

  const selectedItems = selectedKey ? collections[selectedKey] : [];

  return (
    <div className="container py-3" style={{ direction: "rtl" }}>
      <h5 className="text-center mb-3" style={{ fontWeight: 800 }}>انتخاب مجموعه</h5>

      {/* دکمه‌های دسته‌ها */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
        {keys.length === 0 && <div className="text-muted">مجموعه‌ای تعریف نشده است.</div>}
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => selectKey(k)}
            className={`btn ${selectedKey === k ? "btn-primary" : "btn-outline-primary"}`}
            style={{ borderRadius: 999 }}
          >
            {k} <span className="badge bg-light text-dark ms-2">{collections[k].length}</span>
          </button>
        ))}
      </div>

      {/* منطقهٔ نمایش مجموعهٔ انتخاب‌شده */}
      <div className="card p-3" style={{ borderRadius: 12 }}>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div style={{ fontWeight: 700 }}>{selectedKey || "هیچ مجموعه‌ای انتخاب نشده"}</div>
          <div>
            <button
              className="btn btn-sm btn-success"
              onClick={() => onPlay(selectedKey, selectedItems)}
              disabled={!selectedKey || selectedItems.length === 0}
            >
              شروع بازی
            </button>
          </div>
        </div>

        {(!selectedKey || selectedItems.length === 0) ? (
          <div className="text-center text-muted py-4">یکی از مجموعه‌ها را از بالا انتخاب کنید.</div>
        ) : (
          <div className="d-flex gap-3 flex-wrap justify-content-center">
            {selectedItems.map((it) => (
              <div key={it.id} className="card text-center p-2" style={{ width: 120, borderRadius: 10 }}>
                <div style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {it.image ? (
                    <img src={it.image} alt={it.word} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover", borderRadius: 6 }} />
                  ) : (
                    <div style={{ fontSize: 24, fontWeight: 700 }}>{it.word}</div>
                  )}
                </div>
                <div style={{ marginTop: 8, fontWeight: 700 }}>{it.word}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
// ******************************* End CollectionPicker*****************************


// WordCardSingle Start***********************************************************
// WordCardsSingleComponent.jsx

 function WordCardsSingle({ initialWords = null, onFinishedAll = () => {} }) {
  const defaultWords  = [
    { id: 1, word: "سیب", image: "https://media.istockphoto.com/id/686309840/vector/sticker-red-apple-with-stem.jpg?s=612x612&w=0&k=20&c=4QPpObM-Ya-FtLxi3VPeQ-LTno8c0KgWrJknfLNhEro=", title: "Apple", direction: "horizontal", extraTiles: ["گ"] },
    { id: 2, word: "عسل", image: "https://img.freepik.com/free-vector/cute-honey-bee-hug-honeycomb-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-6880.jpg?semt=ais_hybrid&w=740&q=80", title: "Honey", direction: "horizontal", extraTiles: ["ک","پ"] },
    // ... اگر واژه‌های بیشتری داری اضافه کن
  ];

  const words = Array.isArray(initialWords) && initialWords.length ? initialWords : defaultWords;

  // تنظیمات
  const SURPRISE_DELAY = 550; // ms
  const MODAL_ANIM_MS = 520;  // ms

  const [index, setIndex] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [placed, setPlaced] = useState([]);
  const [wrongMask, setWrongMask] = useState([]);
  const [solved, setSolved] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    loadWord(index);
    setShowSurprise(false);
    setShowFinished(false);
  }, [index]);

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  function loadWord(i) {
    const w = words[i];
    if (!w) return;
    const letters = Array.from(w.word);
    const extras = Array.isArray(w.extraTiles) ? w.extraTiles : [];
    const all = shuffle([...letters, ...extras]);
    setTiles(all);
    setPlaced(Array(letters.length).fill(null));
    setWrongMask(Array(letters.length).fill(false));
    setSolved(false);
  }

  const firstEmptyFromRight = (placedArr) => {
    for (let i = placedArr.length - 1; i >= 0; i--) {
      if (!placedArr[i]) return i;
    }
    return -1;
  };

  const handleTileClick = (tileIdx) => {
    if (solved) return;
    const targetIdx = firstEmptyFromRight(placed);
    if (targetIdx === -1) return;
    setPlaced((prev) => {
      const np = [...prev];
      np[targetIdx] = tiles[tileIdx];
      return np;
    });
    setTiles((prev) => {
      const nt = [...prev];
      nt.splice(tileIdx, 1);
      return nt;
    });
  };

  const handleCellClick = (underlyingIdx) => {
    if (solved) return;
    if (!placed[underlyingIdx]) return;
    const removed = placed[underlyingIdx];
    setPlaced((prev) => {
      const np = [...prev];
      np[underlyingIdx] = null;
      return np;
    });
    setTiles((prev) => shuffle([...prev, removed]));
  };

  // بررسی جواب وقتی پر شد — با جلوگیری از به‌روزرسانی بی‌دلیل wrongMask
  useEffect(() => {
    const w = words[index];
    if (!w) return;
    const letters = Array.from(w.word);
    const filled = placed.length > 0 && placed.every((p) => p !== null);
    if (filled && !solved) {
      let userAnswer = placed;
      let shouldReverseMask = false;
      if (w.direction === "horizontal") {
        userAnswer = [...placed].reverse();
        shouldReverseMask = true;
      }
      const mask = letters.map((ch, i) => userAnswer[i] === ch);
      const allGood = mask.every(Boolean);
      if (allGood) {
        setSolved(true);
        setTimeout(() => setShowSurprise(true), SURPRISE_DELAY);
      } else {
        const finalMask = mask.map((m) => !m);
        const newMask = shouldReverseMask ? finalMask.reverse() : finalMask;
        // فقط اگر newMask با wrongMask فعلی متفاوت بود آپدیت کن
        const same = newMask.length === wrongMask.length && newMask.every((v, i) => v === wrongMask[i]);
        if (!same) setWrongMask(newMask);
      }
    } else {
      // فقط وقتی قبلاً یک true وجود داشته باشد، آن‌را پاک کنیم (تا از رندر بی‌پایان جلوگیری شود)
      setWrongMask((prev) => {
        const hasAnyTrue = Array.isArray(prev) && prev.some((v) => v === true);
        if (!hasAnyTrue) return prev;
        return prev.map(() => false);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placed, index, solved]); // حذف words از وابستگی تا باعث رندر اضافه نشود (words ثابت است)

  const onNext = () => {
    setShowSurprise(false);
    if (index + 1 < words.length) {
      setIndex(index + 1);
    } else {
      onFinishedAll();
      setShowFinished(true);
    }
  };

  const restGame = () => {
    setIndex(0);
    setShowFinished(false);
  };

  const onResetCard = () => {
    loadWord(index);
  };

  const cellSize = 50;
  const w = words[index];
  if (!w) return <div className="container py-4">هیچ کلمه‌ای تعریف نشده است.</div>;

  return (
    <div className="container py-3" style={{ direction: "rtl" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="row " style={{ display: "flex", gap: 12, alignItems: "center", background: "#fff", padding: 12, borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
          <div className="me-0 me-md-5 " style={{ flexShrink: 0 }}>
            {w.image ? (
              <img src={w.image} alt={w.title || w.word} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10 }} />
            ) : (
              <div style={{ width: 80, height: 80, borderRadius: 10, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>{w.title || w.word} </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{w.title || w.word}</div>
            <div style={{ color: "#6b7280", marginTop: 6 }}>{w.direction === "vertical" ? "جهت: عمودی ↕" : "جهت: افقی ↔"}</div>

            <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {w.direction === "horizontal" ? (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {Array.from({ length: placed.length }).map((_, visIndex) => {
                    const underlyingIdx = placed.length - 1 - visIndex;
                    const p = placed[underlyingIdx];
                    const isWrong = wrongMask[underlyingIdx];
                    return (
                      <div
                        key={underlyingIdx}
                        onClick={() => handleCellClick(underlyingIdx)}
                        style={{
                          width: cellSize,
                          height: cellSize,
                          borderRadius: 8,
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                          cursor: solved ? "default" : "pointer",
                          border: isWrong ? "2px solid #ef4444" : "1px solid #e6e7eb",
                          color: isWrong ? "#ef4444" : "#111827",
                          fontSize: 26,
                          fontWeight: 900,
                          fontFamily: "'Vazirmatn', Tahoma, sans-serif",
                          transition: "transform 260ms cubic-bezier(.2,.9,.3,1), box-shadow 260ms, background 200ms",
                          transform: p ? "scale(1.02)" : "scale(1)",
                        }}
                      >
                        <div style={{ direction: "rtl" }}>{p || ""}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8, flexDirection: "column", alignItems: "center" }}>
                  {placed.map((p, i) => (
                    <div
                      key={i}
                      onClick={() => handleCellClick(i)}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        borderRadius: 8,
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                        cursor: solved ? "default" : "pointer",
                        border: wrongMask[i] ? "2px solid #ef4444" : "1px solid #e6e7eb",
                        color: wrongMask[i] ? "#ef4444" : "#111827",
                        fontSize: 26,
                        fontWeight: 900,
                        fontFamily: "'Vazirmatn', Tahoma, sans-serif",
                        transition: "transform 260ms cubic-bezier(.2,.9,.3,1), box-shadow 260ms",
                        transform: p ? "scale(1.02)" : "scale(1)",
                      }}
                    >
                      <div style={{ direction: "rtl" }}>{p || ""}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {tiles.length === 0 && <div style={{ color: "#6b7280" }}>کاشی‌ای باقی نمانده</div>}
              {tiles.map((t, ti) => (
                <div
                  key={ti}
                  onClick={() => handleTileClick(ti)}
                  style={{
                    minWidth: 40,
                    height: 48,
                    borderRadius: 8,
                    background: "#ffd57e",
                    color: "#111827",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 800,
                    cursor: solved ? "default" : "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                    transition: "transform 220ms ease, opacity 220ms ease",
                  }}
                >
                  <div style={{ direction: "rtl" }}>{t}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center" }}>
              <button className="btn btn-sm btn-outline-secondary" onClick={onResetCard}>دوباره</button>
              {solved ? (
                <button className="btn btn-sm btn-primary" onClick={onNext}>بعدی</button>
              ) : null}
            </div>

          </div>
        </div>

        {/* سورپرایز */}
        {showSurprise && (
          <div className="modal-overlay" style={{ animationDuration: `${MODAL_ANIM_MS}ms` }}>
            <div className="modal-card" style={{ animationDuration: `${MODAL_ANIM_MS}ms` }}>
              <div className="gif-wrap">
                <img className="gif-img" src="https://i.pinimg.com/originals/f2/58/d1/f258d1c684f9f51903d782aaa9328d3b.gif" alt="surprise" />
              </div>

              <div className="confetti-container" aria-hidden>
                <ConfettiSVG burst="small" />
              </div>

              <div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>آفرین! درست نوشتی 🎉</div>
              <div style={{ marginTop: 10 }}>
                <button className="btn btn-sm btn-success" onClick={() => { setShowSurprise(false); }}>باشه</button>
                <button className="btn btn-sm btn-primary ms-2" onClick={onNext}>بعدی</button>
              </div>
            </div>
          </div>
        )}

        {/* پایان بازی */}
        {showFinished && (
          <div className="modal-overlay" style={{ animationDuration: `${MODAL_ANIM_MS}ms` }}>
            <div className="modal-card" style={{ animationDuration: `${MODAL_ANIM_MS}ms` }}>
              <div className="gif-wrap">
                <img className="gif-img" src="https://www.gifcen.com/wp-content/uploads/2024/01/well-done-gif-2.gif" alt="finished" />
              </div>

              {/* <div className="confetti-container" aria-hidden>
                <ConfettiSVG burst="big" />
              </div> */}

              <div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>بازی تمام شد. 🎉</div>
              <div style={{ marginTop: 10 }}>
                <button className="btn btn-sm btn-primary ms-2" onClick={restGame}>شروع بازی</button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* استایل‌ها */}
      <style>{`
        .modal-overlay {
          position: fixed;
          left: 0; top: 0; right: 0; bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.28);
          z-index: 9999;
          animation-name: overlayFade;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
        .modal-card {
          pointer-events: auto;
          background: rgba(255,255,255,0.98);
          padding: 18px 20px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.18);
          text-align: center;
          max-width: 88%;
          width: 420px;
          transform-origin: center;
          animation-name: popIn;
          animation-timing-function: cubic-bezier(.12,.8,.26,1);
          animation-fill-mode: both;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @keyframes overlayFade {
          0% { background: rgba(0,0,0,0); }
          100% { background: rgba(0,0,0,0.28); }
        }
        @keyframes popIn {
          0% { transform: translateY(18px) scale(0.88); opacity: 0; filter: blur(2px); }
          60% { transform: translateY(-6px) scale(1.02); opacity: 1; filter: blur(0); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        /* GIF */
        .gif-wrap {
          width: 180px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 8px;
          background: transparent;
          margin: 0 auto 14px;
        }
        .gif-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
          display: block;
        }

        /* کانتینر کنفتی */
        .confetti-container {
          width: 100%;
          max-width: 320px;
          height: 92px;
          margin: 0 auto 10px;
          position: relative;
          overflow: visible;
        }

        .confetti-piece {
          position: absolute;
          top: 8px;
          font-size: 20px;
          opacity: 0;
          animation-name: confettiFall;
          animation-timing-function: cubic-bezier(.2,.8,.25,1);
          animation-fill-mode: forwards;
          will-change: transform, opacity;
        }
        @keyframes confettiFall {
          0% { transform: translateY(-8px) rotate(0deg) scale(0.8); opacity: 0; }
          30% { opacity: 1; transform: translateY(6px) rotate(20deg) scale(1.05); }
          100% { transform: translateY(70px) rotate(280deg) scale(1); opacity: 1; }
        }

        /* ریسپانسیو کوچک */
        @media (max-width: 420px) {
          .gif-wrap { width: 140px; height: 96px; margin-bottom: 12px; }
          .confetti-container { height: 72px; margin-bottom: 8px; }
          .confetti-piece { font-size: 18px; top: 6px; }
          .modal-card { width: 92%; padding: 14px; }
        }
      `}</style>
    </div>
  );
}
// ************************************************* End WordCardSingle***********


/* Confetti: افست افقی با left: calc(50% + offset) تا با transform تداخل نکند */
function ConfettiSVG({ burst = "small" }) {
  const pieces = burst === "big" ? 10 : 6;
  const icons = ["🎈", "✨", "🎉", "⭐", "💫", "🍬", "🎀"];
  const spread = 160; // پهنای پراکندگی افقی (قابل تنظیم)

  const arr = Array.from({ length: pieces }).map((_, i) => {
    const offset = Math.round((i - (pieces - 1) / 2) * (spread / pieces));
    const delay = 0.04 * i;
    const scale = 0.9 + Math.random() * 0.4;
    const icon = icons[i % icons.length];
    return { offset, delay, scale, icon, idx: i };
  });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {arr.map((it) => (
        <div
          key={it.idx}
          className="confetti-piece"
          style={{
            left: `calc(50% + ${it.offset}px)`,
            top:"-50px",
            animationDuration: `${700 + it.idx * 90}ms`,
            animationDelay: `${it.delay}s`,
            transform: `translateY(0) scale(${it.scale})`,
          }}
        >
          {it.icon}
        </div>
      ))}
    </div>
  );
}

// it is for Spelling Game componene
  const [playingItems, setPlayingItems] = useState(null);
  const [playingTitle, setPlayingTitle] = useState("");

  const handlePlay = (key, items) => {
    if (!key || !items || items.length === 0) return;
    setPlayingTitle(key);
    // تبدیل داده‌ها به فرمت مورد نیاز WordCardsSingle (در مثال کلمه فقط نیاز است)
    // اگر WordCardsSingle نیاز به ساختار متفاوتی دارد آن را متناسب کن
    const wordsForGame = items.map((it) => ({
      id: it.id,
      word: it.word,
      image: it.image,
      title: it.title,
      direction: "horizontal", // یا بر اساس تنظیمات خود
      extraTiles: it.extraTiles, // می‌توانی اینجا اضافه کنی
    }));
    setPlayingItems(wordsForGame);
  };

  const handleFinishedAll = () => {
    // وقتی بازی تمام شد، به لیست برگرد
    setPlayingItems(null);
    setPlayingTitle("");
  };

  return (
    <div>
      {!playingItems ? (
        <CollectionPicker collections={collections} onPlay={handlePlay} />
      ) : (
        <div className="my-5 rounded py-5" style={{ direction: "rtl", background:"linear-gradient(135deg, #84FAB0, #8FD3F4)",position:"relative" }}>
            <div className="d-none  d-lg-block" style={{position:"absolute",width:"180px",top:"45%",right:"55px"}}>
                <img className="w-100 " src="https://cdn-icons-png.flaticon.com/256/10774/10774986.png"  alt="" />
            </div>
          <div className="d-flex align-items-center justify-content-between mb-2" style={{ maxWidth: 720, margin: "8px auto" }}>
            <h5 style={{ margin: 0 }}>{playingTitle}</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => { setPlayingItems(null); setPlayingTitle(""); }}>بازگشت</button>
          </div>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {/* پاس دادن words به WordCardsSingle */}
            <WordCardsSingle initialWords={playingItems} onFinishedAll={handleFinishedAll} />
          </div>
        </div>
      )}
    </div>
  );
}
