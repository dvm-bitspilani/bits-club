import editModal from "./EventEditModal.module.css";

import { createPortal } from "react-dom";

export default function SkillTextAddModal({ onClose, handleAddSkill }) {
    
  const handleSubmit = (e) => {
    e.preventDefault();
    const skill = e.target[0].value;
    handleAddSkill(skill);
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
                Skill Description
              </label>
              <textarea
                placeholder="Enter a small description of the skills involved in the club"
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
