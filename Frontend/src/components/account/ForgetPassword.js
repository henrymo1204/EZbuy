/********************************************************
 * This is the page of Forget password
 * Send email to confirm then reset the password
 ********************************************************/
import React, { Component} from 'react';
import axios from '../commons/axios';
import { Nav} from 'react-bootstrap';
import { toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import "../../css/account/ForgetPassword.scss";

const ForgetPassword = (props) => {
    const {register, handleSubmit, errors, control} = useForm();
  

    const resetPassword = async (data) => {
        const { email } = data;
        await axios.post(`/api/v1/reset_password/`, {
            'email': email
        })
        .then(() => { 
            toast.success('Reset link sent via email.');
        }).catch(() => {
            toast.error('Failed to send reset link.');
        })
    }

    return (
        <div className="forget-password-container">
      <div className="forget-wrapper">
      <form className="register-box" onSubmit={handleSubmit(resetPassword)}>
        <Nav className="justify-content-center title-container">
              <Nav.Link href="/" className="title">Reset Password</Nav.Link>
        </Nav>
        <div className="field-container">
          <div className="forget-field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className={`input ${errors.email && 'is-danger'}`}
                type="text"
                placeholder="Please enter your email"
                name="email"
                ref={register({
                  required: 'email is required',
                  pattern: {
                    value: /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/,
                    message: 'invalid email'
                  }
                })}
              />
              {errors.email && (
                <p className="helper has-text-danger">{errors.email.message}</p>
              )}
            </div>
          </div> 
        </div>
          <div className="footer-container text-center">
              <button className="forget-button">Submit</button> 
          </div>
     
      </form>
    </div>
  </div>
     
    );
}

export default ForgetPassword;