import React, { useEffect, useState } from "react";
import "./Recruitments.css";
import RelevantInfo from "./RelevantInfo.jsx";
import ImgContainer1 from "./ImgContainer1";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skills from "./Skills";

const EditRecPage = () => {

  const { club } = useParams();
  const clubName = club.replace(/-/g, " ");
  const clubNameDashed = club;



  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  // const [clubName, setClubName] = useState('');
  const [clubTags, setClubTags] = useState([]);
  const [clubAcronym, setClubAcronym] = useState('');
  const [recruitmentInfo, setRecruitmentInfo] = useState({ info: [], links: [] });
  const [clubImage, setClubImage] = useState('<some default value here>');
  const [isRecruiting, setIsRecruiting] = useState(true);
  const [recruitmentForm, setRecruitmentForm] = useState('');
  const [editingMode, setEditingMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);



  

  const apiUrl = `https://bits-clubs.onrender.com/api/v1/clubs/${clubNameDashed}/update`; // Replace with your API endpoint for saving changes
  const defaultFieldsApiUrl = `https://bits-clubs.onrender.com/api/v1/clubs/${clubNameDashed}/recruitments`; 

  useEffect(() => {
    // Fetch default fields from the API and update the state
    axios
      .get(defaultFieldsApiUrl)
      .then((response) => {
        const {
        //   club_name,
          club_image,
        //   club_tags,
        //   club_acronym,
          recruitment_info,
          isRecruiting,
          recruitment_form,
        } = response.data;

        // setClubName(club_name);
        setClubImage(club_image);
        // setClubTags(club_tags);
        // setClubAcronym(club_acronym);
        setRecruitmentInfo(recruitment_info);
        setIsRecruiting(isRecruiting);
        setRecruitmentForm(recruitment_form);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching default fields:', error);
        setLoading(false);
      });
  }, []);

  const handleToggleIsRecruiting = () => {
    setIsRecruiting((prevIsRecruiting) => !prevIsRecruiting);
    setEditingMode(false); // Disable editing when toggling isRecruiting
  };

  const handleToggleEditing = () => {
    if (isRecruiting) {
      setEditingMode((prevMode) => !prevMode);
    }
  };

//   const handleSubfieldChange = (field, value) => {
//     switch (field) {
//     //   case 'clubName':
//         // setClubName(value);
//         // break;
//     //   case 'clubAcronym':
//         // setClubAcronym(value);
//         // break;
//       // Handle other fields as needed
//       default:
//         break;
//     }
//   };

  const handleAddSubfield = (field) => {
    switch (field) {
    //   case 'clubTags':
    //     setClubTags((prevTags) => [...prevTags, '']);
    //     break;
      case 'recruitmentInfo':
        setRecruitmentInfo((prevInfo) => ({ ...prevInfo, info: [...prevInfo.info, ''] }));
        break;
      case 'recruitmentLinks':
        setRecruitmentInfo((prevInfo) => ({ ...prevInfo, links: [...prevInfo.links, ''] }));
        break;
      default:
        break;
    }
  };

  const handleRemoveSubfield = (field, index) => {
    switch (field) {
    //   case 'clubTags':
    //     setClubTags((prevTags) => prevTags.filter((_, i) => i !== index));
    //     break;
      case 'recruitmentInfo':
        setRecruitmentInfo((prevInfo) => ({
          ...prevInfo,
          info: prevInfo.info.filter((_, i) => i !== index),
        }));
        break;
      case 'recruitmentLinks':
        setRecruitmentInfo((prevInfo) => ({
          ...prevInfo,
          links: prevInfo.links.filter((_, i) => i !== index),
        }));
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);

      const payload = {
        // club_name: clubName,
        club_image: clubImage,
        // club_tags: clubTags,
        // club_acronym: clubAcronym,
        recruitment_info: recruitmentInfo,
        isRecruiting: isRecruiting,
        recruitment_form: recruitmentForm,
      };

      // Append the selected image file to the payload
      if (selectedImage) {
        payload.selectedImage = selectedImage;
      }

      const response = await axios.put(apiUrl, payload);
      setData(response.data);
    } catch (error) {
      console.error('Error making PUT request:', error);
    } finally {
      setLoading(false);
      setEditingMode(false);
    }
  };

  return (
    <div className="page">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <label>isRecruiting:</label>
            <button onClick={handleToggleIsRecruiting}>
              {isRecruiting ? 'Turn Off' : 'Turn On'}
            </button>
          </div>
          {isRecruiting && (
            <div>
              {/* <div>
                <label>Club Name:</label>
                {editingMode ? (
                  <input
                    type="text"
                    value={clubName}
                    onChange={(e) => handleSubfieldChange('clubName', e.target.value)}
                  />
                ) : (
                  <div>{clubName}</div>
                )}
              </div> */}
              <div>
                <label>Club Image:</label>
                {editingMode ? (
                  <div>
                    <input type="file" onChange={handleImageChange} />
                    <img src={clubImage} alt="Club" />
                  </div>
                ) : (
                  <img src={clubImage} alt="Club" />
                )}
              </div>
              {/* <div>
                <label>Club Tags:</label>
                {editingMode ? (
                  <div>
                    {clubTags.map((tag, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => handleSubfieldChange('clubTags', e.target.value)}
                        />
                        <button onClick={() => handleRemoveSubfield('clubTags', index)}>
                          Remove Tag
                        </button>
                      </div>
                    ))}
                    <button onClick={() => handleAddSubfield('clubTags')}>Add Tag</button>
                  </div>
                ) : (
                  <div>{clubTags.join(', ')}</div>
                )}
              </div> */}
              {/* <div>
                <label>Club Acronym:</label>
                {editingMode ? (
                  <input
                    type="text"
                    value={clubAcronym}
                    onChange={(e) => handleSubfieldChange('clubAcronym', e.target.value)}
                  />
                ) : (
                  <div>{clubAcronym}</div>
                )}
              </div> */}
              <div>
                <label>Recruitment Info:</label>
                {editingMode ? (
                  <div>
                    {recruitmentInfo.info.map((info, index) => (
                      <div key={index}>
                        <textarea
                          rows="4"
                          cols="50"
                          value={info}
                          onChange={(e) =>
                            setRecruitmentInfo((prevInfo) => ({
                              ...prevInfo,
                              info: prevInfo.info.map((item, i) =>
                                i === index ? e.target.value : item
                              ),
                            }))
                          }
                        />
                        <button onClick={() => handleRemoveSubfield('recruitmentInfo', index)}>
                          Remove Info
                        </button>
                      </div>
                    ))}
                    <button onClick={() => handleAddSubfield('recruitmentInfo')}>Add Info</button>
                  </div>
                ) : (
                  <div>
                    {recruitmentInfo.info.map((info, index) => (
                      <div key={index}>{info}</div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label>Recruitment Links:</label>
                {editingMode ? (
                  <div>
                    {recruitmentInfo.links.map((link, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          value={link}
                          onChange={(e) =>
                            setRecruitmentInfo((prevInfo) => ({
                              ...prevInfo,
                              links: prevInfo.links.map((item, i) =>
                                i === index ? e.target.value : item
                              ),
                            }))
                          }
                        />
                        <button onClick={() => handleRemoveSubfield('recruitmentLinks', index)}>
                          Remove Link
                        </button>
                      </div>
                    ))}
                    <button onClick={() => handleAddSubfield('recruitmentLinks')}>Add Link</button>
                  </div>
                ) : (
                  <div>
                    {recruitmentInfo.links.map((link, index) => (
                      <div key={index}>{link}</div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {editingMode ? (
                  <div>
                    <label>Recruitment Form:</label>
                    <input
                      type="text"
                      value={recruitmentForm}
                      onChange={(e) => setRecruitmentForm(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>{recruitmentForm}</div>
                )}
              </div>
              <div>
                {editingMode ? (
                  <div>
                    <button onClick={handleSaveChanges}>Save Changes</button>
                    <button onClick={handleToggleEditing}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={handleToggleEditing}>Enable Editing</button>
                )}
              </div>
            </div>
          )}
          {!isRecruiting && (
            <div>
              <button onClick={handleSaveChanges}>Save Changes</button>
            </div>
          )}
          <Link to={`/${club}/recruitments`}>Go to Recruitments Page</Link>
        </div>
      )}
    </div>
  );
};

export default EditRecPage;
