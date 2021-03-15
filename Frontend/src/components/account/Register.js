import React from 'react';
import "../../css/account/Register.scss"
import axios from '../commons/axios';
import {useForm} from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    // handle register 
    try {
      const { username, email, password } = data;
      const res = await axios.post('/register', {
        username,
        email,
        password,
        type: 0
      });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success('Register Success');
      // route back to login page
      props.history.push('/login');
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
    console.log(data);
    console.log(localStorage);
  };

  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Nickname</label>
          <div className="control">
            <input
              className={`input ${errors.nickname && 'is-danger'}`}
              type="text"
              placeholder="Username"
              name="username"
              ref={register({
                required: 'username is required'
              })}
            />
            {errors.nickname && (
              <p className="helper has-text-danger">
                {errors.nickname.message}
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
              placeholder="Email"
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
              placeholder="Password"
              name="password"
              ref={register({
                required: 'password is required',
                minLength: {
                  value: 6,
                  message: 'cannot be less than 6 digits'
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
        <div className="control">
          <button className="button is-fullwidth is-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}


// class Register extends React.Component {
//     render () {
//         return (
//             <div class="container">
//             <div class="register-wrapper">
//                 <Form class="register-form">
//                     <Form.Group className="register-title">
//                             <Form.Label as={Row} className="justify-content-center">Account</Form.Label>
//                             <Form.Label as={Row} className="justify-content-center">Registration</Form.Label>
//                     </Form.Group>

//                     <Form.Group as={Row} controlId="formPlaintextPassword">
//                         <Form.Label column sm="2">Username</Form.Label>
//                         <Col sm="10">
//                             <Form.Control type="username" placeholder="Username" />
//                         </Col>
//                     </Form.Group>

//                     <Form.Group as={Row} controlId="formPlaintextPassword">
//                         <Form.Label column sm="2">Email</Form.Label>
//                         <Col sm="10">
//                             <Form.Control type="email" placeholder="Email" />
//                         </Col>
//                     </Form.Group>

//                     <Form.Group as={Row} controlId="formPlaintextPassword">
//                         <Form.Label column sm="2">Password</Form.Label>
//                         <Col sm="10">
//                             <Form.Control type="password" placeholder="Password" />
//                         </Col>
//                     </Form.Group>

//                     <fieldset>
//                         <Form.Group as={Row} className="justify-content-center">
//                         <Form.Label as="legend" column sm={5}>
//                             Register as:
//                         </Form.Label>
//                         <Col>
//                             <Form.Check
//                             type="radio"
//                             label="Seller"
//                             name="formHorizontalRadios"
//                             id="formHorizontalRadios1"
//                             />
//                             <Form.Check
//                             type="radio"
//                             label="Buyer"
//                             name="formHorizontalRadios"
//                             id="formHorizontalRadios2"
//                             />
//                         </Col>
//                         </Form.Group>
//                     </fieldset>
                    
//                     <Nav className="justify-content-center">
//                         <Nav.Link href="/login"><Button className="button">Register</Button></Nav.Link>
//                     </Nav>

//                     <Form.Group>
//                         <Form.Text className="text-center">Already have an account?</Form.Text>
//                         <Nav className="justify-content-center">
//                             <Nav.Link href="/login">Login</Nav.Link>
//                         </Nav>
//                     </Form.Group>
                
//                 </Form>
//             </div>
// </div>
//         );
//     }
// }

// export default Register;