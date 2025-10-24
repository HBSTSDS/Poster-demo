// src/components/DownloadGabarito.jsx
function asset(path) {
  const clean = String(path).replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${clean}`;
}

const SVG_PATH = asset("GabaritoPoster.svg"); // ajuste se estiver em /gabaritos/gabarito.svg

export default function DownloadGabarito() {
  return (
    <div className="mt-3">
      <a
        href={SVG_PATH}
        download="Gabarito_Poster_29x41cm_25x37cm_Borda2cm.svg"
        className="inline-flex items-center justify-center rounded-full px-5 py-3
                   bg-pink-500 hover:bg-pink-600 text-white font-medium shadow transition"
      >
        {/* ícone seta para baixo */}
        <svg width="18" height="18" viewBox="0 0 24 24" className="-ml-1 mr-1" aria-hidden="true">
          <path d="M12 3v10m0 0l-4-4m4 4l4-4M4 17h16v2H4z"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Baixar gabarito
      </a>
    </div>
  );
}
