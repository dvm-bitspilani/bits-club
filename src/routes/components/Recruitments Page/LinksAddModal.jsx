
import { createPortal } from "react-dom";
import {useEffect, useState } from "react";

export default function LinksAddModal({ onClose, handleAddSkill, tags, handleAddSkillTag, handleEditSkillTag, handleDeleteSkillTag }) {

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
            <button className="rec-submit-button" onClick={onClose}>
              Submit
            </button>
          </div>
        </div>,
        document.getElementById("portal")
      )}
    </>
  );
}
