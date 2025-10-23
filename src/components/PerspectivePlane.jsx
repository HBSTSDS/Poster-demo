import { useEffect, useRef, useCallback } from "react";

/**
 * Desenha uma imagem (com zoom/offset) dentro de um quadrilátero (p1..p4) em PERSPECTIVA
 * quad: [[x,y],[x,y],[x,y],[x,y]] em PX, sentido horário: topo-esq, topo-dir, base-dir, base-esq.
 */
export default function PerspectivePlane({ imgSrc, quad, zoom = 1, offset = { x: 0, y: 0 } }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const rafRef = useRef(null);

  // função de desenho MEMOIZADA (evita warnings do ESLint)
  const draw = useCallback(() => {
    const cvs = canvasRef.current;
    const img = imgRef.current;
    if (!cvs || !img || !quad || quad.length !== 4) return;

    const parent = cvs.parentElement;
    const W = parent?.clientWidth | 0;
    const H = parent?.clientHeight | 0;
    if (!W || !H) return;

    if (cvs.width !== W || cvs.height !== H) {
      cvs.width = W;
      cvs.height = H;
    }

    const ctx = cvs.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    ctx.imageSmoothingEnabled = true;

    // cover + centro
    const iw = img.width, ih = img.height;
    const coverScale = Math.max(W / iw, H / ih) * zoom;
    const vw = iw * coverScale;
    const vh = ih * coverScale;
    const vx = (W - vw) / 2 + offset.x;
    const vy = (H - vh) / 2 + offset.y;

    const STEPS = 30;
    const EPS = 0.01;

    // bilinear no quad (destino)
    const bilinear = (u, v) => {
      const [p00, p10, p11, p01] = quad;
      const x = (1 - u) * (1 - v) * p00[0] + u * (1 - v) * p10[0] + u * v * p11[0] + (1 - u) * v * p01[0];
      const y = (1 - u) * (1 - v) * p00[1] + u * (1 - v) * p10[1] + u * v * p11[1] + (1 - u) * v * p01[1];
      return [x, y];
    };

    const drawTri = (sx0, sy0, sx1, sy1, sx2, sy2, dx0, dy0, dx1, dy1, dx2, dy2) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(dx0, dy0);
      ctx.lineTo(dx1, dy1);
      ctx.lineTo(dx2, dy2);
      ctx.closePath();
      ctx.clip();

      const denom = (sx0 * (sy1 - sy2) + sx1 * (sy2 - sy0) + sx2 * (sy0 - sy1)) || 1e-5;
      const a = (dx0 * (sy1 - sy2) + dx1 * (sy2 - sy0) + dx2 * (sy0 - sy1)) / denom;
      const b = (dx0 * (sx2 - sx1) + dx1 * (sx0 - sx2) + dx2 * (sx1 - sx0)) / denom;
      const c = (dx0 * (sx1 * sy2 - sx2 * sy1) + dx1 * (sx2 * sy0 - sx0 * sy2) + dx2 * (sx0 * sy1 - sx1 * sy0)) / denom;
      const d = (dy0 * (sy1 - sy2) + dy1 * (sy2 - sy0) + dy2 * (sy0 - sy1)) / denom;
      const e = (dy0 * (sx2 - sx1) + dy1 * (sx0 - sx2) + dy2 * (sx1 - sx0)) / denom;
      const f = (dy0 * (sx1 * sy2 - sx2 * sy1) + dy1 * (sx2 * sy0 - sx0 * sy2) + dy2 * (sx0 * sy1 - sx1 * sy0)) / denom;

      ctx.transform(a, d, b, e, c, f);

      const minx = Math.min(sx0, sx1, sx2) - EPS;
      const miny = Math.min(sy0, sy1, sy2) - EPS;
      const maxx = Math.max(sx0, sx1, sx2) + EPS;
      const maxy = Math.max(sy0, sy1, sy2) + EPS;

      ctx.drawImage(
        img,
        minx, miny, maxx - minx, maxy - miny,   // src (em pixels da imagem)
        minx, miny, maxx - minx, maxy - miny    // dst (após transform)
      );
      ctx.restore();
    };

    for (let i = 0; i < STEPS; i++) {
      const u0 = i / STEPS, u1 = (i + 1) / STEPS;
      const x0 = u0 * W, x1 = u1 * W;

      for (let j = 0; j < STEPS; j++) {
        const v0 = j / STEPS, v1 = (j + 1) / STEPS;
        const y0 = v0 * H, y1 = v1 * H;

        // TELA -> COORDS DA IMAGEM (inverso do cover + pan)
        const sx0 = (x0 - vx) / coverScale;
        const sx1 = (x1 - vx) / coverScale;
        const sy0 = (y0 - vy) / coverScale;
        const sy1 = (y1 - vy) / coverScale;

        const [dx00, dy00] = bilinear(u0, v0);
        const [dx10, dy10] = bilinear(u1, v0);
        const [dx11, dy11] = bilinear(u1, v1);
        const [dx01, dy01] = bilinear(u0, v1);

        drawTri(sx0, sy0, sx1, sy0, sx1, sy1, dx00, dy00, dx10, dy10, dx11, dy11);
        drawTri(sx0, sy0, sx1, sy1, sx0, sy1, dx00, dy00, dx11, dy11, dx01, dy01);
      }
    }
  }, [quad, zoom, offset.x, offset.y]); // <- deps corretas

  // carrega imagem
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => { imgRef.current = img; draw(); };
    img.src = imgSrc;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSrc]); // ok: draw chamado no onload

  // redesenha quando mudam deps
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  // redimensiona com RAF
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    });
    ro.observe(cvs.parentElement);
    return () => ro.disconnect();
  }, [draw]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
