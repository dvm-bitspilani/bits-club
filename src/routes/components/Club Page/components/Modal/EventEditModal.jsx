import editModal from "./EventEditModal.module.css";
import { createPortal } from "react-dom";
import { useState } from "react";
import axios from "axios";

export default function EventEditModal({ onClose, event, handleEditEvent }) {
  const [imgPath, setImgPath] = useState("");
  
  const handleSubmit = (e) => {
    if (e.target[0].value === "" || e.target[1].value === "") {
      alert("Please fill in all fields");
      return;
    }
    if (imgPath === "") {
      alert("Please upload an image or Wait for the image to upload");
      return;
    }
    if (confirm("Are you sure you want to edit this event?") === null) {
      return;
    }
    e.preventDefault();
    const name = e.target[0].value;
    const description = e.target[1].value;
    handleEditEvent(event, name, description, imgPath);
    onClose();
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    axios
      .post("https://bits-clubs.onrender.com/api/v1/uploadImage", formData)
      .then((res) => {
        setImgPath(res.data.img_path);
        alert("Image Uploaded Successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Image Upload Failed");
      });
  };

  return (
    <>
      {createPortal(
        <div className={editModal.editModalContainer}>
          <div className={editModal.filter} onClick={onClose}></div>
          <div className={editModal.modal}>
            <button className={editModal.deleteButton} onClick={onClose}>
              X
            </button>
            <form
              className={editModal.form}
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <label htmlFor={editModal.inputName} className={editModal.label}>
                Event Name{" "}
              </label>{" "}
              <input
                id={editModal.inputName}
                defaultValue={event.name}
                type="text"
              />
              <label htmlFor={editModal.textarea} className={editModal.label}>
                Event Description{" "}
              </label>
              <textarea
                defaultValue={event.description}
                id={editModal.textarea}
              />
              <label htmlFor={editModal.inputImage} className={editModal.label}>
                Event Image{" "}
              </label>{" "}
              <input
                name="uploaded_file"
                id={editModal.inputImage}
                type="file"
                onChange={handleImageUpload}
              />
              <button className={editModal.submitButton} type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>,
        document.getElementById("portal")
      )}
    </>
  );
}
