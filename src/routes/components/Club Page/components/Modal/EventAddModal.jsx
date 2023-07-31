import editModal from "./EventEditModal.module.css";
import ImageUpload from "./ImageUpload";

import { createPortal } from "react-dom";
import { useState } from "react";
import axios from "axios";

export default function EventAddModal({ onClose, handleAddEvent }) {
  const [imgPath, setImgPath] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value === "" || e.target[1].value === "") {
      alert("Please fill in all fields");
      return;
    }
    // if (imgPath === "") {
    //   alert("Please upload an image or Wait for the image to upload");
    //   return;
    // }
    // if (confirm("Are you sure you want to add this event?") === null) {
    //   return;
    // }
    const name = e.target[0].value;
    const description = e.target[1].value;
    handleAddEvent(name, description, imgPath);
    onClose();
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const submitButton = document.querySelector(
      `.${editModal.submitButton}`
    );
    submitButton.disabled = true;
    submitButton.innerHTML = "Uploading...";
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    axios
      .post("https://bits-clubs.onrender.com/api/v1/uploadImage", formData)
      .then((res) => {
        setImgPath(res.data.img_path);
        // alert("Image Uploaded Successfully");
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit";
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
              <img src="/assets/Close.svg" alt="" />
            </button>
            <h1 className={editModal.title}>Add Details</h1>
            <form className={editModal.form} onSubmit={handleSubmit}>
              <label htmlFor={editModal.inputName} className={editModal.label}>
                Work Title{" "}
              </label>{" "}
              <input
                id={editModal.inputName}
                placeholder="Enter the name of event (40 characters)"
                type="text"
                encType="multipart/form-data"
                maxLength={40}
              />
              <label htmlFor={editModal.textarea} className={editModal.label}>
                Description{" "}
              </label>
              <textarea
                placeholder="Enter a small description of the event(70 characters)"
                id={editModal.textarea}
                className={editModal.eventTextarea}
                maxLength={70}
              />
              <label htmlFor={editModal.inputImage} className={editModal.label}>
                Add Image{" "}
              </label>{" "}
              <ImageUpload handleImageUpload = {handleImageUpload} />
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

