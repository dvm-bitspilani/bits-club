import editModal from "../Club Page/components/Modal/EventEditModal.module.css";

import { createPortal } from "react-dom";
import { useState } from "react";

export default function LinksAddModal({ onClose, handleAddSkill, tags, handleAddSkillTag, handleEditSkillTag, handleDeleteSkillTag }) {

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const skill = e.target[0].value;
  //   handleAddSkill(skill);
  //   onClose();
  // };

  // const [isDescriptionToggle, setIsDescriptionToggle] = useState(true);

  // const DESCRIPTION_STYLE = {
  //   background: isDescriptionToggle ? "#f5f5f5" : "#e0e0e0",
  //   color: isDescriptionToggle ? "#000" : "#fff",
  // };

  const TAGS_STYLE = {
    // background: "#f5f5f5",
    color: "#000",
  };

  const editSkillTag = (skill) => {
    const newSkill = prompt("Enter the link");
    handleEditSkillTag(skill, newSkill);
  }

  const skillTags = tags.map((tag, key) => {
    return (
      <div className="rec-tag" key={key}>
        <p className="links-box">{tag}</p>
        <button className="links-delete-button" onClick={() => handleDeleteSkillTag(tag)}>
        <img src="/assets/delete.svg" alt="delete" />
        </button>
        <button className="links-edit-button" onClick={() => editSkillTag(tag)}>
        <img src="/assets/edit.svg" alt="edit" />
        </button>
      </div>
    )
  })

  const addSkill = () => {
    const skill = prompt("Enter the link");
    handleAddSkillTag(skill);
  }

  return (
    <>
      {createPortal(
        <div className="rec-edit-modal-container">
          <div className="rec-filter" onClick={onClose}></div>
          <div className="rec-modal">
            <div className="rec-heading-container">
            <div className="rec-modal-heading">
              Add Relevant Links
            </div>
            <button className="rec-delete-button" onClick={onClose}>
              ✖
            </button>
            </div>
            
            <div className="links-container">
              <div className="links-modal">
                {skillTags}
              </div>
            </div>
            <div className="rec-addlink-container">
            <button className="rec-add-button" onClick={() => addSkill()}>Add New Link</button>
            </div>
          </div>
        </div>,
        document.getElementById("portal")
      )}
    </>
  );
}
