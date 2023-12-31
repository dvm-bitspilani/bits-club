import editModal from "./EventEditModal.module.css";
import ImageUpload from "./ImageUpload";

import { createPortal } from "react-dom";
import { useState } from "react";
import axios from "axios";

export default function POREditModal({ onClose, POR, handleEditPOR }) {
  const [imgPath, setImgPath] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      e.target[0].value === "" ||
      e.target[1].value === "" ||
      e.target[2].value === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    // if (imgPath === "") {
    //   alert("Please upload an image or Wait for the image to upload");
    //   return;
    // }
    // if (
    //   confirm("Are you sure you want to edit this card?") === null
    // ) {
    //   return;
    // }
    const name = e.target[0].value;
    const email = e.target[1].value;
    const position = e.target[2].value;
    handleEditPOR(POR, name, email, position, imgPath);
    onClose();
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const submitButton = document.querySelector(`.${editModal.submitButton}`);
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
            <h1 className={editModal.title}>Edit Position</h1>
            <form
              className={editModal.form}
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <label htmlFor={editModal.inputName} className={editModal.label}>
                POR Holder Name
              </label>
              <input
                id={editModal.inputName}
                defaultValue={POR.por_holder_name}
                type="text"
                maxLength={40}
              />
              <label htmlFor={editModal.inputName} className={editModal.label}>
                POR Holder Email
              </label>
              <input
                id={editModal.inputName}
                defaultValue={POR.por_holder_email}
                type="email"
              />
              <label htmlFor={editModal.inputName} className={editModal.label}>
                Position of Responsibility
              </label>
              <input
                id={editModal.inputName}
                defaultValue={POR.por_title}
                type="text"
                maxLength={40}
              />
              <label htmlFor={editModal.inputImage} className={editModal.label}>
                POR Holder Image{" "}
              </label>{" "}
              <ImageUpload handleImageUpload={handleImageUpload} />
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
