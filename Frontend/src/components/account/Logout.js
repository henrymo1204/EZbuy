import React from 'react';
import "../../css/account/Logout.scss"


export default function Logout(props) {

    const handleYesBtn = () => {
        global.auth.logout();
        props.history.push('/');
    };

    const handleNoBtn = () => {
        props.history.push('/');
    };

    return (
        <div class="logout-container">
            <div class="logout-wrapper">
                <div className="text-center logout-title">Logout?</div>
                <div className="text-center logout-buttons">
                    <button className="account-button logout-yes" onClick={handleYesBtn}>YES</button>
                    <button className="account-button logout-no" onClick={handleNoBtn}>NO</button>
                </div>
            </div>
        </div>
    );
}