import editModal from "./EventEditModal.module.css";

import { createPortal } from "react-dom";
import { useState } from "react";

export default function SkillTextAddModal({
  onClose,
  skills,
  handleAddSkill,
  handleEditSkill,
  handleDeleteSkill,
  tags,
  handleAddSkillTag,
  handleEditSkillTag,
  handleDeleteSkillTag,
}) {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const skill = e.target[0].value;
  //   handleAddSkill(skill);
  //   onClose();
  // };

  const [isDescriptionToggle, setIsDescriptionToggle] = useState(true);

  const DESCRIPTION_STYLE = {
    fontFamily: "Nollasans",
    borderRadius: "0.5rem",
    background: "#2C2C2C",
    fontSize: "1.1rem",
    border: isDescriptionToggle ? "2px solid #3E7CB1" : "none",
  };

  const TAGS_STYLE = {
    fontFamily: "Nollasans",
    borderRadius: "0.5rem",
    background: "#2C2C2C",
    fontSize: "1.1rem",
    border: isDescriptionToggle ? "none" : "2px solid #3E7CB1",
  };

  const editSkillTag = (skill) => {
    const newSkill = prompt("Enter the new skill");
    handleEditSkillTag(skill, newSkill);
  };

  const skillTags = tags.map((tag, key) => {
    return (
      <div className={editModal.tag} key={key}>
        <p>{tag}</p>
        <button
          className={editModal.skillDeleteButton}
          onClick={() => handleDeleteSkillTag(tag)}
        >
          <img src="/assets/delete.svg" alt="delete" />
        </button>
        <button
          className={editModal.skillEditButton}
          onClick={() => editSkillTag(tag)}
        >
          <img src="/assets/edit.svg" alt="edit" />
        </button>
      </div>
    );
  });

  const skillsList = skills.map((skill, key) => {
    return (
      <div className={editModal.skillTile} key={key}>
        <div className={editModal.skillUperSection}>
          <button
            className={editModal.skillDeleteButton}
            onClick={() => handleDeleteSkill(skill)}
          >
            <img src="/assets/delete.svg" alt="delete" />
          </button>
          <button
            className={editModal.skillEditButton}
            onClick={() => editSkill(key)}
          >
            <img src="/assets/edit.svg" alt="edit" />
          </button>
        </div>
        <textarea
          id={editModal.textarea}
          className={editModal.skillTextarea}
          disabled
          defaultValue={skill}
          maxLength={150}
        />
      </div>
    );
  });

  const addSkillTag = () => {
    const skill = prompt("Enter the Tag");
    handleAddSkillTag(skill);
  };

  const editSkill = (key) => {
    const textareaList = document.querySelectorAll(
      `.${editModal.skillTextarea}`
    );
    const textarea = textareaList[key];
    textarea.disabled = false;
    textarea.focus();
    textarea.addEventListener("blur", () => {
      textarea.disabled = true;
      handleEditSkill(skills[key], textarea.value);
    });
  };

  return (
    <>
      {createPortal(
        <div className={editModal.editModalContainer}>
          <div className={editModal.filter} onClick={onClose}></div>
          <div className={editModal.modal}>
            <button className={editModal.deleteButton} onClick={onClose}>
              <img src="/assets/Close.svg" alt="" />
            </button>
            <h1 className={editModal.title}>Add Skills</h1>
            <div className={editModal.tablist}>
              <button
                style={DESCRIPTION_STYLE}
                onClick={() => setIsDescriptionToggle(true)}
              >
                Description
              </button>
              <button
                style={TAGS_STYLE}
                onClick={() => setIsDescriptionToggle(false)}
              >
                Tags
              </button>
            </div>
            {isDescriptionToggle ? (
              <>
                {/* <form className={editModal.form} onSubmit={handleSubmit}>
                  <label
                    htmlFor={editModal.textarea}
                    className={editModal.label}
                  >
                    Skill Description
                  </label>
                  <textarea
                    placeholder="Enter a small description of the skills involved in the club"
                    id={editModal.textarea}
                    maxLength={150}
                  />
                  <button className={editModal.submitButton} type="submit">
                    Submit
                  </button>
                </form> */}
                <div className={editModal.skillContainer}>{skillsList}</div>
                <button
                  className={editModal.skillAddButton}
                  onClick={() => handleAddSkill("")}
                >
                  {" "}
                  Add New Skill
                </button>
              </>
            ) : (
              <>
                <div className={editModal.skillTagContainer}>{skillTags}</div>
                <button
                  className={editModal.skillAddButton}
                  onClick={() => addSkillTag()}
                >
                  {" "}
                  Add New Tag
                </button>
              </>
            )}
          </div>
        </div>,
        document.getElementById("portal")
      )}
    </>
  );
}
