// src/components/MockupPreview.jsx
import { useRef, useEffect, useState } from "react";

export default function MockupPreview({
  mock,
  userImage,
  zoom = 1,
  offset = { x: 0, y: 0 },
  onDrag,
}) {
  const wrapRef = useRef(null);
  const drag = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Controle de arrastar a arte
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const start = (e) => {
      const p = "touches" in e ? e.touches[0] : e;
      drag.current = { x: p.clientX, y: p.clientY };
      e.preventDefault();
    };
    const move = (e) => {
      if (!drag.current) return;
      const p = "touches" in e ? e.touches[0] : e;
      const dx = p.clientX - drag.current.x;
      const dy = p.clientY - drag.current.y;
      drag.current = { x: p.clientX, y: p.clientY };
      onDrag && onDrag(dx, dy);
    };
    const end = () => (drag.current = null);

    el.addEventListener("mousedown", start);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    el.addEventListener("touchstart", start, { passive: false });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);

    return () => {
      el.removeEventListener("mousedown", start);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      el.removeEventListener("touchstart", start);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
  }, [onDrag]);

  const frame = mock?.frame || { x: 0, y: 0, w: 1, h: 1 };

  return (
    <div
      className="relative bg-white rounded-xl shadow-xl overflow-hidden flex items-center justify-center"
      style={{
        width: "480px",
        height: "600px", // altura fixa para manter o pôster em pé
        maxWidth: "100%",
        zIndex: 10,
      }}
    >
      {/* área de recorte */}
      <div ref={wrapRef} className="absolute inset-0 z-10 flex items-center justify-center">
        <div
          style={{
            position: "absolute",
            left: `${frame.x * 100}%`,
            top: `${frame.y * 100}%`,
            width: `${frame.w * 100}%`,
            height: `${frame.h * 100}%`,
            overflow: "hidden",
            borderRadius: "4px",
            cursor: userImage ? "grab" : "default",
          }}
        >
          {userImage && (
            <img
              src={userImage}
              alt="Arte do cliente"
              style={{
                position: "absolute",
                left: `${offset.x}px`,
                top: `${offset.y}px`,
                width: `${zoom * 100}%`,
                height: `${zoom * 100}%`,
                objectFit: "cover",
                userSelect: "none",
                pointerEvents: "none",
              }}
              draggable="false"
            />
          )}
        </div>
      </div>

      {/* Mockup com tamanho fixo e centralizado */}
      <img
        src={mock.src}
        alt="Mockup do pôster"
        className="object-contain select-none pointer-events-none transition-opacity duration-300"
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "100%",
          display: loaded ? "block" : "none",
        }}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          console.error("Falha ao carregar mockup:", mock.src);
          e.currentTarget.style.display = "none";
        }}
        draggable="false"
      />

      {!loaded && (
        <div className="absolute inset-0 bg-neutral-100 animate-pulse rounded-xl" />
      )}
    </div>
  );
}
