import editModal from "./EventEditModal.module.css";

import { createPortal } from "react-dom";

export default function EventAddModal({ onClose, handleAddEvent }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const description = e.target[1].value;
    handleAddEvent(name, description);
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
              <label htmlFor={editModal.inputName} className={editModal.label}>Event Name  </label> <input id={editModal.inputName} placeholder="Enter the name of event" type="text" />
              <label htmlFor={editModal.textarea} className={editModal.label}>Event Description  </label><textarea placeholder="Enter the description of the event" id={editModal.textarea}/>
              <button className={editModal.submitButton} type="submit">Submit</button>
            </form>
          </div>
        </div>,
        document.getElementById("portal")
      )}
    </>
  );
}
