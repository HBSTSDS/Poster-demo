// src/pages/PosterConfigurator.jsx
import { useState, useCallback } from "react";
import Uploader from "../components/Uploader.jsx";
import ControlsBasic from "../components/ControlsBasic.jsx";
import GabaritoPreview from "../components/GabaritoPreview.jsx";
import DownloadGabarito from "../components/DownloadGabarito.jsx";
import VideoPreview from "../components/VideoPreview.jsx";
import ModalVideo from "../components/ModalVideo.jsx";

export default function PosterConfigurator() {
  // ==== ESTADOS ====
  const [userImage, setUserImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [videoOpen, setVideoOpen] = useState(false);

  // ==== HANDLERS ====
  const handleImage = useCallback((dataUrl) => {
    setUserImage(dataUrl);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const handleDrag = useCallback((dx, dy) => {
    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  // Caminho do vídeo (coloque o arquivo em /public/videos/Bricolagens.mp4)
  const videoSrc = "/videos/Bricolagens.mp4";

  return (
    <main className="page">
      <div className="content">
        {/* Cabeçalho */}
        <h2 className="brand" style={{ marginBottom: 6 }}>Personalize seu pôster</h2>
        <p className="muted">Envie uma imagem com boa resolução.</p>

        {/* GRID principal - usa as classes do index.css */}
        <div className="config-grid">
          {/* === COLUNA ESQUERDA === */}
          <section className="left">
            {/* Uploader */}
            <Uploader onImage={handleImage} />

            {/* Controles */}
            <div className="controls" style={{ marginTop: 12 }}>
              <ControlsBasic
                zoom={zoom}
                setZoom={setZoom}
                offset={offset}
                setOffset={setOffset}
                onReset={resetView}
              />
            </div>

            {/* CTA */}
            <button className="cta">Adicionar ao carrinho</button>

            {/* Exemplo do pôster (preview pequeno do vídeo) */}
            <div style={{ marginTop: 18 }}>
              <p style={{ fontSize: 14, marginBottom: 8, color: "#111" }}>Exemplo do pôster</p>
              <div className="poster-shots">
                <VideoPreview src={videoSrc} onClick={() => setVideoOpen(true)} />
              </div>
            </div>
          </section>

          {/* === COLUNA DIREITA === */}
          <section className="right">
            {/* Quadro do preview grande */}
            <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-[720px]">
              <GabaritoPreview
                userImage={userImage}
                zoom={zoom}
                offset={offset}
                onDrag={handleDrag}
              />
            </div>

            {/* Legenda colorida + baixar gabarito (agora abaixo do preview) */}
            <div style={{ width: "100%", maxWidth: 720, marginTop: 10 }}>
              <p className="hint" style={{ marginTop: 8 }}>
                <span>* </span>
                <strong>
                  <span style={{ color: "#cf5460", fontWeight: 600 }}>Vermelho</span> = área plana •{" "}
                </strong>
                <strong>
                  <span style={{ color: "#33a871", fontWeight: 600 }}>Verde</span> = 1ª dobra •{" "}
                </strong>
                <strong>
                  <span style={{ color: "#417BBF", fontWeight: 600 }}>Azul</span> = 2ª dobra (parte de trás)
                </strong>
              </p>

              <div style={{ marginTop: 8 }}>
                <DownloadGabarito />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* MODAL DE VÍDEO (abre em tela com blur/escuro, sem som) */}
      <ModalVideo
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src={videoSrc}
      />
    </main>
  );
}
