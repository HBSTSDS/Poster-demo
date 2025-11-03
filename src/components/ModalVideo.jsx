// src/components/ModalVideo.jsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ModalVideo({ open, onClose, src }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (open) {
      document.addEventListener("keydown", onEsc);
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  // zIndex extremamente alto para ganhar de qualquer coisa da página
  const Z_TOP = 2147483647; // 2^31-1

  const overlay = (
    <div
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: Z_TOP,
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          zIndex: Z_TOP + 1,
          maxWidth: "72vw",
          maxHeight: "82vh",
        }}
      >
        {/* Botão X sempre visível dentro do card */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Fechar vídeo"
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            padding: "6px 10px",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            borderRadius: "9999px",
            fontSize: "20px",
            lineHeight: 1,
            zIndex: Z_TOP + 2,
            border: "none",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onWheel={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "72vw",
            maxHeight: "82vh",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 25px 70px rgba(0,0,0,.35)",
            display: "block",
          }}
        />
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
