import editModal from "./EventEditModal.module.css";
import { useRef, useState } from "react";

export default function ImageUpload({ handleImageUpload }) {
  const inputImgRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);

  return (
    <>
      <div
        className={editModal.dropzone}
        onClick={() => inputImgRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          // e.stopPropagation();
          e.target.classList.add(editModal.dropzoneActive);
          setIsDrag(true);
          // console.log(e);
        }}
        onDragLeaveCapture={(e) => {
          e.preventDefault();
          // e.stopPropagation();
          setIsDrag(false);
          e.target.classList.remove(editModal.dropzoneActive);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.target.classList.remove(editModal.dropzoneActive);
          setIsDrag(false);
          inputImgRef.current.files = e.dataTransfer.files;
          inputImgRef.current.dispatchEvent(
            new Event("change", { bubbles: true })
          );
        }}
      >
        {!isDrag && !inputImgRef?.current?.files[0] && (
          <div className={editModal.dropzoneText}>
            <p>Drag & Drop</p>
            <p>or</p>
            <p>Click to Upload</p>
          </div>
        )}
        {!isDrag && inputImgRef?.current?.files[0] && (
          <div className={editModal.dropzoneText}>
            <p>{inputImgRef?.current?.files[0]?.name}</p>
          </div>
        )}
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
