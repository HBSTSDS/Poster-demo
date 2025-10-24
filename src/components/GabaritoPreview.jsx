// src/components/GabaritoPreview.jsx
import { useRef, useEffect } from "react";

const insetX1 = 100 * (1 / 29);
const insetY1 = 100 * (1 / 41);
const insetX2 = 100 * (2 / 29);
const insetY2 = 100 * (2 / 41);

export default function GabaritoPreview({ userImage, zoom = 1, offset = { x:0, y:0 }, onDrag }) {
  const dragRef = useRef(null);
  const dragAreaRef = useRef(null);

  useEffect(() => {
    const area = dragAreaRef.current;
    if (!area) return;
    const start = (e) => { const p = "touches" in e ? e.touches[0] : e; dragRef.current = { x:p.clientX, y:p.clientY }; e.preventDefault(); };
    const move  = (e) => { if (!dragRef.current) return; const p = "touches" in e ? e.touches[0] : e;
      onDrag && onDrag(p.clientX - dragRef.current.x, p.clientY - dragRef.current.y);
      dragRef.current = { x:p.clientX, y:p.clientY };
    };
    const end = () => (dragRef.current = null);
    area.addEventListener("mousedown", start);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    area.addEventListener("touchstart", start, { passive:false });
    window.addEventListener("touchmove", move, { passive:false });
    window.addEventListener("touchend", end);
    return () => {
      area.removeEventListener("mousedown", start);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      area.removeEventListener("touchstart", start);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
  }, [onDrag]);

  const containerStyle = {
    position: "relative",
    width: "520px",
    maxWidth: "100%",
    aspectRatio: "29 / 41",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 12px 28px rgba(0,0,0,.08)",
    overflow: "hidden",
  };

  const artWrapStyle = {
    position: "absolute", inset: 0, zIndex: 10,
    cursor: userImage ? "grab" : "default",
    background: userImage ? "transparent" : "#f4f4f5",
  };

  const artStyle = {
    position: "absolute", left: "50%", top: "50%", width: "100%", height: "100%",
    transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${zoom})`,
    transformOrigin: "center center", objectFit: "cover",
    userSelect: "none", pointerEvents: "none",
  };

  const blue =  { position:"absolute", inset:0, border:"3px solid rgba(65,123,191,.95)", borderRadius:"8px", pointerEvents:"none", zIndex:20 };
  const green = { position:"absolute", left:`${insetX1}%`, top:`${insetY1}%`, right:`${insetX1}%`, bottom:`${insetY1}%`, border:"3px solid rgba(51,168,113,.95)", borderRadius:"8px", pointerEvents:"none", zIndex:21 };
  const red   = { position:"absolute", left:`${insetX2}%`, top:`${insetY2}%`, right:`${insetX2}%`, bottom:`${insetY2}%`, border:"3px solid rgba(207,84,96,.95)", borderRadius:"6px", pointerEvents:"none", zIndex:22 };

  return (
    <div style={containerStyle} className="select-none">
      <div ref={dragAreaRef} style={artWrapStyle}>
        {userImage && <img src={userImage} alt="Arte do cliente" style={artStyle} draggable="false" />}
      </div>
      <div style={blue} /><div style={green} /><div style={red} />
    </div>
  );
}
