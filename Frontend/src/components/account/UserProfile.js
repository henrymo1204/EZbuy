import React from 'react';
import Button from 'react-bootstrap/Button';
import { propTypes } from 'react-bootstrap/esm/Image';
import '../../css/account/UserProfile.scss'

export default function UserProfile(props) {
  const logout = () => {
    global.appState.setLocalCartNum(0);
    global.auth.logout();
    props.close('logout');
    window.location.href='/';
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
        <br />
        </div>
        <div className="field">
          <div className="control">
            <label className="label has-text-left">User Type</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user['userRole'] === 'seller' ? 'Seller' : 'Buyer'}
            />
          </div>
        </div>
      </fieldset>

      <br />
      <br />
      {props.user['userRole'] === 'seller' ? 
        <div className="shop-btn-container" ><Button className ="shop-button" href="/sellerinfo">Open Seller Shop</Button></div> : <br />}
        <br />
      <br />
        <div className="shop-btn-container" ><Button className ="shop-button" href="/orderreview">Review Orders</Button></div> : <br />
      <br />
      <br />
      <div className="field is-grouped is-grouped-centered profile-button-container">
        <div className="control profile-button-control">
          <button className="button profile-button" type="button" onClick={logout}>
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