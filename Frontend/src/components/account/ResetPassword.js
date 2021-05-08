// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//

import axios from '../commons/axios';
import { Nav} from 'react-bootstrap';
import { toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import "../../css/account/ResetPassword.scss";

const ForgetPassword = (props) => {
    const {register, handleSubmit, errors, control} = useForm();
  
    const resetPassword = (data) => {
        const { email, password, confirm_password } = data;
        const index = window.location.href.lastIndexOf('/') + 1;

        const token = window.location.href.substring(index);
        if (password !== confirm_password) {
            toast.error('Both password does not match');
        }
        else {
            axios.patch(`/api/v1/reset_password/${token}`, {
                'email': email,
                'password': password
            })
            .then(() => { 
                props.history.push('/login');
                toast.success('Successfully reset password.');
            }).catch(() => {
                toast.error('Reset password failed.');
            })
        }
    }

    return (
        <div className="reset-password-container">
      <div className="reset-password-wrapper">
      <form className="reset-password-box" onSubmit={handleSubmit(resetPassword)}>
        <Nav className="justify-content-center reset-password-title-container">
              <Nav.Link href="/" className="reset-password-title">Reset Password</Nav.Link>
        </Nav>
        <div className="reset-password-field-container">
          <div className="reset-password-field">
            <label className="reset-password-label">Email</label>
            <div className="reset-password-control">
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

          <div className="reset-password-field">
            <label className="reset-password-label">Password</label>
            <div className="reset-password-control">
              <input
                className={`input ${errors.password && 'is-danger'}`}
                type="password"
                placeholder="Please enter the password"
                name="password"
                ref={register({
                  required: 'password is required',
                  minLength: {
                    value: 6,
                    message: 'minimum length for password is 6'
                  }
                })}
              />
              {errors.password && (
                <p className="helper has-text-danger">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="reset-password-field">
            <label className="reset-password-label">Confirm Password</label>
            <div className="reset-password-control">
              <input
                className={`input ${errors.password && 'is-danger'}`}
                type="password"
                placeholder="Please enter the password"
                name="confirm_password"
                ref={register({
                  required: 'password is required',
                  minLength: {
                    value: 6,
                    message: 'minimum length for password is 6'
                  }
                })}
              />
              {errors.confirm_password && (
                <p className="helper has-text-danger">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
          </div>
          
        </div>
        
          <div className="reset-password-footer-container">
              <button className="reset-password-button">Submit</button> 
          </div>
     
      </form>
    </div>
  </div>
     
    );
}

export default ForgetPassword;