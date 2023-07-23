import editModal from "./EventEditModal.module.css";

import { createPortal } from "react-dom";
import { useState } from "react";

export default function SkillTextAddModal({ onClose, handleAddSkill, tags }) {
    
  const handleSubmit = (e) => {
    e.preventDefault();
    const skill = e.target[0].value;
    handleAddSkill(skill);
    onClose();
  };

  const [isDescriptionToggle, setIsDescriptionToggle] = useState(false);

  const DESCRIPTION_STYLE = {
    background: isDescriptionToggle ? "#f5f5f5" : "#e0e0e0",
    color: isDescriptionToggle ? "#000" : "#fff",
  };

  const TAGS_STYLE = {
    background: isDescriptionToggle ? "#e0e0e0" : "#f5f5f5",
    color: isDescriptionToggle ? "#fff" : "#000",
  };

  const skillTags = tags.map((tag, key) => {
      return (
      <div className={editModal.tag} key={key}>
          <p>{tag}</p>
          <button className={editModal.skillDeleteButton}>X</button>
          <button className={editModal.skillEditButton}>Edit</button>
      </div>
      )
  })

  console.log(skillTags);

  return (
    <>
      {createPortal(
        <div className={editModal.editModalContainer}>
          <div className={editModal.filter} onClick={onClose}></div>
          <div className={editModal.modal}>
            <button className={editModal.deleteButton} onClick={onClose}>
              X
            </button>
            <div className="tab-list">
                <button style={DESCRIPTION_STYLE} onClick={() => setIsDescriptionToggle(true)}>
                  Description
                </button>
                <button style={TAGS_STYLE} onClick={() => setIsDescriptionToggle(false)}>
                  Tags
                </button>
              </div>
            {isDescriptionToggle ?
              <>
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
            </>:
            <>
              {skillTags}
            </>
            }
          </div>
        </div>,
        document.getElementById("portal")
      )}
    </>
  );
}
