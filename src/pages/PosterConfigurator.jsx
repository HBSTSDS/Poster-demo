import { useState } from "react";
import Uploader from "../components/Uploader.jsx";
import ControlsBasic from "../components/ControlsBasic.jsx";
import MockupPreview from "../components/MockupPreview.jsx";
import { MOCKUPS } from "../mocks.js";

export default function PosterConfigurator() {
  const [userImage, setUserImage] = useState(null);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [mockKey, setMockKey] = useState("posterFrontal"); // ou "quadroPerspectiva"

  const handleImage = (dataUrl) => {
    setUserImage(dataUrl);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

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
        <p className="muted">Envie uma imagem quadrada (1:1) com boa resolução.</p>

        <Uploader onImage={handleImage} />

        <ControlsBasic
          zoom={zoom}
          setZoom={setZoom}
          offset={offset}
          setOffset={setOffset}
          onReset={resetView}
        />

        <div className="controls">
          <label>Mockup</label>
          <div className="btns">
            <button
              className={mockKey === "posterFrontal" ? "btn active" : "btn"}
              type="button"
              onClick={() => setMockKey("posterFrontal")}
            >
              Frontal
            </button>
            <button
              className={mockKey === "quadroPerspectiva" ? "btn active" : "btn"}
              type="button"
              onClick={() => setMockKey("quadroPerspectiva")}
            >
              Quadro
            </button>
          </div>
        </div>

        <button className="cta" disabled={!userImage}>Adicionar ao carrinho</button>
      </div>

      <div className="right">
        <MockupPreview
          mock={MOCKUPS[mockKey]}
          userImage={userImage}
          zoom={zoom}
          offset={offset}
          onDrag={handleDrag}
        />
        <p className="hint">Pré-visualização no mockup escolhido.</p>
      </div>
    </section>
  );
}
