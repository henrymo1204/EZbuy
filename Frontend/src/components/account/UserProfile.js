import React from 'react';
import '../../css/account/UserProfile.scss'

export default function UserProfile(props) {
  const logout = () => {
    global.auth.logout();
    props.close('logout');
  };

  return (
    <div className="user-profile">
      <p className="title has-text-centered">Account</p>
      <fieldset disabled>
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Username</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.username}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label has-text-left">User Type</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.type === 1 ? 'Seller' : 'Buyer'}
            />
          </div>
        </div>
      </fieldset>

      <br />
      <br />
      <div className="field is-grouped is-grouped-centered profile-button-container">
        <div className="control profile-button-control">
          <button className="button is-danger profile-button" type="button" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="control profile-button-control">
          <button
            className="button profile-button"
            type="button"
            onClick={() => {
              props.close();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}