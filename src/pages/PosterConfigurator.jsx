import { useState } from "react";
import Uploader from "../components/Uploader.jsx";
import ControlsBasic from "../components/ControlsBasic.jsx";
import MockupPreview from "../components/MockupPreview.jsx";

// helper para baseURL do Vite (funciona em subpasta)
const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, "")}`;

export default function PosterConfigurator() {
  const [userImage, setUserImage] = useState(null);     // DataURL da foto do cliente
  const [fit, setFit] = useState("cover");              // "cover" | "contain"
  const [zoom, setZoom] = useState(1);                  // 1.0 = sem zoom extra
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // pan

  const handleDrag = (dx, dy) => {
    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  };

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <section className="config-grid">
      <div className="left">
        <h2>Personalize seu pôster</h2>
        <p className="muted">
          Envie a imagem, ajuste enquadramento e confira o efeito: ao passar o mouse,
          o mockup troca para o seu pôster personalizado.
        </p>

        <Uploader onImage={setUserImage} />

        <ControlsBasic
          fit={fit}
          setFit={setFit}
          zoom={zoom}
          setZoom={setZoom}
          offset={offset}
          setOffset={setOffset}
          onReset={resetView}
        />

        <button className="cta" disabled={!userImage}>
          Adicionar ao carrinho
        </button>
      </div>

      <div className="right">
        <MockupPreview
          mockupSrc={asset("mockups/poster-front.jpg")}
          userImage={userImage}
          fit={fit}
          zoom={zoom}
          offset={offset}
          onDrag={handleDrag}
        />
        <p className="hint">Passe o mouse sobre a imagem para ver o pôster personalizado.</p>
      </div>
    </section>
  );
}
