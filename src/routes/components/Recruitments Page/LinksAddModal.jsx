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
      <div className={editModal.tag} key={key}>
          <p>{tag}</p>
          <button className={editModal.skillDeleteButton} onClick={()=>handleDeleteSkillTag(tag)}>
              <img src="/assets/delete.png" alt="" />
          </button>
          <button className={editModal.skillEditButton} onClick={()=>editSkillTag(tag)}>
              <img src="/assets/edit_icon.png" alt="" />
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
        <div className={editModal.editModalContainer}>
          <div className={editModal.filter} onClick={onClose}></div>
          <div className={editModal.modal}>
            <button className={editModal.deleteButton} onClick={onClose}>
              X
            </button>
            <div className="tab-list">
                {/* <button style={DESCRIPTION_STYLE} onClick={() => setIsDescriptionToggle(true)}>
                  Description
                </button> */}
                <div className="text modal">
                  Relevant Links
                </div>
              </div>
            <button className={editModal.skillAddButton} onClick={()=>addSkill()}> + </button>
            <div className={editModal.skillTagContainer}>
              <div className="text links-modal">
              {skillTags}
              </div>
            </div>
          </div>
        </div>,
        document.getElementById("portal")
      )}
    </>
  );
}
