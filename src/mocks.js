// src/mocks.js
function asset(p) {
  const clean = String(p).replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${clean}`;
}

// use exatamente o nome/caixa do arquivo na pasta public/mockups/
const MOCKUP_PATH = "mockups/poster-front.jpeg"; // <<< .jpeg
const VERSION = "?v=2"; // bust cache

export const MOCKUPS = {
  posterFrontal: {
    src: asset(MOCKUP_PATH + VERSION),
    frame: { x: 0.12, y: 0.09, w: 0.76, h: 0.82 },
  },
  quadroPerspectiva: {
    src: asset(MOCKUP_PATH + VERSION),
    frame: { x: 0.12, y: 0.09, w: 0.76, h: 0.82 },
  },
};

export const GABARITOS = {
  pdf: asset("gabaritos/gabarito_pdf.pdf" + VERSION),
  png: asset("gabaritos/gabarito.png" + VERSION),
};
