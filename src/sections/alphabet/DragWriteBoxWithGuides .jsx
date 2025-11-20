import React, { useRef, useEffect, useState } from "react";

/**
 * Props:
 *  - width, height: logical canvas size in px
 *  - showGuides: boolean (initially show lines)
 *  - downloadName: filename for download (default: "writing.png")
 */
const DragWriteBoxWithGuides = ({
  width = 480,
  height = 300,
  showGuides = true,
  downloadName = "writing.png",
}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [guidesOn, setGuidesOn] = useState(showGuides);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(4);

  // scale for high DPI (Retina)
  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    // initial clear + draw guides
    clearCanvas();
    if (guidesOn) drawGuides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // whenever stroke settings change, update context
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
  }, [color, lineWidth]);

  const getPosFromEvent = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const start = (e) => {
    // prevent page scroll on touch
    if (e.type === "touchstart") e.preventDefault();
    const pos = getPosFromEvent(e);
    const ctx = ctxRef.current;
    drawingRef.current = true;
    lastPosRef.current = pos;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const move = (e) => {
    if (!drawingRef.current) return;
    if (e.type === "touchmove") e.preventDefault();
    const pos = getPosFromEvent(e);
    const ctx = ctxRef.current;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPosRef.current = pos;
  };

  const stop = (e) => {
    if (drawingRef.current) {
      const ctx = ctxRef.current;
      ctx.closePath();
    }
    drawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx || !canvas) return;
    // clear entire logical size (use style width/height)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // because we scaled context by DPR earlier, clearRect with CSS size also works
    if (guidesOn) drawGuides();
  };

  const drawGuides = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    // Save current drawing settings, then draw guides with faint style
    ctx.save();

    // faint grid background
    const rows = 4; // you can adjust rows for letter practice
    const col = 1;
    const gap = height / rows;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    for (let i = 0; i <= rows; i++) {
      const y = i * gap;
      ctx.beginPath();
      ctx.moveTo(0 + 6, y + 0.5); // small left padding
      ctx.lineTo(width - 6, y + 0.5);
      // dashed effect
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.closePath();
    }

    // main baseline (thicker)
    const baselineY = Math.round((height * 3) / 4); // baseline near bottom
    ctx.setLineDash([]);
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.moveTo(6, baselineY + 0.5);
    ctx.lineTo(width - 6, baselineY + 0.5);
    ctx.stroke();
    ctx.closePath();

    // midline (مثلاً برای قرارگیری حروف)
    const midY = Math.round(height / 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.setLineDash([2, 6]);
    ctx.beginPath();
    ctx.moveTo(6, midY + 0.5);
    ctx.lineTo(width - 6, midY + 0.5);
    ctx.stroke();
    ctx.closePath();

    // restore drawing settings
    ctx.restore();
  };

  const toggleGuides = () => {
    const newVal = !guidesOn;
    setGuidesOn(newVal);
    if (newVal) drawGuides();
    else {
      // removing guides: clear and redraw strokes is hard unless we store strokes.
      // Simple approach: clear everything (user will lose strokes) — to avoid that,
      // we draw guides onto a separate overlay in future; for now we re-draw by
      // taking current pixels and removing overlay isn't trivial.
      // We'll re-create canvas preserving pixels by reading imageData before clearing.
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      const dpr = window.devicePixelRatio || 1;
      // save current image
      const temp = document.createElement("canvas");
      temp.width = canvas.width;
      temp.height = canvas.height;
      const tctx = temp.getContext("2d");
      tctx.drawImage(canvas, 0, 0);
      // clear and draw saved pixels (without guides)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // draw saved
      ctx.drawImage(temp, 0, 0);
    }
  };

  const downloadPNG = () => {
    // create temporary canvas with guides optionally removed (we include what user sees)
    const canvas = canvasRef.current;
    if (!canvas) return;
    // To capture exactly what user sees (including guides), just use toDataURL on canvas
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="drag-write-box" style={{ maxWidth: width }}>
      <div className="d-flex align-items-center mb-2" style={{ gap: 8 }}>
        <div>
          <label className="form-label mb-0 small">رنگ قلم</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="form-control form-control-color"
            title="Choose color"
            style={{ width: 48, height: 36 }}
          />
        </div>

        <div>
          <label className="form-label mb-0 small">ضخامت</label>
          <input
            type="range"
            min="1"
            max="12"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="form-range"
            style={{ width: 140 }}
          />
        </div>

        <div>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              clearCanvas();
              if (guidesOn) drawGuides();
            }}
          >
            پاک کردن
          </button>
        </div>

        <div>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={toggleGuides}
          >
            {guidesOn ? "خاموش کردن خطوط" : "نمایش خطوط"}
          </button>
        </div>

        <div>
          <button className="btn btn-success btn-sm" onClick={downloadPNG}>
            دانلود تصویر
          </button>
        </div>
      </div>

      <div
        style={{
          border: "2px solid #666",
          borderRadius: 8,
          overflow: "hidden",
          background: "white",
          touchAction: "none", // important to prevent double touch scroll
        }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          // attach pointer/mouse/touch handlers
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={stop}
          onMouseLeave={stop}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={stop}
          style={{ display: "block", width: "100%", height: `${height}px` }}
        />
      </div>

      <div className="mt-2 small text-muted">
        راهنما: با انگشت یا موس بنویس. برای استفاده در موبایل، هنگام نوشتن با لمس صفحه اسکرول صفحه قفل می‌شود.
      </div>
    </div>
  );
};

export default DragWriteBoxWithGuides;
