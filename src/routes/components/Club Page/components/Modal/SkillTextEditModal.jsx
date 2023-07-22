import editModal from "./EventEditModal.module.css";
import { createPortal } from "react-dom";

export default function EventEditModal({ onClose, skill, handleEditEvent }) {
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
    const newskill = e.target[0].value;
    handleEditEvent(skill, newskill);
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
              <label htmlFor={editModal.textarea} className={editModal.label}>
                Skill Description{" "}
              </label>
              <textarea
                style={{ height: "12rem" }}
                defaultValue={skill}
                id={editModal.textarea}
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
