import { useRef } from "react";
import PerspectivePlane from "./PerspectivePlane.jsx";

const asset = (p) => `${import.meta.env.BASE_URL}${String(p || "").replace(/^\/+/, "")}`;

export default function MockupPreview({ mock, userImage, zoom = 1, offset = { x: 0, y: 0 }, onDrag }) {
  const ref = useRef(null);
  let dragging = false;
  let last = { x: 0, y: 0 };

  const onPointerDown = (e) => { if (!userImage) return; dragging = true; last = { x: e.clientX, y: e.clientY }; ref.current?.setPointerCapture(e.pointerId); };
  const onPointerMove = (e) => { if (!dragging) return; const dx = e.clientX - last.x; const dy = e.clientY - last.y; last = { x: e.clientX, y: e.clientY }; onDrag?.(dx, dy); };
  const onPointerUp = () => { dragging = false; };

  const mockSrc = asset(mock?.src);

  // Converte % -> px com base no tamanho atual do container
  const quadPx = (() => {
    if (!mock?.polygon || !ref.current) return null;
    const { clientWidth: W, clientHeight: H } = ref.current;
    return mock.polygon.map(([x, y]) => [ (x/100)*W, (y/100)*H ]);
  })();

  return (
    <div
      ref={ref}
      className="mockup"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {mockSrc ? <img src={mockSrc} alt="" className="mockup-base" draggable="false" /> : <div className="mockup-base" />}

      {userImage && mock && (
        mock.polygon ? (
          // PERSPECTIVA REAL: desenha no quadrilátero
          quadPx && <PerspectivePlane imgSrc={userImage} quad={quadPx} zoom={zoom} offset={offset} />
        ) : (
          // FRONTAL: janela retangular com insets
          <div
            className="poster-window"
            style={{
              top: `${mock.insets?.top ?? 6.5}%`,
              right: `${mock.insets?.right ?? 6.5}%`,
              bottom: `${mock.insets?.bottom ?? 6.5}%`,
              left: `${mock.insets?.left ?? 6.5}%`,
              borderRadius: (mock.rounded ?? 8) + "px",
            }}
          >
            <img
              src={userImage}
              alt=""
              className="poster-img"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center",
                transformOrigin: "center", transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              }}
              draggable="false"
            />
          </div>
        )
      )}
    </div>
  );
}
