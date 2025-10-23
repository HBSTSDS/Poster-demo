import { useRef } from "react";

/**
 * Empilha o mockup base e a camada personalizada.
 * No hover (.group:hover), a camada personalizada aparece.
 * Suporta pan por arrasto (onDrag(dx, dy)).
 */
export default function MockupPreview({
  mockupSrc,
  userImage,
  fit = "cover",
  zoom = 1,
  offset = { x: 0, y: 0 },
  onDrag
}) {
  const ref = useRef(null);
  let dragging = false;
  let last = { x: 0, y: 0 };

  const onPointerDown = (e) => {
    if (!userImage) return;
    dragging = true;
    last = { x: e.clientX, y: e.clientY };
    ref.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    last = { x: e.clientX, y: e.clientY };
    onDrag?.(dx, dy);
  };
  const onPointerUp = (e) => {
    dragging = false;
    ref.current?.releasePointerCapture?.(e.pointerId);
  };

  return (
    <div
      ref={ref}
      className="mockup group"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Mockup base */}
      <img src={mockupSrc} alt="Mockup do pôster" className="mockup-base" draggable="false" />

      {/* Camada personalizada (aparece no hover) */}
      {userImage && (
        <img
          src={userImage}
          alt="Sua imagem no pôster"
          className="mockup-user"
          style={{
            objectFit: fit,
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: "center center",
          }}
          draggable="false"
        />
      )}
    </div>
  );
}
