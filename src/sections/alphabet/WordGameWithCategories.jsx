// WordGameWithCategories.jsx
import React, { useState, useEffect } from "react";
import { database, ref, onValue, set, remove } from "../firebase"; // مسیرت را بررسی کن
import { query, orderByChild, equalTo } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom"; // اگر از react-router استفاده می‌کنی
import "bootstrap/dist/css/bootstrap.min.css";

export default function WordGameWithCategories({ initialCategory = null }) {
  const params = useParams?.() || {};
  const routeCategory = params.cat || null; // نیاز به مسیر مثل /words/category/:cat

  const [words, setWords] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // انتخاب دسته — اولویت: prop > route param > داخلی (default "همه")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? routeCategory ?? "همه");

  // فرم
  const [showForm, setShowForm] = useState(false);
  const [word, setWord] = useState("");
  const [syllables, setSyllables] = useState("");
  const [english, setEnglish] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [showEditDelete, setShowEditDelete] = useState(false);

  // 1) خواندن کامل دسته‌ها (یک‌بار) تا منوی دسته‌ها ساخته شود
  useEffect(() => {
    const wordsRef = ref(database, "words");
    const off = onValue(wordsRef, (snapshot) => {
      const data = snapshot.val();
      const arr = data ? Object.values(data) : [];
      const cats = Array.from(new Set(arr.map((w) => w.category).filter(Boolean)));
      setAllCategories(cats);

      // اگر initialCategory یا routeCategory نداشته باشیم و هنوز selectedCategory روی "همه" نباشه، آن را به "همه" یا اولین دسته تنظیم نکنیم.
      // اما اگر مقدار اولیه null باشه می‌توانیم به اولین دسته تنظیم کنیم (گزینه اختیاری):
      if (!initialCategory && !routeCategory && selectedCategory === "همه" && cats.length > 0) {
        // keep "همه" as default — حذف یا فعال کن این خط اگر می‌خوای auto-select به اولین دسته باشه:
        // setSelectedCategory(cats[0]);
      }
    });
    return () => off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // فقط یک‌بار

  // 2) هر بار selectedCategory تغییر کرد، فقط آن دسته را از Firebase بخوان
  useEffect(() => {
    let wordsRef = ref(database, "words");
    let q;

    if (!selectedCategory || selectedCategory === "همه") {
      q = wordsRef;
    } else {
      q = query(wordsRef, orderByChild("category"), equalTo(selectedCategory));
    }

    const off = onValue(q, (snapshot) => {
      const data = snapshot.val();
      const arr = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
      setWords(arr);
    });

    return () => off();
  }, [selectedCategory]);

  // اگر prop یا route تغییر کند، selectedCategory را به‌روزرسانی کن (اولویت‌بندی)
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    } else if (routeCategory) {
      setSelectedCategory(routeCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory, routeCategory]);

  // ذخیره (افزودن / ویرایش)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!word || !syllables || !english || !imageUrl || !category) {
      alert("همه فیلدها الزامی هستند");
      return;
    }
    const id = editId || uuidv4();
    await set(ref(database, "words/" + id), {
      id,
      word,
      syllables: syllables.split("-"),
      english,
      image: imageUrl,
      category,
    });
    resetForm();
  };

  const handleDelete = async (id) => {
    if (window.confirm("آیا از حذف مطمئن هستید؟")) {
      await remove(ref(database, "words/" + id));
    }
  };

  const handleEdit = (w) => {
    setWord(w.word);
    setSyllables((w.syllables || []).join("-"));
    setEnglish(w.english);
    setImageUrl(w.image);
    setCategory(w.category);
    setEditId(w.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setWord("");
    setSyllables("");
    setEnglish("");
    setImageUrl("");
    setCategory("");
    setEditId(null);
    setShowForm(false);
  };

  const categories = ["همه", ...allCategories];

  return (
    <div className="container-fluid mt-4">
        <div className="border border-3 border-info rounded my-5"></div>
      <div className="row">
        
        {/* این قسمت فهرست هست و فعلا کامنت شده اشت */}
        {/* دسته‌بندی‌ها */}
        {/* <div className="col-md-2 mb-3">
          <ul className="list-group" dir="rtl">
            {categories.map((cat, idx) => (
              <li
                key={idx}
                className={`list-group-item ${selectedCategory === cat ? "active" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div> */}

        {/* کارت‌ها و فرم */}
        <div className="col-md-10">
          <div className="d-flex gap-2 mb-3 justify-content-center">
            {/* <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? "بستن فرم" : "افزودن واژه جدید"}
            </button> */}
            <div className="align-self-center">نمایش: <strong>{selectedCategory}</strong></div>
          </div>
{/*  این قسمت افزودن واژه جدید هست که به خاطر اینکه برای بچه ها می فرستم کامنت شده  */}
          {/* {showForm && (
            <form onSubmit={handleSubmit} dir="rtl" className="border p-4 mb-4 rounded bg-light">
              <div className="mb-3">
                <label className="form-label">واژه فارسی:</label>
                <input className="form-control" value={word} onChange={(e) => setWord(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">سیلاب‌ها (با - جدا شوند):</label>
                <input className="form-control" value={syllables} onChange={(e) => setSyllables(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">معنی انگلیسی:</label>
                <input className="form-control" value={english} onChange={(e) => setEnglish(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">آدرس تصویر:</label>
                <input className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">دسته‌بندی:</label>
                <input className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>

              <button className="btn btn-success" type="submit">{editId ? "ویرایش واژه" : "افزودن واژه"}</button>
              {editId && (
                <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>لغو</button>
              )}
              <button type="button" className="btn btn-warning me-2" onClick={() => setShowEditDelete(!showEditDelete)}>
                {showEditDelete ? "پنهان ویرایش/حذف" : "نمایش ویرایش/حذف"}
              </button>
            </form>
          )} */}

          <div className="row " dir="rtl">
            {words.map((w) => (
              <div className="col-md-4 mb-4" key={w.id}>
                <div
                  className={`card word-card h-100 ${selectedCard === w.id ? "active bounce" : ""}`}
                  onClick={() => setSelectedCard(selectedCard === w.id ? null : w.id)}
                >
                  <img src={w.image} alt={w.word} className="card-img-top mt-2" style={{ height: 160, objectFit: "contain" }} />
                  <div className="card-body text-center">
                    <h5 className="card-title">{w.word}</h5>
                    {selectedCard === w.id && (
                      <>
                        <p className="card-text text-muted">( {w.english} )</p>
                        <div className="mb-3 h4 syllables">
                          {(w.syllables || []).map((s, i) => (
                            <span key={i} className="badge bg-warning text-dark me-1 syllable-badge" style={{ animationDelay: `${i * 0.2}s` }}>
                              {s}
                            </span>
                          ))}
                        </div>

                        {showEditDelete && (
                          <>
                            <button className="btn btn-outline-primary btn-sm mx-1" onClick={() => handleEdit(w)}>✏️ ویرایش</button>
                            <button className="btn btn-outline-danger btn-sm mx-1" onClick={() => handleDelete(w.id)}>❌ حذف</button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* استایل ها */}
      <style>{`
        .word-card { transition: transform 0.4s ease, box-shadow 0.4s ease; cursor: pointer; }
        .word-card:hover { transform: scale(1.05); }
        .word-card.active { transform: scale(1.1) rotate(-2deg); box-shadow: 0 10px 25px rgba(255, 0, 255, 0.6); border: 3px solid #ff0088ff; background: linear-gradient(145deg, #fdeaffff, #ffc4edff); }
        .bounce { animation: bounce 0.6s ease; }
        @keyframes bounce { 0% { transform: scale(1) rotate(0deg); } 30% { transform: scale(1.15) rotate(-3deg); } 50% { transform: scale(0.95) rotate(2deg); } 70% { transform: scale(1.05) rotate(-1deg); } 100% { transform: scale(1.1) rotate(-2deg); } }
        .syllable-badge { opacity: 0; transform: translateY(10px); animation: fadeInUp 0.5s forwards; }
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
