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
  textTitle = "تمرین کنید",
}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [guidesOn, setGuidesOn] = useState(showGuides);
  const [color, setColor] = useState("#578518ff");
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

  // Helper: get position from various event types (pointer, mouse, touch)
  const getPosFromEvent = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    // PointerEvent has clientX/clientY
    if (typeof e.clientX === "number" && typeof e.clientY === "number") {
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    // Touch events
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    // Fallback
    return { x: 0, y: 0 };
  };

  // Use internal functions that expect native events
  const start = (e) => {
    // prevent page scroll / selection
    if (e.cancelable) e.preventDefault();
    const pos = getPosFromEvent(e);
    const ctx = ctxRef.current;
    drawingRef.current = true;
    lastPosRef.current = pos;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    // if pointer event, capture it to keep receiving moves (even if pointer leaves)
    if (e.pointerId && canvasRef.current.setPointerCapture) {
      try {
        canvasRef.current.setPointerCapture(e.pointerId);
      } catch (err) {
        // some browsers may throw if pointer is gone — ignore
      }
    }
  };

  const move = (e) => {
    if (!drawingRef.current) return;
    // For pointermove, prevent default (we already registered with passive:false)
    if (e.cancelable) e.preventDefault();
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

    // release pointer capture
    if (e && e.pointerId && canvasRef.current.releasePointerCapture) {
      try {
        canvasRef.current.releasePointerCapture(e.pointerId);
      } catch (err) {
        // ignore
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx || !canvas) return;
    // clear entire canvas (use full backing-store size)
    ctx.clearRect(0, 0, canvas.width+100, canvas.height+100);
    if (guidesOn) drawGuides();
  };

  const drawGuides = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.save();

    const rows = 4;
    const gap = height / rows;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.setLineDash([4, 6]);
    for (let i = 0; i <= rows; i++) {
      const y = i * gap;
      ctx.beginPath();
      ctx.moveTo(6, y + 0.5);
      ctx.lineTo(width - 6, y + 0.5);
      ctx.stroke();
      ctx.closePath();
    }

    const baselineY = Math.round((height * 3) / 4);
    ctx.setLineDash([]);
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.moveTo(6, baselineY + 0.5);
    ctx.lineTo(width - 6, baselineY + 0.5);
    ctx.stroke();
    ctx.closePath();

    const midY = Math.round(height / 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.setLineDash([2, 6]);
    ctx.beginPath();
    ctx.moveTo(6, midY + 0.5);
    ctx.lineTo(width - 6, midY + 0.5);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  };

  const toggleGuides = () => {
    const newVal = !guidesOn;
    setGuidesOn(newVal);
    if (newVal) drawGuides();
    else {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      // Save current image
      const temp = document.createElement("canvas");
      temp.width = canvas.width;
      temp.height = canvas.height;
      const tctx = temp.getContext("2d");
      tctx.drawImage(canvas, 0, 0);
      // clear and draw saved pixels (without guides)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(temp, 0, 0);
    }
  };

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // —————— Native event listeners (pointer + fallback) ——————
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // pointer events (covers mouse + touch on supporting browsers)
    const onPointerDown = (e) => start(e);
    const onPointerMove = (e) => move(e);
    const onPointerUp = (e) => stop(e);

    // register pointer listeners with passive:false so preventDefault works
    canvas.addEventListener("pointerdown", onPointerDown, { passive: false });
    canvas.addEventListener("pointermove", onPointerMove, { passive: false });
    // pointerup can be on window to ensure we catch release outside canvas
    window.addEventListener("pointerup", onPointerUp, { passive: false });

    // As extra compatibility (older mobile browsers), also add touch listeners
    const onTouchStart = (e) => start(e);
    const onTouchMove = (e) => move(e);
    const onTouchEnd = (e) => stop(e);

    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: false });

    // Also add mouse listeners as a fallback (mouse events are not passive by default)
    const onMouseDown = (e) => start(e);
    const onMouseMove = (e) => move(e);
    const onMouseUp = (e) => stop(e);

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  return (
    <>
      <div
        className="border border-warning rounded-3 p-4 my-5"
        style={{ backgroundColor: " #a9f0c9ff" }}
      >
        <h5 className="mb-4">تمرین نوشتن — با خطوط راهنما</h5>
        <div className="drag-write-box mx-auto " style={{ maxWidth: width }}>
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
          </div>
          <h6 className="text-center bg-warning p-3 h4 rounded-2">{textTitle}</h6>

          <div
            style={{
              border: "2px solid #666",
              borderRadius: 8,
              overflow: "hidden",
              background: "white",
              // very important to prevent default touch scrolling when interacting:
              touchAction: "none",
            }}
          >
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              // NOTE: native listeners are attached in useEffect above;
              // avoid React's synthetic onTouch/onMouse handlers to prevent duplication.
              style={{ display: "block", width: "100%", height: `${height}px` }}
            />
          </div>

          <div className="mt-2 small text-muted">
            راهنما: با انگشت یا موس بنویس. برای استفاده در موبایل، هنگام نوشتن با لمس صفحه اسکرول صفحه قفل می‌شود.
          </div>
        </div>
      </div>
    </>
  );
};

export default DragWriteBoxWithGuides;
