// src/pages/PosterConfigurator.jsx
import { useState } from "react";
import Uploader from "../components/Uploader.jsx";
import ControlsBasic from "../components/ControlsBasic.jsx";
import GabaritoPreview from "../components/GabaritoPreview.jsx";
import DownloadGabarito from "../components/DownloadGabarito.jsx";

export default function PosterConfigurator() {
  const [userImage, setUserImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleImage = (dataUrl) => { setUserImage(dataUrl); setZoom(1); setOffset({ x: 0, y: 0 }); };
  const handleDrag  = (dx, dy) => setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  const resetView   = () => { setZoom(1); setOffset({ x: 0, y: 0 }); };

  return (
    <section className="config-grid">
      <div className="left">
        <h2>Personalize seu pôster</h2>
        <p className="muted">Envie uma imagem com boa resolução.</p>

        <Uploader onImage={handleImage} />

        <ControlsBasic
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
        <GabaritoPreview
          userImage={userImage}
          zoom={zoom}
          offset={offset}
          onDrag={handleDrag}
        />

        {/* legenda fora do quadro, logo abaixo */}
        <p className="hint mt-2">
          * <span className="font-medium" style={{ color: "#cf5460" }}>Vermelho</span> = área plana •{" "}
          <span className="font-medium" style={{ color: "#33a871" }}>Verde</span> = 1ª dobra •{" "}
          <span className="font-medium" style={{ color: "#417BBF" }}>Azul</span> = parte de trás
        </p>

        {/* botão rosa de download abaixo do quadro */}
        <div className="mt-3">
          <DownloadGabarito />
        </div>
      </div>
    </section>
  );
}
