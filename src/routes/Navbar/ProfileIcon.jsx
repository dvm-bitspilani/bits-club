import { useState } from "react";

export default function ProfileIcon({ userCredentials }) {
  const [profileDetails, setProfileDetails] = useState(false);
  console.log(profileDetails);
  return (
    <div
      className="profile-image"
      onMouseDown={() => setProfileDetails(!profileDetails)}
    >
      <img src={userCredentials.picture} alt="profile" />
      {profileDetails && (
        <div className="profile-details">
          <img src={userCredentials.picture} alt="profile" />
          <div>
            <p>{userCredentials.name}</p>
          </div>
          <p>{userCredentials.email}</p>
        </div>
      )}
    </div>
  );
}
