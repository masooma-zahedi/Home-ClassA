import React, { useEffect, useRef, useState } from "react";

const ColoringCanvasFull = ({
imageSrc,
width = 600,
height = 800,
colors = ["#ff3b30", "#ff9500", "#ffcc00", "#34c759", "#007aff", "#5856d6", "#ff2d55"],
}) => {
const imageCanvasRef = useRef(null);
const paintCanvasRef = useRef(null);
const ctxImage = useRef(null);
const ctxPaint = useRef(null);

const [tool, setTool] = useState("brush");
const [color, setColor] = useState(colors[0]);
const [brushSize, setBrushSize] = useState(13);
const [isDrawing, setIsDrawing] = useState(false);

const [history, setHistory] = useState([]);
const [redoStack, setRedoStack] = useState([]);

useEffect(() => {
const img = new Image();
img.crossOrigin = "anonymous";
img.src = imageSrc;


const imageCanvas = imageCanvasRef.current;
const paintCanvas = paintCanvasRef.current;
if (!imageCanvas || !paintCanvas) return;

imageCanvas.width = width;
imageCanvas.height = height;
paintCanvas.width = width;
paintCanvas.height = height;

ctxImage.current = imageCanvas.getContext("2d");
ctxPaint.current = paintCanvas.getContext("2d");
ctxPaint.current.clearRect(0, 0, width, height);

img.onload = () => {
  ctxImage.current.clearRect(0, 0, width, height);
  ctxImage.current.drawImage(img, 0, 0, width, height);

  // سفید به شفاف
  const imgData = ctxImage.current.getImageData(0, 0, width, height);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const r = imgData.data[i], g = imgData.data[i + 1], b = imgData.data[i + 2];
    if (r > 250 && g > 250 && b > 250) imgData.data[i + 3] = 0;
  }
  ctxImage.current.putImageData(imgData, 0, 0);
  saveState();
};


}, [imageSrc, width, height]);

const getPointerPos = (e) => {
const canvas = paintCanvasRef.current;
if (!canvas) return { x: 0, y: 0 };
const rect = canvas.getBoundingClientRect();
const isTouch = e.touches && e.touches.length;
const clientX = isTouch ? e.touches[0].clientX : e.clientX;
const clientY = isTouch ? e.touches[0].clientY : e.clientY;
const scaleX = canvas.width / rect.width;
const scaleY = canvas.height / rect.height;
const x = Math.floor((clientX - rect.left) * scaleX);
const y = Math.floor((clientY - rect.top) * scaleY);
return { x: Math.max(0, Math.min(canvas.width - 1, x)), y: Math.max(0, Math.min(canvas.height - 1, y)) };
};

const saveState = () => {
if (!paintCanvasRef.current) return;
const data = paintCanvasRef.current.toDataURL();
setHistory((h) => {
const next = [...h, data];
if (next.length > 50) next.shift();
return next;
});
setRedoStack([]);
};

const undo = () => { if (history.length <= 1) return; setHistory((h) => { const copy = [...h]; const last = copy.pop(); setRedoStack((r) => [...r, last]); restorePaintFromDataURL(copy[copy.length - 1]); return copy; }); };
const redo = () => { if (redoStack.length === 0) return; const copy = [...redoStack]; const next = copy.pop(); setRedoStack(copy); setHistory((h) => { restorePaintFromDataURL(next); return [...h, next]; }); };
const restorePaintFromDataURL = (dataURL) => { if (!ctxPaint.current) return; const img = new Image(); img.crossOrigin = "anonymous"; img.src = dataURL; img.onload = () => { if (!ctxPaint.current) return; ctxPaint.current.clearRect(0, 0, width, height); ctxPaint.current.drawImage(img, 0, 0); }; };
const handlePointerDown = (e) => { e.preventDefault(); if (!ctxPaint.current) return; const { x, y } = getPointerPos(e); setIsDrawing(true); ctxPaint.current.lineWidth = brushSize; ctxPaint.current.lineCap = "round"; ctxPaint.current.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over"; ctxPaint.current.strokeStyle = tool === "eraser" ? "rgba(0,0,0,1)" : color; ctxPaint.current.beginPath(); ctxPaint.current.moveTo(x + 0.5, y + 0.5); };
const handlePointerMove = (e) => { if (!isDrawing || !ctxPaint.current) return; e.preventDefault(); const { x, y } = getPointerPos(e); ctxPaint.current.lineTo(x + 0.5, y + 0.5); ctxPaint.current.stroke(); };
const handlePointerUp = (e) => { if (!isDrawing || !ctxPaint.current) return; e.preventDefault(); ctxPaint.current.closePath(); ctxPaint.current.globalCompositeOperation = "source-over"; setIsDrawing(false); saveState(); };
const resetAll = () => { if (!ctxPaint.current) return; ctxPaint.current.clearRect(0, 0, width, height); saveState(); };
const downloadPNG = () => { if (!paintCanvasRef.current || !imageCanvasRef.current) return; const temp = document.createElement("canvas"); temp.width = width; temp.height = height; const tctx = temp.getContext("2d"); tctx.drawImage(paintCanvasRef.current, 0, 0); tctx.drawImage(imageCanvasRef.current, 0, 0); const link = document.createElement("a"); link.download = "coloring.png"; link.href = temp.toDataURL("image/png"); link.click(); };

useEffect(() => {
const canvas = paintCanvasRef.current;
if (!canvas) return;
canvas.addEventListener("mousedown", handlePointerDown);
window.addEventListener("mousemove", handlePointerMove);
window.addEventListener("mouseup", handlePointerUp);
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
}, [tool, brushSize, color, isDrawing]);

return (
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%" }}>
<div style={{ position: "relative", width: "100%", maxWidth: width, aspectRatio: `${width} / ${height}`, overflow: "hidden", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.15)", background: "#fff" }}>
<canvas ref={paintCanvasRef} width={width} height={height} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", touchAction: "none", zIndex: 0 }} />
<canvas ref={imageCanvasRef} width={width} height={height} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} /> </div>


  <div style={{ marginTop: 12, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
    <button className="btn border" onClick={() => setTool("brush")} style={{ padding: "6px 10px", background: tool === "brush" ? "#222" : "#eee", color: tool === "brush" ? "#fff" : "#000", borderRadius: 6 }}>🖌 براش</button>
    <button className="btn border" onClick={() => setTool("eraser")} style={{ padding: "6px 10px", background: tool === "eraser" ? "#222" : "#fdc3c3ff", color: tool === "eraser" ? "#fff" : "#000", borderRadius: 6 }}>🧽 پاک‌کن</button>
    <button className="btn border" onClick={resetAll} style={{ padding: "6px 10px" }}>🔄 Reset</button>
    <button className="btn border" onClick={undo} style={{ padding: "6px 10px" }}>↩ Undo</button>
    <button className="btn border" onClick={redo} style={{ padding: "6px 10px" }}>↪ Redo</button>
    <button className="btn border" onClick={downloadPNG} style={{ padding: "6px 10px" }}>⬇ Save</button>
  </div>

  <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
    {colors.map((c) => (
      <div key={c} onClick={() => { setColor(c); setTool("brush"); }} style={{ width: 34, height: 34, borderRadius: "50%", background: c, border: c === color ? "3px solid #111" : "2px solid #ddd", cursor: "pointer" }} />
    ))}
  </div>
</div>


);
};

export default ColoringCanvasFull;
