import editModal from "./EventEditModal.module.css";
import { createPortal } from "react-dom";

export default function POREditModal({ onClose, POR, handleEditPOR }) {
  const handleSubmit = (e) => {
    if (e.target[0].value === "") {
      alert("Please fill in all fields");
      return;
    }
    if (
      confirm("Are you sure you want to edit this skill description?") === null
    ) {
      return;
    }
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const position = e.target[2].value;
    handleEditPOR(POR, name, email, position);
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
                POR Holder Name
              </label>
              <input
                id={editModal.inputName}
                defaultValue={POR.por_holder_name}
                type="text"
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
                POR Holder Name
              </label>
              <input
                id={editModal.inputName}
                defaultValue={POR.por_title}
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
