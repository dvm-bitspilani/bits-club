import editModal from "./EventEditModal.module.css";

import { createPortal } from "react-dom";

export default function PORAddModal({ onClose, handleAddPOR }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const position = e.target[2].value;
    handleAddPOR(name, email, position);
    onClose();
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
            <form className={editModal.form} onSubmit={handleSubmit}>
              <label htmlFor={editModal.inputName} className={editModal.label}>
                POR Holder Name{" "}
              </label>{" "}
              <input
                id={editModal.inputName}
                placeholder="Enter the name of POR Holder"
                type="text"
              />
              <label htmlFor={editModal.inputName} className={editModal.label}>
                POR Holder Email{" "}
              </label>{" "}
              <input
                id={editModal.inputName}
                placeholder="Enter the email of the POR Holder"
                type="email"
              />
              <label htmlFor={editModal.inputName} className={editModal.label}>
                POR Holder Name{" "}
              </label>{" "}
              <input
                id={editModal.inputName}
                placeholder="Enter the position of the POR Holder"
                type="text"
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
