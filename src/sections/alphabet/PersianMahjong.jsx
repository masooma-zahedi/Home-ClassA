
import React, { useEffect, useMemo, useState } from "react";

// const DEFAULT_WORDS = `مادر | Mother 
// پدر | Father
// خواهر | Sister
// برادر | Brother
// خانه | House
// مدرسه | School
// کتاب | Book
// مداد | Pencil
// دفتر | Notebook
// معلم | Teacher
// دانش‌آموز | Student
// دوست | Friend
// آب | Water
// نان | Bread
// سیب | Apple
// درخت | Tree
// گل | Flower
// گربه | Cat
// سگ | Dog
// پرنده | Bird
// ماهی | Fish
// خورشید | Sun
// ماه | Moon
// ستاره | Star
// دریا | Sea
// باران | Rain
// ماشین | Car
// اتوبوس | Bus
// میز | Table
// صندلی | Chair
// `;

// داستان امیر و فروشگاه
const DEFAULT_WORDS = `فروشگاه | Store
میوه | Fruit
نان | Bread
خوراکی | Food / Snack
قفسه | Shelf
تماشا کردن | To watch / Look at
برگشتن | To return
کُم شدن | To decrease
قلب | Heart
تند زدن | To beat fast
اَشک | Tear
کمک خواستن | To ask for help
کنار | Beside / Next to
ایستادن | To stand
کارمند | Employee
بلندگو | Loudspeaker
اعلام کردن | To announce
بخش اطلاعات | Information Desk
منتظر | Waiting
آغوش | Hug / Embrace
بزرگ | Big
مسئول | Person in charge
همانجا | Right there
`;
// داستان قهر کوچک
// const DEFAULT_WORDS = `قَهر | Being upset / Quarrel
// کُوچَک | Small / Little
// خانه | House / Home
// بازی کَردَن | To play
// عَروسَک | Doll
// قَشَنگ | Pretty / Beautiful
// می‌توانَم | Can I?
// مالِ مَن | Mine
// نِمی‌دَهَم | I won't give
// ناراحَت | Upset
// کِنار | Beside / Next to
// نِشَستَن | To sit
// دِلَش گِرِفت | Felt sad
// کَمی بَعد | A little later
// نِگاه کَردَن | To look
// بیا | Come
// با هَم | Together
// بازی کُنیم | Let's play
// لَبخَند زَدَن | To smile
// باشِه | Okay
// هَر دو | Both
// `;

const RELATED_WORDS = `مدرسه | دانش‌آموز
کتاب | خواندن
مداد | نوشتن
معلم | آموزش
تخت | خواب
قاشق | غذا
کلید | قفل
باران | چتر
خورشید | نور
ماه | شب
ماهی | آب
پرنده | پرواز
گل | باغ
درخت | برگ
نان | نانوایی
پزشک | بیمارستان
آشپز | آشپزخانه
کفش | پا
دستکش | دست
عینک | چشم
`;

const parseWords = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((s) => s.trim());
      return {
        first: parts[0],
        second: parts.slice(1).join(" | "),
      };
    })
    .filter((item) => item.first && item.second);

function shuffleArray(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function createBoard(pairs, mode, columns) {
  const tiles = pairs.flatMap((pair, index) => {
    const firstTile = {
      id: `p${index}-a`,
      pairId: index,
      text: pair.first,
    };

    const secondTile = {
      id: `p${index}-b`,
      pairId: index,
      text: mode === "same" ? pair.first : pair.second,
    };

    return [firstTile, secondTile];
  });

  return shuffleArray(tiles).map((tile, index) => ({
    ...tile,
    x: index % columns,
    y: Math.floor(index / columns),
  }));
}

function isFree(tile, board) {
  return tile.isFree === true;
}
function findHint(board) {
  const freeTiles = board.filter((tile) => isFree(tile, board));

  for (let i = 0; i < freeTiles.length; i++) {
    for (let j = i + 1; j < freeTiles.length; j++) {
      if (freeTiles[i].pairId === freeTiles[j].pairId) {
        return [freeTiles[i].id, freeTiles[j].id];
      }
    }
  }

  return [];
}


function hasFreePair(board) {
  return findHint(board).length === 2;
}

function isLastRow(board) {
  if (board.length === 0) return false;

  const rows = [...new Set(board.map((tile) => tile.y))];
  return rows.length === 1;
}






function ensurePlayableBoard(board, columns) {
  if (board.length === 0) return [];

  // دو کاشی آخر باید هر دو آزاد باشند.
  if (board.length === 2) {
    return board.map((tile, index) => ({
      ...tile,
      x: columns - 1 - index,
      y: 0,
      isFree: true,
    }));
  }

  const groups = new Map();

  board.forEach((tile) => {
    if (!groups.has(tile.pairId)) {
      groups.set(tile.pairId, []);
    }
    groups.get(tile.pairId).push(tile);
  });

  const pairs = [...groups.values()].filter(
    (group) => group.length === 2
  );

  // اگر ساختار جفت‌ها معتبر نیست، چیدمان امن انجام بده.
  if (pairs.length * 2 !== board.length || pairs.length < 2) {
    return board.map((tile, index) => ({
      ...tile,
      x: columns - 1 - (index % columns),
      y: Math.floor(index / columns),
      isFree: false,
    }));
  }

  // یک جفت کامل را آزاد می‌کنیم.
  const freeIds = new Set([
    pairs[0][0].id,
    pairs[0][1].id,
  ]);

  // از هر جفت دیگر یک کاشی آزاد می‌شود.
  pairs.slice(1).forEach((pair) => {
    freeIds.add(pair[0].id);
  });

  // تمام کاشی‌ها در ردیف‌های کامل، از راست به چپ چیده می‌شوند.
  return board.map((tile, index) => ({
    ...tile,
    x: columns - 1 - (index % columns),
    y: Math.floor(index / columns),
    isFree: freeIds.has(tile.id),
  }));
}






export default function PersianMahjong() {
  const [showTeacherSettings, setShowTeacherSettings] = useState(true);
  const [mode, setMode] = useState("translation");
  const [difficulty, setDifficulty] = useState("medium");
  const [pairCount, setPairCount] = useState(22);
  const [wordText, setWordText] = useState(DEFAULT_WORDS);
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState(null);
  const [hint, setHint] = useState([]);
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState(
    "دو کاشی آزاد و هم‌معنی را انتخاب کن."
  );
  const [started, setStarted] = useState(true);
  const [won, setWon] = useState(false);
  const [error, setError] = useState("");

  const words = useMemo(
    () => parseWords(mode === "related" ? RELATED_WORDS : wordText),
    [mode, wordText]
  );

  const columns =
    difficulty === "easy" ? 6 : difficulty === "hard" ? 10 : 8;

  const remainingPairs = board.length / 2;

  useEffect(() => {
    if (!started || won) return;

    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, won]);

  const formatTime = (value) => {
    const min = Math.floor(value / 60);
    const sec = value % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const startGame = () => {
    const count = Number(pairCount);

    if (!Number.isInteger(count) || count < 2 || count > 100) {
      setError("تعداد جفت‌ها باید بین ۲ تا ۱۰۰ باشد.");
      return;
    }

    if (words.length < count) {
      setError(
        `برای این بازی ${count} جفت لازم است، اما فقط ${words.length} جفت واژه داری. واژه‌های بیشتری اضافه کن.`
      );
      return;
    }

    const selectedPairs = shuffleArray(words).slice(0, count);

    setBoard(
    ensurePlayableBoard(
    createBoard(selectedPairs, mode, columns),
    columns
    )
    );
    setSelected(null);
    setHint([]);
    setHistory([]);
    setScore(0);
    setMoves(0);
    setMatches(0);
    setSeconds(0);
    setWon(false);
    setStarted(true);
    setError("");
    setMessage("دو کاشی آزاد و هم‌معنی را انتخاب کن.");
  };

const selectTile = (tile) => {
  if (won) return;

  if (!isFree(tile, board)) {
    setMessage("این کاشی مسدود است؛ کاشی دیگری انتخاب کن.");
    return;
  }

  setHint([]);

  if (selected === tile.id) {
    setSelected(null);
    setMessage("کاشی دیگری انتخاب کن.");
    return;
  }

  if (selected === null) {
    setSelected(tile.id);
    setMessage("حالا جفت این کلمه را پیدا کن.");
    return;
  }

  const first = board.find((t) => t.id === selected);

  if (!first) {
    setSelected(tile.id);
    return;
  }

  setMoves((n) => n + 1);

  if (first.pairId !== tile.pairId) {
    setSelected(tile.id);
    setMessage("این دو کلمه با هم جور نیستند. دوباره تلاش کن.");
    return;
  }

  // ذخیره وضعیت قبلی فقط یک بار
  setHistory((old) => [
    ...old,
    {
      board: [...board],
      score,
      moves,
      matches,
      selected: null,
    },
  ]);

  const remaining = board.filter(
    (t) => t.id !== first.id && t.id !== tile.id
  );

  const nextBoard = ensurePlayableBoard(remaining, columns);

  setBoard(nextBoard);
  setSelected(null);
  setHint([]);
  setScore((s) => s + 10);
  setMatches((m) => m + 1);

  if (nextBoard.length === 0) {
    setWon(true);
    setMessage("آفرین! همه جفت‌ها را پیدا کردی!");
  } else if (nextBoard.length === 2) {
    setMessage("فقط دو کاشی باقی مانده است. جفت آخر را پیدا کن!");
  } else if (!hasFreePair(nextBoard)) {
    setMessage("هیچ جفت آزادی نیست. Shuffle را امتحان کن.");
  } else {
    setMessage(
      `آفرین! ${nextBoard.length / 2 + 1} گزینه آزاد برای بررسی داری.`
    );
  }
};

  const showHint = () => {
    const pair = findHint(board);

    setSelected(null);
    setHint(pair);

    setMessage(
      pair.length
        ? "به کاشی‌های سبزرنگ نگاه کن."
        : "جفت آزادی وجود ندارد. Shuffle را امتحان کن."
    );
  };

  const undo = () => {
    if (!history.length) return;

    const previous = history[history.length - 1];

    setBoard(previous.board);
    setScore(previous.score);
    setMoves(previous.moves);
    setMatches(previous.matches);
    setHistory((old) => old.slice(0, -1));
    setSelected(null);
    setHint([]);
    setWon(false);
    setMessage("آخرین جفت برگردانده شد.");
  };

  const shuffleBoard = () => {
    if (!started || won || board.length === 0) return;

    setBoard(ensurePlayableBoard(board, columns));

    setSelected(null);
    setHint([]);
    setMessage("کاشی‌ها جابه‌جا شدند. جفت جدیدی پیدا کن.");
  };

  return (
    <div className="pm-game" dir="rtl">
      <style>{`
        .pm-game {
          max-width: 900px;
          margin: 0 auto;
          padding: 18px;
          border-radius: 24px;
          background: linear-gradient(145deg,#f7f9e9,#e3efd3);
          color: #244d3b;
          font-family: Tahoma, Arial, sans-serif;
          box-sizing: border-box;
        }

        .pm-game * { box-sizing: border-box; }

        .pm-title {
          text-align: center;
          margin-bottom: 20px;
        }

        .pm-title h2 {
          margin: 0 0 8px;
          font-size: clamp(25px,5vw,36px);
          color: #176447;
        }

        .pm-title p {
          margin: 0;
          color: #6a816d;
          font-size: 14px;
        }

        .pm-panel {
          padding: 16px;
          background: #ffffffc9;
          border: 1px solid #dce8d1;
          border-radius: 16px;
          margin-bottom: 16px;
        }

        .pm-settings {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 14px;
        }

        .pm-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
          min-width: 0;
        }

        .pm-field label {
          font-size: 13px;
          font-weight: bold;
        }

        .pm-field input,
        .pm-field select,
        .pm-field textarea {
          width: 100%;
          min-width: 0;
          border: 1px solid #cadcc2;
          border-radius: 9px;
          background: white;
          color: #244d3b;
          padding: 10px;
          font: inherit;
        }

        .pm-field textarea {
          resize: vertical;
          line-height: 1.9;
          direction: rtl;
        }

        .pm-help {
          font-size: 12px;
          color: #6c806c;
          line-height: 1.8;
        }

        .pm-button {
          border: none;
          border-radius: 10px;
          padding: 11px 14px;
          background: #176447;
          color: white;
          font: inherit;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;
          transition: transform .15s,filter .15s;
        }

        .pm-button:hover { filter: brightness(1.08); }
        .pm-button:active { transform: scale(.97); }

        .pm-button.light {
          color: #28583f;
          background: #e8f1df;
          border: 1px solid #d4e3c9;
        }

        .pm-button:disabled {
          opacity: .45;
          cursor: not-allowed;
        }

        .pm-start {
          width: 100%;
          margin-top: 14px;
          padding: 13px;
        }

        .pm-error {
          margin-top: 12px;
          color: #a52d2d;
          font-size: 13px;
          line-height: 1.8;
        }

        .pm-stats {
          display: grid;
          grid-template-columns: repeat(4,minmax(0,1fr));
          gap: 8px;
          margin-bottom: 14px;
        }

        .pm-stat {
          text-align: center;
          padding: 12px 4px;
          border-radius: 12px;
          background: #ffffffcf;
          border: 1px solid #dce8d1;
        }

        .pm-stat strong {
          display: block;
          font-size: 21px;
          color: #176447;
          direction: ltr;
        }

        .pm-stat span {
          font-size: 11px;
          color: #708471;
        }

        .pm-board-wrap {
          padding: 12px;
          border: 4px solid #b2c99b;
          border-radius: 17px;
          background: linear-gradient(145deg,#d3e4b8,#bdd3a1);
          overflow-x: auto;
        }


.pm-board {
  display: grid;
  grid-template-columns: repeat(var(--pm-cols), minmax(0, 1fr));
  grid-auto-rows: minmax(76px, auto);
  gap: 7px;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;
}


        .pm-tile {
          min-width: 0;
          box-sizing: border-box;
          min-height: 54px;
          padding: 5px 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          overflow-wrap: anywhere;
          word-break: normal;
          line-height: 1.6;
          font-family: Tahoma,Arial,sans-serif;
          font-size: clamp(11px,2vw,19px);
          font-weight: bold;
          border: 1px solid #e5e3cf;
          border-bottom: 4px solid #b9b8a1;
          border-radius: 8px;
          background: linear-gradient(145deg,#fffef8,#f0eedc);
          color: #28664b;
          box-shadow: 0 2px 3px #56744a25;
          cursor: pointer;
          transition: transform .15s,background .15s;
        }

        .pm-tile.free:hover {
          transform: translateY(-3px);
        }

        .pm-tile.blocked {
          color: #85947b;
          background: linear-gradient(145deg,#c8d3b9,#b7c6a6);
          border-color: #b8c6a8;
          border-bottom-color: #a7b598;
          cursor: not-allowed;
          opacity: .78;
        }

        .pm-tile.selected {
          background: #fff0a3;
          border: 2px solid #dda92c;
          border-bottom-width: 4px;
          transform: translateY(-4px);
        }

        .pm-tile.hinted {
          outline: 3px solid #32945c;
          outline-offset: -3px;
          animation: pm-pulse .65s ease-in-out infinite alternate;
        }

        @keyframes pm-pulse {
          from { background: #fffef8; }
          to { background: #c6f0c5; }
        }

        .pm-message {
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 12px 4px;
          font-size: 14px;
          font-weight: bold;
          line-height: 1.8;
        }

        .pm-actions {
          display: grid;
          grid-template-columns: repeat(4,minmax(0,1fr));
          gap: 7px;
        }

        .pm-win {
          text-align: center;
          margin-top: 16px;
          padding: 18px;
          background: #fffef5;
          border-radius: 15px;
        }

        @media(max-width:520px) {
          .pm-game { padding: 10px; border-radius: 16px; }
          .pm-settings { grid-template-columns: 1fr; }
          .pm-stats { gap: 5px; }
          .pm-stat { padding: 9px 2px; }
          .pm-stat strong { font-size: 17px; }
          .pm-stat span { font-size: 10px; }
          .pm-board-wrap { padding: 6px; border-width: 3px; }
          .pm-board { gap: 4px; }
          .pm-tile { min-height: 47px; padding: 3px 1px; }
          .pm-actions { grid-template-columns: repeat(2,minmax(0,1fr)); }
        }
      `}</style>

      <header className="pm-title">
        <h2
          onClick={() => setShowTeacherSettings(!showTeacherSettings)}
          style={{ cursor: "pointer" }}
        >
          واژه‌یاب فارسی
        </h2>        
        <p>بخوان، پیدا کن و جفت‌ها را کامل کن!</p>
      </header>

      {showTeacherSettings && (
        <section className="pm-panel">
          <div className="teacher-settings">
            {/* کد فعلی تنظیمات معلم را اینجا قرار بده */}
                    {/* <h3 style={{ marginTop: 0 }}>تنظیمات معلم</h3>

                <div className="pm-settings">
                  <div className="pm-field">
                    <label htmlFor="pm-mode">نوع تطبیق</label>
                    <select
                      id="pm-mode"
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <option value="translation">فارسی با انگلیسی</option>
                      <option value="same">کلمه‌های یکسان فارسی</option>
                      <option value="related">کلمه‌های مرتبط</option>
                    </select>
                  </div>

                  <div className="pm-field">
                    <label htmlFor="pm-count">تعداد جفت‌ها (۲ تا ۱۰۰)</label>
                    <input
                      id="pm-count"
                      type="number"
                      min="2"
                      max="100"
                      step="1"
                      value={pairCount}
                      onChange={(e) => {
                        setPairCount(e.target.value);
                        setError("");
                      }}
                    />
                  </div>

                  <div className="pm-field">
                    <label htmlFor="pm-difficulty">سطح دشواری</label>
                    <select
                      id="pm-difficulty"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      <option value="easy">آسان — ۶ ستون</option>
                      <option value="medium">متوسط — ۸ ستون</option>
                      <option value="hard">دشوار — ۱۰ ستون</option>
                    </select>
                  </div>

                  {mode !== "related" && (
                    <div className="pm-field">
                      <label htmlFor="pm-words">فهرست واژگان</label>
                      <textarea
                        id="pm-words"
                        rows={7}
                        value={wordText}
                        onChange={(e) => {
                          setWordText(e.target.value);
                          setError("");
                        }}
                        spellCheck={false}
                      />
                      <div className="pm-help">
                        هر خط یک جفت واژه باشد. بین دو واژه علامت | بگذار.
                        <br />
                        مثال: مادر | Mother
                        <br />
                        برای حالت فارسی یکسان، فقط واژه فارسی سمت چپ نمایش داده می‌شود.
                      </div>
                    </div>
                  )}

                  {mode === "related" && (
                    <div className="pm-field">
                      <label>واژگان مرتبط آماده</label>
                      <div className="pm-help">
                        این حالت از فهرست آماده واژه‌های مرتبط استفاده می‌کند؛ مانند
                        «مداد» و «نوشتن». برای افزودن جفت‌های مرتبط دلخواه، آن‌ها را
                        ابتدا به فهرست بالا در حالت فارسی–انگلیسی اضافه کن و سپس
                        حالت مناسب را انتخاب کن.
                      </div>
                    </div>
                  )}
                </div>

                <div className="pm-help" style={{ marginTop: 12 }}>
                  تعداد جفت‌های موجود: {words.length} · تعداد کاشی‌های بازی:{" "}
                  {Number.isInteger(Number(pairCount)) &&
                  Number(pairCount) >= 2 &&
                  Number(pairCount) <= words.length
                    ? Number(pairCount) * 2
                    : "—"}
                </div>
 */}
                <button className="pm-button pm-start" onClick={startGame}>
                  🎮 شروع بازی جدید
                </button>

                {error && <div className="pm-error" role="alert">{error}</div>}

          </div>
        </section>
      )}

      {started && (
        <>
          <section className="pm-stats">
            <div className="pm-stat">
              <strong>{formatTime(seconds)}</strong>
              <span>زمان</span>
            </div>
            <div className="pm-stat">
              <strong>{score}</strong>
              <span>امتیاز</span>
            </div>
            <div className="pm-stat">
              <strong>{moves}</strong>
              <span>حرکت</span>
            </div>
            <div className="pm-stat">
              <strong>{remainingPairs}</strong>
              <span>جفت باقی‌مانده</span>
            </div>
          </section>

          <section className="pm-board-wrap">
            <div
              className="pm-board"
              style={{ "--pm-cols": columns }}
            >
              {board.map((tile) => {
                const free = isFree(tile, board);

                return (
                  <button
                    key={tile.id}
                    type="button"
                    className={[
                      "pm-tile",
                      free ? "free" : "blocked",
                      selected === tile.id ? "selected" : "",
                      hint.includes(tile.id) ? "hinted" : "",
                    ].join(" ")}
                    onClick={() => selectTile(tile)}
                    aria-disabled={!free}
                    aria-label={`${tile.text}${free ? "، آزاد" : "، مسدود"}`}
                    title={free ? "کاشی آزاد" : "کاشی مسدود"}
                    style={{
                              gridColumn: tile.x + 1,
                            gridRow: tile.y + 1,
                          }}
                  >
                    {tile.text}
                  </button>
                );
              })}
            </div>
          </section>

          <div className="pm-message" role="status" aria-live="polite">
            {message}
          </div>

          <div className="pm-actions">
            <button
              className="pm-button"
              onClick={showHint}
              disabled={won}
            >
              💡 راهنمایی
            </button>
            <button
              className="pm-button light"
              onClick={undo}
              disabled={!history.length}
            >
              ↩ برگشت
            </button>
            <button
              className="pm-button light"
              onClick={shuffleBoard}
              disabled={won || !board.length}
            >
              🔀 جابه‌جایی
            </button>
            <button className="pm-button" onClick={startGame}>
              ↻ بازی جدید
            </button>
          </div>

          {won && (
            <div className="pm-win">
              <div style={{ fontSize: 42 }}>🏆</div>
              <h3>آفرین! تمام جفت‌ها را پیدا کردی.</h3>
              <p>
                امتیاز: {score} · زمان: {formatTime(seconds)}
              </p>
              <button className="pm-button" onClick={startGame}>
                دوباره بازی کن
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
