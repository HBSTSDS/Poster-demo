export default function ControlsBasic({
  fit, setFit,
  zoom, setZoom,
  offset, setOffset,
  onReset
}) {
  return (
    <div className="controls">
      <div className="row">
        <label>Enquadramento</label>
        <div className="btns">
          <button
            className={fit === "cover" ? "btn active" : "btn"}
            onClick={() => setFit("cover")}
            type="button"
          >Preencher</button>
          <button
            className={fit === "contain" ? "btn active" : "btn"}
            onClick={() => setFit("contain")}
            type="button"
          >Encaixar</button>
        </div>
      </div>

      <div className="row">
        <label>Zoom</label>
        <input
          type="range"
          min="1"
          max="3"
          step="0.01"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
        />
      </div>

      <div className="row two">
        <div>
          <label>Posição X</label>
          <input
            type="range"
            min="-200"
            max="200"
            step="1"
            value={offset.x}
            onChange={(e) => setOffset(o => ({ ...o, x: parseInt(e.target.value) }))}
          />
        </div>
        <div>
          <label>Posição Y</label>
          <input
            type="range"
            min="-200"
            max="200"
            step="1"
            value={offset.y}
            onChange={(e) => setOffset(o => ({ ...o, y: parseInt(e.target.value) }))}
          />
        </div>
      </div>

      <button className="btn ghost" type="button" onClick={onReset}>
        Restaurar enquadramento
      </button>
    </div>
  );
}
