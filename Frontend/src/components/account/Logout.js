/**********************************************************
 * This is the page of Logout 
 * User or seller can logout 
 ***********************************************************/

import React from 'react';
import "../../css/account/Logout.scss"
import {Row} from 'react-bootstrap'


export default function Logout(props) {

    const handleYesBtn = () => {
        global.auth.logout();
        props.history.push('/');
    };

    const handleNoBtn = () => {
        props.history.goBack();
    };

    return (
        <div className="logout-container">
            <div className="logout-wrapper">
                <div className="text-center logout-title">Logout?</div>
                <div className="text-center logout-buttons">
                    <Row>
                    <button className="account-button logout-yes" onClick={handleYesBtn}>YES</button>
                    <button className="account-button logout-no" onClick={handleNoBtn}>NO</button>
                    </Row>                    
                </div>
            </div>
        </div>
    );
}