import { useState } from "react";
import { googleLogout } from "@react-oauth/google";

export default function ProfileIcon({ userCredentials }) {
  const [profileDetails, setProfileDetails] = useState(false);
  // console.log(profileDetails);

  const handleLogOut = () => {
    googleLogout();
    localStorage.removeItem("token");
    window.location.reload();
  };

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
          <p onMouseDown={handleLogOut}>Sign Out</p>
        </div>
      )}
    </div>
  );
}
