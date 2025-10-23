export default function EdgeControls({ edgeMode, setEdgeMode, edgeColor, setEdgeColor }) {
  return (
    <div className="controls">
      <label>Tipo de borda</label>
      <div className="btns">
        <button
          className={edgeMode === "mirror" ? "btn active" : "btn"}
          onClick={() => setEdgeMode("mirror")}
          type="button"
        >Espelhada</button>

        <button
          className={edgeMode === "stretch" ? "btn active" : "btn"}
          onClick={() => setEdgeMode("stretch")}
          type="button"
        >Esticada</button>

        <button
          className={edgeMode === "solid" ? "btn active" : "btn"}
          onClick={() => setEdgeMode("solid")}
          type="button"
        >Cor sólida</button>
      </div>

      {edgeMode === "solid" && (
        <div className="row" style={{ marginTop: "10px" }}>
          <label>Cor das bordas</label>
          <input type="color" value={edgeColor} onChange={(e) => setEdgeColor(e.target.value)} />
        </div>
      )}
    </div>
  );
}
