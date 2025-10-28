// src/components/PosterShots.jsx
import { useEffect, useState } from "react";

export default function PosterShots({
  title = "Exemplos do pôster",
  order = ["poster-frente", "poster-lado"],
  size = 250, // tamanho do quadrado (px)
  cols = 2,   // nº de colunas no desktop
  gap = 5,   // espaço entre itens
}) {
  const shotsCandidates = order.map((base) => makeCandidates(`/posters/${base}`));

  // responsivo simples
  const [colsNow, setColsNow] = useState(cols);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 560) setColsNow(1);
      else if (w <= 920) setColsNow(Math.min(2, cols));
      else setColsNow(cols);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [cols]);

  return (
    <section className="poster-shots" style={{ marginTop: 8 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, opacity: 0.8, margin: "0 0 8px" }}>
        {title}
      </h3>

      <div
        style={{
          display: "grid",
          gap,
          gridTemplateColumns: `repeat(${colsNow}, ${size}px)`,
          justifyContent: "start",
        }}
      >
        {shotsCandidates.map((cands, i) => (
          <Shot key={i} candidates={cands} size={size} />
        ))}
      </div>
    </section>
  );
}

function makeCandidates(basePathNoExt) {
  const exts = [".png", ".jpg", ".jpeg", ".webp"];
  return exts.map((ext) => `${basePathNoExt}${ext}`);
}

function Shot({ candidates, size }) {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(!candidates?.length);

  if (failed) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 12,
          background:
            "repeating-linear-gradient(135deg,#eee,#eee 10px,#f7f7f7 10px,#f7f7f7 20px)",
        }}
        aria-label="prévia indisponível"
      />
    );
  }

  const src = candidates[idx];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        overflow: "hidden",
        background: "#ffffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={src}
        alt="Prévia do pôster"
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain", // 👈 mantém a imagem inteira
          display: "block",
        }}
        onError={() => {
          if (idx < candidates.length - 1) setIdx((i) => i + 1);
          else setFailed(true);
        }}
      />
    </div>
  );
}
