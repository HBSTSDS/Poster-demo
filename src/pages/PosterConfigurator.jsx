// src/pages/PosterConfigurator.jsx
import { useState } from "react";
import Uploader from "../components/Uploader.jsx";
import ControlsBasic from "../components/ControlsBasic.jsx";
import GabaritoPreview from "../components/GabaritoPreview.jsx";
import DownloadGabarito from "../components/DownloadGabarito.jsx";
import PosterShots from "../components/PosterShots.jsx";

export default function PosterConfigurator() {
  const [userImage, setUserImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleImage = (dataUrl) => {
    console.log("[Uploader] imagem recebida?", !!dataUrl);
    setUserImage(dataUrl);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleDrag = (dx, dy) =>
    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  console.log("[PosterConfigurator] render", { hasImage: !!userImage });

  return (
    <section className="config-grid" style={{ minHeight: "100vh" }}>
      <div className="left" style={{ padding: 16 }}>
        <h2>Personalize seu pôster</h2>
        <p className="muted">Envie uma imagem com boa resolução.</p>

        {/* Uploader usa onImage */}
        <Uploader onImage={handleImage} />

        <div style={{ marginTop: 12 }}>
          <ControlsBasic
            zoom={zoom}
            setZoom={setZoom}
            offset={offset}
            setOffset={setOffset}
            onReset={resetView}
            disabled={!userImage}
          />
        </div>

        <button className="cta" disabled={!userImage} style={{ marginTop: 12 }}>
          Adicionar ao carrinho
        </button>

        <div style={{ marginTop: 16 }}>
          <PosterShots />
        </div>
      </div>

      <div className="right" style={{ padding: 16 }}>
        <GabaritoPreview
          userImage={userImage}
          zoom={zoom}
          offset={offset}
          onDrag={handleDrag}
        />

        {/* legenda fora do quadro */}
        <p className="hint mt-2" style={{ marginTop: 8 }}>
          * <strong><span style={{ fontSize: "22px", color: "#cf5460", fontWeight: 600}}>Vermelho</span> = área plana •{" "}</strong>
          <strong><span style={{ fontSize: "22px", color: "#33a871", fontWeight: 600 }}>Verde</span> = 1ª dobra •{" "}</strong>
          <strong><span style={{ fontSize: "22px",color: "#417BBF", fontWeight: 600 }}>Azul</span> = 2ª dobra (parte de trás)</strong>
        </p>

        <div className="mt-3" style={{ marginTop: 12 }}>
          <DownloadGabarito disabled={!userImage} />
        </div>
      </div>
    </section>
  );
}
