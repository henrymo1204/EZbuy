import React, {useState} from 'react';
import axios from '../commons/axios';
import {useForm, Controller, Checkbox} from 'react-hook-form';
import { toast } from 'react-toastify';
import {Nav} from 'react-bootstrap';
import "../../css/account/Register.scss";


export default function Login(props) {
  const [isBuyer, setRole] = useState(0);

  const { register, handleSubmit, errors, control} = useForm();

  const onSubmit = async data => {
    if (validateRegister() != true) return;

    // handle register 
    try {
      const { username, email, password } = data;
      const userRole = isBuyer ? 'buyer' : 'seller'
      const res = await axios.post('/register', {
        username,
        email,
        password,
        role : userRole,
        type: 0
      });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success('Register Success. Please login.');
      // route back to login page
      props.history.push('/login');
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  const validateRegister = (e) => {
    var isChecked = document.getElementById('buyer-check').checked || document.getElementById("seller-check").checked;
    if (isChecked) {
      document.getElementById('checkbox-warn').style.visibility = "hidden";
    } else {
      document.getElementById('checkbox-warn').style.visibility = "visible";
    }
    return isChecked;
  };

  const handleBuyerChecked = (userRole) => {
    var isChecked = document.getElementById('buyer-check').checked;
    if (isChecked) {
      setRole(true);
      document.getElementById('checkbox-warn').style.visibility = "hidden";
    } else {
      document.getElementById('checkbox-warn').style.visibility = "visible";
    }
  };

  const handleSellerChecked = (userRole) => {
    var isChecked = document.getElementById("seller-check").checked;
    if (isChecked) {
      setRole(false);
      document.getElementById('checkbox-warn').style.visibility = "hidden";
    } else {
      document.getElementById('checkbox-warn').style.visibility = "visible";
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
      <form className="register-box" onSubmit={handleSubmit(onSubmit)}>
        <Nav className="justify-content-center title-container">
              <Nav.Link href="/" className="title">Create Account</Nav.Link>
        </Nav>
        <div className="field-container">
          <div className="field">
            <label className="label">Username</label>
              <div className="control">
                <input
                  className={`input ${errors.username && 'is-danger'}`}
                  type="text"
                  placeholder="Please create username"
                  name="username"
                  ref={register({
                    required: 'username is required',
                    minLength: {
                      value: 6,
                      message: 'minimum length for username is 6'
                    }
                  })}
                />
                {errors.username && (
                  <p className="helper has-text-danger">
                    {errors.username.message}
                  </p>
                )}
              </div>
          </div>
          <div className="field">
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
      
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
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
        </div>
      
        <div className="footer-container text-center">
          <div class="field is-horizontal checkbox-container">
            <div class="field-label">
              <label class="label checkbox-title">Register as:</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <label class="radio">
                    <input type="radio" name="member" id="buyer-check" onChange={handleBuyerChecked}/> Buyer
                  </label>
                  <label class="radio">
                    <input type="radio" name="member" id="seller-check" onChange={handleSellerChecked}/> Seller
                  </label>
                </div>
              </div>
            </div>
          </div>
          <p class="helper has-text-danger" id="checkbox-warn">Please select one of above</p>
          <button className="account-button">Register</button>   
        </div>
      </form>
    </div>
  </div>
    
  );
}