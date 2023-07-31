import editModal from "./EventEditModal.module.css";
import { useRef } from "react";

export default function ImageUpload({ handleImageUpload }) {
  const inputImgRef = useRef(null);

  return (
    <>
      <div
        className={editModal.dropzone}
        onClick={() => inputImgRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // console.log(e);
        }}
        onDrop={(e) => {
          e.preventDefault();
          // console.log(e);
          inputImgRef.current.files = e.dataTransfer.files;
          console.log(inputImgRef.current)
          inputImgRef.current.dispatchEvent(new Event('change', { 'bubbles': true }))
        }}
      >
        <div className={editModal.dropzoneText}>
          <p>Drag & Drop</p>
          <p>or</p>
          <p>Click to Upload</p>
        </div>
      </div>
      <input
        name="uploaded_file"
        id={editModal.inputImage}
        type="file"
        onChange={handleImageUpload}
        ref={inputImgRef}
        hidden
      />
    </>
  );
}
