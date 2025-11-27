import React, { useState, useRef, useEffect } from "react";

/**
 * LetterMatch_PointerFix.jsx
 * - همان منطق Pointer/Drag اصلاح‌شده
 * - فهرست به صورت دکمه‌های انتخابی (pills)
 * - دکمه نمایش/پنهان کردن فهرست با انیمیشن ساده
 * - دسترسی‌پذیری (aria-pressed, role, keyboard support)
 *
 * قرار بدهید در پروژه و import کنید:
 * import LetterMatch_PointerFix from "./LetterMatch_PointerFix";
 */

const dataSets = [
   {
  id: "alphabet",
  title: "حروف الفبا",
  items: [
    { id: 1, word: "تُخمِ مُرغ", image: " https://static.vecteezy.com/system/resources/thumbnails/054/671/915/small/two-smiling-eggs-are-sitting-on-a-wooden-table-photo.jpg" },
    { id: 2, word: "پَنگوئن", image: "https://static.vecteezy.com/system/resources/previews/044/864/382/non_2x/cute-winter-penguin-cartoon-drawing-vector.jpg " },
    { id: 3, word: "بادکُنَک", image: "https://thumbs.dreamstime.com/b/cartoon-balloons-illustration-generative-ai-colorful-clipart-isolated-386381159.jpg" },
    { id: 4, word: "اَنار", image: "https://thumbs.dreamstime.com/b/d-funny-cartoon-delicious-pomegranate-agriculture-fruit-ai-generated-d-funny-cartoon-delicious-pomegranate-304668331.jpg" },

    { id: 5, word: "شُکُلات", image: "https://t4.ftcdn.net/jpg/04/68/67/91/360_F_468679123_DnRyA3qKZnmxXiJ932TnmpJPBCj8sLEQ.jpg " },
    { id: 6, word: "سِتارِه", image: "https://thumbs.dreamstime.com/b/cartoon-star-smiling-face-featuring-large-expressive-eyes-cheerful-expression-flames-trail-behind-colored-shades-403930279.jpg " },
    { id: 7, word: "رُز", image: " https://www.shutterstock.com/image-vector/rose-vector-on-white-background-600nw-2567441655.jpg" },
    { id: 8, word: "دِرَخت", image: "https://png.pngtree.com/png-vector/20231023/ourmid/pngtree-tree-png-cartoon-tree-png-image_10312641.png " },

    { id: 9, word: "نان", image: "https://as2.ftcdn.net/jpg/06/07/77/33/1000_F_607773312_lAuuRIgHldmjunLUJWq0VDxngKD9aZ39.jpg " },
    { id: 10, word: "لِباس", image: "https://img.freepik.com/free-vector/set-clothes-isolated_1308-133273.jpg " },
    { id: 11, word: "مورچِه", image: " https://t4.ftcdn.net/jpg/16/42/81/11/360_F_1642811110_JwEPZq9nBV4LPAptrmobcCHpIi6VbP7X.jpg" },
    { id: 12, word: "کَلید", image: "https://previews.123rf.com/images/nikiteev/nikiteev1609/nikiteev160901271/62689032-vector-cartoon-bunch-of-modern-keys-on-white-background.jpg" },

    { id:13 , word: "لاک پُشت", image: "https://media.istockphoto.com/id/1291924147/vector/vector-cute-turtle-cartoon-character.jpg?s=170667a&w=0&k=20&c=ucrjh5hNpBEL6fPHnO89X2UjkMQwmks-s5a_jD6-etE=" },
    { id: 14, word: "مار", image: "https://thumbs.dreamstime.com/b/d-cartoon-snake-vibrant-scales-friendly-expression-white-background-356297574.jpg" },
    { id: 15, word: "شیر", image: "https://static.vecteezy.com/system/resources/previews/007/270/750/non_2x/cartoon-milk-box-holding-a-glass-of-milk-vector.jpg" },
    { id:16 , word: "راست", image: "https://static.vecteezy.com/system/resources/previews/012/941/604/non_2x/cartoon-little-boy-pointing-to-his-right-with-the-right-word-vector.jpg" },
  ],
},
  // {
  //   id: "animals",
  //   title: "حیوانات",
  //   items: [
  //     { id: 1, word: "خرگوش", image: "https://cdn.vectorstock.com/i/1000v/74/71/cartoon-rabbit-on-the-grass-vector-20757471.jpg" },
  //     { id: 2, word: "روباه", image: "https://png.pngtree.com/png-vector/20241204/ourmid/pngtree-cute-cartoon-fox-clipart-illustration-png-image_14579366.png" },
  //     { id: 3, word: "خرس", image: "https://www.shutterstock.com/image-vector/vector-illustration-large-wild-bear-260nw-469488479.jpg" },
  //     { id: 4, word: "خروس", image: "https://i.pinimg.com/736x/71/2d/54/712d54cd7cf96706fa4eb36be15fd3ba.jpg" },
  //   ],
  // },
  // {
  //   id: "household",
  //   title: "وسایل خانه",
  //   items: [
  //     { id: 1, word: "در", image: "https://i.ibb.co/2YqRkC5/door.png" },
  //     { id: 2, word: "میز", image: "https://i.ibb.co/5nhg9qv/table.png" },
  //     { id: 3, word: "صندلی", image: "https://i.ibb.co/3sW5d9k/chair.png" },
  //     { id: 4, word: "پنجره", image: "https://i.ibb.co/0s6Xy7Y/window.png" },
  //   ],
  // },
  // {
  //   id: "mixed",
  //   title: "متنوع",
  //   items: [
  //     { id: 1, word: "ذرت", image: "https://i.ibb.co/2FsfXqM/corn.png" },
  //     { id: 2, word: "قلم", image: "https://i.ibb.co/3Yz0XkF/pen.png" },
  //     { id: 3, word: "سیب", image: "https://i.ibb.co/9Gx7Qtk/apple.png" },
  //     { id: 4, word: "ذره‌بین", image: "https://i.ibb.co/4KX0f8Y/magnify.png" },
  //   ],
  // },
];

function shuffle(a) {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MatchingLettersPicturs() {
  // dataset selection + collapse state
  const [selectedSetId, setSelectedSetId] = useState(dataSets[0].id);
  const [panelOpen, setPanelOpen] = useState(true);
  const selectedSet = dataSets.find((s) => s.id === selectedSetId) ?? dataSets[0];

  // create initial state based on selected set
  const createInitialStateFromSet = (set) => {
    const initialCards = set.items.map((it) => ({ id: it.id, word: it.word, image: it.image, matched: false, matchedLetter: null }));
    const firstLetters = initialCards.map((c) => c.word[0]);
    const extras = ["پ", "م", "ب", "س", "ن"].filter((e) => !firstLetters.includes(e)).slice(0, 4);
    const lettersInit = shuffle([...firstLetters, ...extras]);
    const lettersState = lettersInit.map((l, i) => ({ id: `L${i}`, letter: l, placed: false }));
    return { initialCards, lettersState };
  };

  const initial = createInitialStateFromSet(selectedSet);
  const [cards, setCards] = useState(initial.initialCards);
  const [letters, setLetters] = useState(initial.lettersState);
  const [selectedLetterId, setSelectedLetterId] = useState(null);

  // drag refs and handler refs
  const dragData = useRef({ letterId: null });
  const dragClone = useRef(null);
  const handlersRef = useRef({ pointerMove: null, pointerUp: null, globalCleanup: null });

  // showName Picture
  const[showName, setShowName] = useState(true)

  // ---------- placement logic ----------
  function tryPlaceLetter(letterId, cardId) {
    const L = letters.find((x) => x.id === letterId);
    if (!L) return;
    const idx = cards.findIndex((c) => c.id === cardId);
    if (idx === -1) return;
    const card = cards[idx];
    const firstChar = card.word[0];
    if (L.letter === firstChar) {
      const newCards = [...cards];
      newCards[idx] = { ...card, matched: true, matchedLetter: L.letter };
      setCards(newCards);
      setLetters((prev) => prev.map((p) => (p.id === letterId ? { ...p, placed: true } : p)));
    } else {
      const el = document.getElementById(letterId);
      if (el) {
        el.classList.remove("shake");
        void el.offsetWidth;
        el.classList.add("shake");
        setTimeout(() => el.classList.remove("shake"), 600);
      }
    }
  }

  // ---------- native drag (mouse) ----------
  function handleDragStart(e, letterId) {
    dragData.current.letterId = letterId;
    try { e.dataTransfer.setData("text/plain", letterId); } catch {}
    e.dataTransfer.effectAllowed = "move";
  }
  function handleDragEnd() { dragData.current.letterId = null; }
  function handleDragOver(e) { e.preventDefault(); }
  function handleDropOnCard(e, cardId) {
    e.preventDefault();
    const id = dragData.current.letterId || e.dataTransfer.getData("text/plain");
    if (!id) return;
    tryPlaceLetter(id, cardId);
    dragData.current.letterId = null;
  }

  // ---------- pointer-based drag (touch/pen) ----------
  function startPointerDrag(letterId, ev) {
    if (ev.pointerType === "mouse") return;
    try { ev.preventDefault(); } catch {}
    const orig = document.getElementById(letterId);
    if (!orig) return;
    const rect = orig.getBoundingClientRect();

    const clone = orig.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.left = rect.left + "px";
    clone.style.top = rect.top + "px";
    clone.style.width = rect.width + "px";
    clone.style.pointerEvents = "none";
    clone.style.zIndex = 9999;
    clone.classList.add("drag-clone");
    document.body.appendChild(clone);

    dragClone.current = {
      clone,
      offsetX: ev.clientX - rect.left,
      offsetY: ev.clientY - rect.top,
      letterId,
      pointerId: ev.pointerId,
    };

    orig.style.opacity = "0.3";
    try { orig.setPointerCapture?.(ev.pointerId); } catch {}

    const move = (e) => {
      if (!dragClone.current || e.pointerId !== dragClone.current.pointerId) return;
      try { e.preventDefault(); } catch {}
      const { clone: cl, offsetX, offsetY } = dragClone.current;
      cl.style.left = e.clientX - offsetX + "px";
      cl.style.top = e.clientY - offsetY + "px";
    };

    const up = (e) => {
      if (!dragClone.current || e.pointerId !== dragClone.current.pointerId) { cleanupPointerDrag(); return; }
      const cx = e.clientX, cy = e.clientY;
      const el = document.elementFromPoint(cx, cy);
      if (el) {
        const cardEl = el.closest?.(".card-target");
        if (cardEl) {
          const cid = Number(cardEl.getAttribute("data-card-id"));
          tryPlaceLetter(dragClone.current.letterId, cid);
        }
      }
      cleanupPointerDrag();
    };

    handlersRef.current.pointerMove = move;
    handlersRef.current.pointerUp = up;

    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up, { passive: false });
    window.addEventListener("pointercancel", up, { passive: false });
  }

  function cleanupPointerDrag() {
    if (dragClone.current) {
      const { clone, letterId, pointerId } = dragClone.current;
      const orig = document.getElementById(letterId);
      if (orig) {
        orig.style.opacity = "1";
        try { orig.releasePointerCapture?.(pointerId); } catch {}
      }
      try { clone.remove(); } catch {}
      dragClone.current = null;
    }

    if (handlersRef.current.pointerMove) {
      window.removeEventListener("pointermove", handlersRef.current.pointerMove);
      handlersRef.current.pointerMove = null;
    }
    if (handlersRef.current.pointerUp) {
      window.removeEventListener("pointerup", handlersRef.current.pointerUp);
      window.removeEventListener("pointercancel", handlersRef.current.pointerUp);
      handlersRef.current.pointerUp = null;
    }
  }

  // ---------- global cleanup ----------
  useEffect(() => {
    const globalCleanup = () => cleanupPointerDrag();
    const onVisibility = () => { if (document.visibilityState === "hidden") cleanupPointerDrag(); };
    const onScroll = () => cleanupPointerDrag();
    const onResize = () => cleanupPointerDrag();
    const onPageHide = () => cleanupPointerDrag();
    const onBeforeUnload = () => cleanupPointerDrag();
    const onBlur = () => cleanupPointerDrag();

    handlersRef.current.globalCleanup = globalCleanup;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointercancel", globalCleanup, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointercancel", globalCleanup);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  // ---------- attach pointerstart to letter tiles ----------
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".letter-tile"));
    nodes.forEach((n) => {
      const id = n.id;
      if (!id) return;
      if (n._pointerStart) return;
      const startHandler = (ev) => {
        if (ev.pointerType === "mouse") return;
        startPointerDrag(id, ev);
      };
      n._pointerStart = startHandler;
      n.addEventListener("pointerdown", startHandler, { passive: false });
    });

    return () => {
      const nodes2 = Array.from(document.querySelectorAll(".letter-tile"));
      nodes2.forEach((n) => {
        if (n._pointerStart) {
          n.removeEventListener("pointerdown", n._pointerStart);
          delete n._pointerStart;
        }
      });
    };
  }, [letters]);

  // ---------- when dataset changes, reset ----------
  useEffect(() => {
    const { initialCards, lettersState } = createInitialStateFromSet(selectedSet);
    cleanupPointerDrag();
    setCards(initialCards);
    setLetters(lettersState);
    setSelectedLetterId(null);
    dragData.current.letterId = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSetId]);

  // ---------- helpers ----------
  function resetAll() {
    const { initialCards, lettersState } = createInitialStateFromSet(selectedSet);
    setCards(initialCards);
    setLetters(lettersState);
    setSelectedLetterId(null);
    cleanupPointerDrag();
    dragData.current.letterId = null;
  }

  // keyboard: left/right to change dataset when panel open
  const handleDatasetKeyDown = (e, idx) => {
    if (e.key === "ArrowRight") {
      const next = (idx + 1) % dataSets.length;
      setSelectedSetId(dataSets[next].id);
    } else if (e.key === "ArrowLeft") {
      const prev = (idx - 1 + dataSets.length) % dataSets.length;
      setSelectedSetId(dataSets[prev].id);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedSetId(dataSets[idx].id);
    }
  };

  // ---------- render ----------
  return (
    <div className="letter-match container border border-warning border-3 rounded-3 my-5 bg-info py-3" dir="rtl">
      <style>{`
        .letter-match { font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
        .panel-row { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:12px; flex-wrap:wrap; }
        .title-row { display:flex; align-items:center; gap:10px; }
        .dataset-panel {
          width:100%;
          overflow:hidden;
          transition: max-height 280ms ease, opacity 220ms ease, transform 220ms ease;
          background: #f8f9fa;
          border-radius:8px;
          padding:10px;
        }
        .dataset-panel.collapsed {
          max-height: 0;
          opacity: 0;
          transform: translateY(-6px);
          padding-top: 0;
          padding-bottom: 0;
        }
        .dataset-pills { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
        .pill {
          background: white;
          border:1px solid #d1d5db;
          padding:8px 12px;
          border-radius:999px;
          cursor:pointer;
          box-shadow: 0 1px 0 rgba(0,0,0,0.03);
          font-weight:600;
          transition: transform .12s ease, box-shadow .12s ease, background .15s ease;
        }
        .pill:hover { transform: translateY(-2px); }
        .pill[aria-pressed="true"] {
          background: linear-gradient(180deg,#0d6efd,#0b5ed7);
          color: white;
          border-color: transparent;
          box-shadow: 0 8px 20px rgba(13,110,253,0.12);
        }
        .pill:focus { outline: 3px solid rgba(13,110,253,0.12); outline-offset:2px; }
        .panel-actions { display:flex; gap:8px; align-items:center; }
        .toggle-btn {
          padding:8px 10px;
          border-radius:8px;
          border:1px solid #ced4da;
          background:white;
          cursor:pointer;
        }
        .toggle-btn:hover { background:#f1f3f5; }
        .letters-pool { min-height: 80px; margin-bottom:12px; background:#fff; border-radius:8px; padding:10px; border:1px solid #e9ecef; }
        .letter-tile {
          width:54px; height:54px; display:flex; align-items:center; justify-content:center;
          border-radius:8px; border:2px solid #6c757d; background:#fff; font-size:22px; font-weight:700;
          user-select:none; margin:6px; cursor:grab;
          touch-action: none;
        }
        .letter-tile.placed { opacity:0.35; cursor:default; }
        .letter-tile.selected { border-color:#0d6efd; box-shadow:0 0 0 4px rgba(13,110,253,0.08); }
        .letters-row { display:flex; flex-wrap:wrap; align-items:center; }
        .card-target { min-height:120px; display:flex; align-items:center; justify-content:center; position:relative; border-radius:12px; padding:10px; transition:border-color .25s, box-shadow .25s; background:#fff; border:2px dashed transparent; }
        .card-target .inner-card { border-radius:10px; padding:8px; text-align:center; width:100%; }
        .card-target img { max-width:100%; height:80px; object-fit:contain; }
        .card-target .word { margin-top:6px; font-weight:800; font-size:20px; direction: rtl; }
        .card-target.matched { border:2px solid #28a745 !important; box-shadow:0 6px 18px rgba(40,167,69,0.08); }
        .placed-letter-badge { position:absolute; top:6px; left:6px; background:#28a745; color:white; padding:6px 8px; border-radius:8px; font-weight:700; box-shadow:0 2px 6px rgba(0,0,0,0.12); }
        .shake { animation: shakeAnim .6s; }
        @keyframes shakeAnim { 0%{transform:translateX(0);}20%{transform:translateX(-8px);}40%{transform:translateX(8px);}60%{transform:translateX(-6px);}80%{transform:translateX(6px);}100%{transform:translateX(0);} }
        .drag-clone { opacity:0.95; transform: translateZ(0); border-radius:8px; box-shadow:0 8px 24px rgba(0,0,0,0.18); }
        @media (max-width:767px) {
          .letter-tile{width:48px;height:48px;font-size:20px;}
          .card-target img{height:64px;}
          .dataset-pills { gap:6px; }
        }
      `}</style>

      <div className="panel-row">
        <div className="title-row">
          <h5 style={{ margin: 0 }}>کاربرگ الفبا — تطبیق حرف به تصویر</h5>
          <div style={{ color: "#6c757d", fontSize: 13, marginInlineStart: 8 }}>{selectedSet.title}</div>
        </div>

        <div className="panel-actions">
          <button className="toggle-btn" onClick={() => setPanelOpen((p) => !p)} aria-expanded={panelOpen}>
            {panelOpen ? "پنهان‌کردن فهرست" : "نمایش فهرست"}
          </button>
          <button className="toggle-btn" onClick={()=>{setShowName(!showName)}} title="اسمامی تصاویر">اسامی</button>
          <button className="toggle-btn" onClick={resetAll} title="ریست بازی">ریست</button>
        </div>
      </div>

      <div className={`dataset-panel ${panelOpen ? "" : "collapsed"}`} aria-hidden={!panelOpen}>
        <div className="dataset-pills" role="tablist" aria-label="انتخاب مجموعه ها">
          {dataSets.map((s, idx) => {
            const active = s.id === selectedSetId;
            return (
              <button
                key={s.id}
                className="pill"
                role="tab"
                aria-selected={active}
                aria-pressed={active}
                tabIndex={0}
                onClick={() => setSelectedSetId(s.id)}
                onKeyDown={(e) => handleDatasetKeyDown(e, idx)}
                title={`انتخاب مجموعه ${s.title}`}
              >
                {s.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="letters-pool mb-3">
        <div className="letters-row d-flex" style={{ padding: 6 }}>
          {letters.map((lt) => (
            <div
              key={lt.id}
              id={lt.id}
              className={
                "letter-tile d-inline-flex align-items-center justify-content-center " +
                (lt.placed ? "placed" : "") +
                (selectedLetterId === lt.id ? " selected" : "")
              }
              draggable={!lt.placed}
              onDragStart={(e) => handleDragStart(e, lt.id)}
              onDragEnd={handleDragEnd}
              onClick={() => { if (!lt.placed) setSelectedLetterId((p) => (p === lt.id ? null : lt.id)); }}
              role="button"
              aria-pressed={selectedLetterId === lt.id}
              title={lt.placed ? "این حرف قرار گرفته" : "حرف را انتخاب/بکش"}
            >
              {lt.letter}
            </div>
          ))}
        </div>
      </div>

      <div className="row g-3" style={{ marginBottom: 12 }}>
        {cards.map((card) => (
          <div key={card.id} className="col-6 col-md-3">
            <div
              className={"card-target p-2 bg-white " + (card.matched ? "matched" : "")}
              data-card-id={card.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropOnCard(e, card.id)}
              onClick={() => { if (selectedLetterId) { tryPlaceLetter(selectedLetterId, card.id); setSelectedLetterId(null); } }}
              onKeyDown={(e) => { if (e.key === "Enter" && selectedLetterId) { tryPlaceLetter(selectedLetterId, card.id); setSelectedLetterId(null); } }}
              tabIndex={0}
              aria-label={`تصویر ${card.word} ، مقصد برای قرار دادن حرف`}
            >
              <div className="inner-card">
                <img src={card.image} alt={card.word} draggable={false} />
                {showName && 
                <div className="word ">{card.word}</div>   
                }
              </div>
              {card.matched && <div className="placed-letter-badge" aria-hidden>{card.matchedLetter}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-muted small">
        راهنما: می‌توانید با ضربه یا کلیک روی حرف آن را انتخاب کنید و سپس روی تصویر ضربه بزنید، یا حرف را بکشید و روی تصویر رها کنید.
      </div>
    </div>
  );
}
