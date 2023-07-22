import editModal from "./EventEditModal.module.css";
import { createPortal } from "react-dom";

export default function EventEditModal({ onClose, event, handleEditEvent }) {

  const handleSubmit = (e) => {
    if (e.target[0].value === "" || e.target[1].value === "") {
      alert("Please fill in all fields");
      return;
    }
    if (confirm("Are you sure you want to edit this event?") === null) {
      return;
    }
    e.preventDefault();
    const name = e.target[0].value;
    const description = e.target[1].value;
    handleEditEvent(event, name, description);
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
              <label htmlFor={editModal.inputName} className={editModal.label}>Event Name  </label> <input id={editModal.inputName} defaultValue={event.name} type="text" />
              <label htmlFor={editModal.textarea} className={editModal.label}>Event Description  </label><textarea defaultValue={event.description} id={editModal.textarea}/>
              <button className={editModal.submitButton} type="submit">Submit</button>
            </form>
          </div>
        </div>,
        document.getElementById("portal")
      )}
    </>
  );
}
