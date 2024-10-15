import React from "react";
import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <div className="profile">
      {/**notification */}
      <i className="bx bxs-bell"></i>
      {/*bell icon */}
      <i className="bx bxs-cog"></i>

      {/*Sign in */}
      <div className="user">
        <div className="left">
          <img src="MusicImages/360_F_362562495_Gau0POzcwR8JCfQuikVUTqzMFTo78vkF.jpg" />
        </div>
        <div className="right">
          <h5>Sign In</h5>
        </div>
      </div>

      {/* upload Audio */}
      <div className="user">
        <div className="left">
          <img src="MusicImages/pngtree-file-upload-icon-image_1344393.jpg" />
        </div>
        <Link to="/upload-book">
          <div className="right">
            <h5>Upload Audio</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
