// src/components/VideoPreview.jsx
export default function VideoPreview({ src, onClick }) {
  return (
    <figure
      className="poster-shot"
      onClick={onClick}
      style={{
        cursor: "pointer",
        width: "140px",   // ← Aumentado (antes era 100px)
      }}
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "200px", // ← Aumentado (antes era 150px)
          objectFit: "cover",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      />
      <figcaption
        style={{
          fontSize: "12px",
          color: "var(--muted, #6b7280)",
          marginTop: "6px",
          textAlign: "center",
        }}
      >
        Prévia em vídeo
      </figcaption>
    </figure>
  );
}
