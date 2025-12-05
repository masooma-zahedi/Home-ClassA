import React, { useEffect, useRef, useState } from "react";

/**
 * ColoringCanvasFull
 *
 * Props:
 *  - imageSrc: string (required) — مسیر عکس سیاه‌خط (outline)
 *  - width, height: number (px) — اندازه canvas
 *  - colors: array of hex strings
 */
const ColoringCanvasFull = ({
  imageSrc,
  width = 600,
  height = 800,
  colors = ["#ff3b30", "#ff9500", "#ffcc00", "#34c759", "#007aff", "#5856d6", "#ff2d55"],
}) => {
  const imageRef = useRef(null);
  const imageCanvasRef = useRef(null); // برای خطوط (لِیِر مرزی)
  const paintCanvasRef = useRef(null); // برای رنگ‌ها
  const ctxImage = useRef(null);
  const ctxPaint = useRef(null);

  const [tool, setTool] = useState("brush"); // "brush" | "eraser" | "bucket"
  const [color, setColor] = useState(colors[0]);
  const [brushSize, setBrushSize] = useState(13);

  const [isDrawing, setIsDrawing] = useState(false);

  // history for undo/redo (store dataURL of paint layer)
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Load image into image layer and init paint layer
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    imageRef.current = img;

    const imageCanvas = imageCanvasRef.current;
    const paintCanvas = paintCanvasRef.current;

    // set sizes & contexts
    imageCanvas.width = width;
    imageCanvas.height = height;
    paintCanvas.width = width;
    paintCanvas.height = height;

    ctxImage.current = imageCanvas.getContext("2d");
    ctxPaint.current = paintCanvas.getContext("2d");

    // ensure paint layer is cleared initially (transparent)
    ctxPaint.current.clearRect(0, 0, width, height);

    img.onload = () => {
      // draw image (scaled to canvas size)
      ctxImage.current.clearRect(0, 0, width, height);
      ctxImage.current.drawImage(img, 0, 0, width, height);

      // save initial empty paint state to history
      saveState();
    };
  }, [imageSrc, width, height]);

  // ---------- Utilities ----------
  const getPointerPos = (e) => {
    const canvas = paintCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const isTouch = e.touches && e.touches.length;
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    const x = Math.floor(clientX - rect.left);
    const y = Math.floor(clientY - rect.top);
    // clamp
    return {
      x: Math.max(0, Math.min(canvas.width - 1, x)),
      y: Math.max(0, Math.min(canvas.height - 1, y)),
    };
  };

  const hexToRgb = (hex) => {
    const p = hex.replace("#", "");
    const bigint = parseInt(p, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const colorsMatch = (data, idx, r, g, b, tolerance = 10) => {
    return (
      Math.abs(data[idx] - r) <= tolerance &&
      Math.abs(data[idx + 1] - g) <= tolerance &&
      Math.abs(data[idx + 2] - b) <= tolerance
    );
  };

  // check if a pixel on the image (outline) is "dark" => treat as boundary
  const isBoundaryPixel = (imgData, x, y, w, darknessThreshold = 100) => {
    const i = (y * w + x) * 4;
    // treat pixel as boundary if it's dark (near black) or has alpha
    const r = imgData[i], g = imgData[i + 1], b = imgData[i + 2];
    const brightness = (r + g + b) / 3;
    // if brightness is small (dark line) => boundary
    return brightness < darknessThreshold;
  };

  // ---------- History (undo/redo) ----------
  const saveState = () => {
    const data = paintCanvasRef.current.toDataURL();
    setHistory((h) => {
      const next = [...h, data];
      // limit history length to avoid memory bloat (optional)
      if (next.length > 50) next.shift();
      return next;
    });
    setRedoStack([]); // clear redo on new action
  };

  const undo = () => {
    if (history.length <= 1) return;
    setHistory((h) => {
      const copy = [...h];
      const last = copy.pop();
      setRedoStack((r) => [...r, last]);
      // restore from the new last
      const prev = copy[copy.length - 1];
      restorePaintFromDataURL(prev);
      return copy;
    });
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const copy = [...redoStack];
    const next = copy.pop();
    setRedoStack(copy);
    setHistory((h) => {
      const nh = [...h, next];
      restorePaintFromDataURL(next);
      return nh;
    });
  };

  const restorePaintFromDataURL = (dataURL) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = dataURL;
    img.onload = () => {
      ctxPaint.current.clearRect(0, 0, width, height);
      ctxPaint.current.drawImage(img, 0, 0);
    };
  };

  // ---------- Brush / Eraser drawing ----------
  const handlePointerDown = (e) => {
    e.preventDefault();
    const { x, y } = getPointerPos(e);

    if (tool === "bucket") {
      // bucket fill
      floodFillAt(x, y, color);
      saveState();
      return;
    }

    setIsDrawing(true);
    ctxPaint.current.lineWidth = brushSize;
    ctxPaint.current.lineCap = "round";

    if (tool === "eraser") {
      // erase only paint layer
      ctxPaint.current.globalCompositeOperation = "destination-out";
      ctxPaint.current.strokeStyle = "rgba(0,0,0,1)";
    } else {
      ctxPaint.current.globalCompositeOperation = "source-over";
      ctxPaint.current.strokeStyle = color;
    }

    ctxPaint.current.beginPath();
    ctxPaint.current.moveTo(x + 0.5, y + 0.5);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getPointerPos(e);

    ctxPaint.current.lineTo(x + 0.5, y + 0.5);
    ctxPaint.current.stroke();
  };

  const handlePointerUp = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    ctxPaint.current.closePath();
    // restore compositing to default
    ctxPaint.current.globalCompositeOperation = "source-over";
    setIsDrawing(false);
    saveState();
  };

  // ---------- Flood fill algorithm (scanline) that respects boundaries from image layer ----------
  const floodFillAt = (startX, startY, fillHex) => {
    const paintCtx = ctxPaint.current;
    const imageCtx = ctxImage.current;
    const w = paintCanvasRef.current.width;
    const h = paintCanvasRef.current.height;

    // Get image data of BOTH layers
    const paintDataObj = paintCtx.getImageData(0, 0, w, h);
    const paintData = paintDataObj.data;

    const imageDataObj = imageCtx.getImageData(0, 0, w, h);
    const imageData = imageDataObj.data;

    const [fr, fg, fb] = hexToRgb(fillHex);

    const startIdx = (startY * w + startX) * 4;
    const sr = paintData[startIdx], sg = paintData[startIdx + 1], sb = paintData[startIdx + 2];
    // If clicked on a boundary (image layer dark) -> do nothing
    if (isBoundaryPixel(imageDataObj.data, startX, startY, w)) return;

    // if start pixel already filled with same color (close enough) -> do nothing
    if (Math.abs(sr - fr) < 8 && Math.abs(sg - fg) < 8 && Math.abs(sb - fb) < 8) return;

    // helper: compare paint pixel to start color
    const matchStartColor = (x, y) => {
      const i = (y * w + x) * 4;
      return (
        paintData[i] === sr &&
        paintData[i + 1] === sg &&
        paintData[i + 2] === sb &&
        paintData[i + 3] === paintData[startIdx + 3]
      );
    };

    // helper: set paint pixel to fill color (opaque)
    const setPaint = (x, y) => {
      const i = (y * w + x) * 4;
      paintData[i] = fr;
      paintData[i + 1] = fg;
      paintData[i + 2] = fb;
      paintData[i + 3] = 255;
    };

    // scanline stack fill
    const stack = [];
    stack.push({ x: startX, y: startY });

    while (stack.length) {
      const { x, y } = stack.pop();

      // move to leftmost of this span
      let xLeft = x;
      while (xLeft >= 0 && matchStartColor(xLeft, y) && !isBoundaryPixel(imageData, xLeft, y, w)) {
        xLeft--;
      }
      xLeft++;

      // move to rightmost
      let xRight = x;
      while (xRight < w && matchStartColor(xRight, y) && !isBoundaryPixel(imageData, xRight, y, w)) {
        xRight++;
      }
      xRight--;

      // color span and check above/below
      for (let xi = xLeft; xi <= xRight; xi++) {
        setPaint(xi, y);

        // above
        if (y > 0) {
          if (
            matchStartColor(xi, y - 1) &&
            !isBoundaryPixel(imageData, xi, y - 1, w)
          ) {
            stack.push({ x: xi, y: y - 1 });
          }
        }
        // below
        if (y < h - 1) {
          if (
            matchStartColor(xi, y + 1) &&
            !isBoundaryPixel(imageData, xi, y + 1, w)
          ) {
            stack.push({ x: xi, y: y + 1 });
          }
        }
      }
    }

    // put data back to paint context
    paintCtx.putImageData(paintDataObj, 0, 0);
  };

  // ---------- Tools: reset, download ----------
  const resetAll = () => {
    ctxPaint.current.clearRect(0, 0, width, height);
    saveState();
  };

  const downloadPNG = () => {
    // combine image layer and paint layer into one temp canvas
    const temp = document.createElement("canvas");
    temp.width = width;
    temp.height = height;
    const tctx = temp.getContext("2d");
    tctx.drawImage(imageCanvasRef.current, 0, 0);
    tctx.drawImage(paintCanvasRef.current, 0, 0);

    const link = document.createElement("a");
    link.download = "coloring.png";
    link.href = temp.toDataURL("image/png");
    link.click();
  };

  // ---------- Event listeners registration (add/remove) ----------
  useEffect(() => {
    const canvas = paintCanvasRef.current;
    // mouse
    canvas.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    // touch
    canvas.addEventListener("touchstart", handlePointerDown, { passive: false });
    window.addEventListener("touchmove", handlePointerMove, { passive: false });
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      canvas.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      canvas.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool, brushSize, color, isDrawing]);

  // ---------- Render ----------
  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
      <div
        style={{
          display: "inline-block",
          position: "relative",
          width: width + "px",
          height: height + "px",
          overflow: "hidden",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          background: "#fff",
        }}
      >
        {/* image layer (lines) */}
        <canvas
          ref={imageCanvasRef}
          style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        />
        {/* paint layer (colors) */}
        <canvas
          ref={paintCanvasRef}
          style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", touchAction: "none" }}
        />
      </div>

      {/* Tools */}
      <div style={{ marginTop: 12, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <div>
          <button className="btn border"
            onClick={() => setTool("brush")}
            style={{ padding: "6px 10px", background: tool === "brush" ? "#222" : "#eee", color: tool === "brush" ? "#fff" : "#000", borderRadius: 6 }}
          >
            🖌 براش
          </button>
          <button className="btn border "
            onClick={() => setTool("eraser")}
            style={{ padding: "6px 10px", marginLeft: 6, background: tool === "eraser" ? "#222" : "#fdc3c3ff", color: tool === "eraser" ? "#fff" : "#000", borderRadius: 6 }}
          >
            🧽 پاک‌کن
          </button>
          {/* <button className="btn border"
            onClick={() => setTool("bucket")}
            style={{ padding: "6px 10px", marginLeft: 6, background: tool === "bucket" ? "#222" : "#eee", color: tool === "bucket" ? "#fff" : "#000", borderRadius: 6 }}
          >
            🪣 پرکن
          </button> */}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label>اندازه براش</label>
          <input
            type="range"
            min="4"
            max="80"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button className="btn border" onClick={undo} style={{ padding: "6px 10px" }}>↩ Undo</button>
          <button className="btn border" onClick={redo} style={{ padding: "6px 10px" }}>↪ Redo</button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button className="btn border" onClick={resetAll} style={{ padding: "6px 10px" }}>🔄 Reset</button>
          <button className="btn border" onClick={downloadPNG} style={{ padding: "6px 10px" }}>⬇ Save</button>
        </div>
      </div>

      {/* Color palette */}
      <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
        {colors.map((c) => (
          <div
            key={c}
            onClick={() => {
              setColor(c);
              setTool("brush");
            }}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: c,
              border: c === color ? "3px solid #111" : "2px solid #ddd",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: 8, color: "#666" }}>
        ابزار: <strong>{tool}</strong> — رنگ فعلی: <span style={{ display: "inline-block", width: 14, height: 14, background: color, verticalAlign: "middle", marginLeft: 6, borderRadius: 3, border: "1px solid #ccc" }} />{" "}
      </div>
    </div>
  );
};

export default ColoringCanvasFull;
