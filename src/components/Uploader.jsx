import { useRef, useState } from "react";

export default function Uploader({ onImage }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const readFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    const img = new Image();
    reader.onload = (e) => {
      img.onload = () => onImage(e.target.result, img.width, img.height);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    readFile(file);
  };

  return (
    <div
      className={`uploader ${dragOver ? "is-over" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => readFile(e.target.files?.[0])}
      />
      <div className="uploader-inner">
        <strong>Clique para enviar</strong> ou arraste sua imagem
        <div className="uploader-tip">Somente imagens quadradas (1:1). JPG, PNG, WEBP – até 15 MB</div>
      </div>
    </div>
  );
}
