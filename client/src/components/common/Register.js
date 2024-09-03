import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { registerSchema } from '../../schemas';
import { accountServices } from '../../services/accountService';

export const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [passwordToggle, setPasswordToggle] = useState(false)
  // const [user, setUser] = useState({ name: '', email: '', role: 'user', phone: '', work: '', password: '', confirmpassword: '' });
  // let name, value;
  // const handleInput = (e) => {
  //   name = e.target.name;
  //   value = e.target.value;
  //   setUser({ ...user, [name]: value })
  // }
  // const postData = async (e) => {
  //   e.preventDefault();
  //   const { name, email, phone, work, password, confirmpassword, role } = user;
  //   const res = await fetch('/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ name, email, phone, work, password, confirmpassword, role })
  //   })
  //   const data = await res.json()
  //   if (res.status === 422 || !data) {
  //     alert('Please Fill')
  //     swal("error", "Register Unsuccessful!", "error");
  //   } else {
  //     swal("Success", "Register Successful!", "success");
  //     navigate('/login')
  //   }
  // }

  const initialValues = {
    name: '',
    email: '',
    role: 'user',
    phone: '',
    work: '',
    password: '',
    confirmpassword: ''
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, action) => {
      setLoading(true)
      try {
        let registerURL = '/register';
        await accountServices.register(registerURL, values)
        setLoading(false)
        swal("Success", "Register Successful!", "success");
        navigate('/login')
      } catch (error) {
        console.log(error.error)
        setLoading(false)
        swal("error", `Register Unsuccessful! ${error.error}`, "error");
      }
      // try {
      //   let registerURL = '/register';
      //   const response = await accountServices.register(registerURL, values)
      //   console.log(response)
      //   setLoading(false)
      //   swal("Success", "Register Successful!", "success");
      //   navigate('/login')
      // } catch (error) {
      //   setLoading(false)
      //   swal("error", "Register Unsuccessful!", "error");
      // }

    }
  })
  return (
    <>
      <div className="container-fluid py-5 mt-5">
        <div className="container py-5 mt-4">
          <div className="row">
            <h1>Register</h1>
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className="mb-2 col-md-6">
                    <div className='form-floating'>
                      <input type="text"
                        className='form-control'
                        name='name'
                        id="floatingName"
                        placeholder='Your Name'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="floatingName" className="form-label m-0">Your Name</label>
                    </div>
                    {errors.name && touched.name ? <span className='text-danger mt-2 d-block'>{errors.name}</span> : null}
                  </div>
                  <div className="mb-2 col-md-6">
                    <div className='form-floating'>
                      <input type="email"
                        id='floatingEmail'
                        className={`form-control ${errors.email && values.email && touched.email ? 'is-invalid' : ''}`}
                        name='email'
                        placeholder='Your Email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="floatingEmail" className="form-label m-0">Email address</label>
                    </div>
                    {errors.email && touched.email ? <span className='text-danger mt-2 d-block'>{errors.email}</span> : null}
                  </div>
                  <div className="mb-2 col-md-6">
                    <div className='form-floating'>
                      <input type="number"
                        className="form-control"
                        id='floatingPhone'
                        name='phone'
                        placeholder='Your Phone'
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="floatingPhone" className="form-label m-0">Enter Phone</label>
                    </div>
                    {errors.phone && touched.phone ? <span className='text-danger mt-2 d-block'>{errors.phone}</span> : null}
                  </div>
                  <div className="mb-2 col-md-6">
                    <div className='form-floating'>
                      <input type="text"
                        id='floatingWork'
                        className="form-control"
                        name='work'
                        placeholder='Your Profession'
                        value={values.work}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="floatingWork" className="form-label m-0">Enter Work</label>
                    </div>
                    {errors.work && touched.work ? <span className='text-danger mt-2 d-block'>{errors.work}</span> : null}
                  </div>
                  <div className="mb-2 col-md-6">
                    <div className="form-floating">
                      <input
                        type={passwordToggle ? 'text' : 'password'}
                        id="floatingPassword"
                        placeholder='Enter Password'
                        className="form-control"
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="floatingPassword">Enter Password</label>
                      {values.password && (
                        <span className="input-group-text position-absolute top-0 end-0 h-100" onClick={() => setPasswordToggle(!passwordToggle)}>
                          {passwordToggle ? (
                            <i className="fa-solid fa-eye-slash"></i>
                          ) : (
                            <i className="fa fa-eye"></i>
                          )}
                        </span>
                      )}
                    </div>
                    {errors.password && touched.password ? <span className='text-danger mt-2 d-block'>{errors.password}</span> : null}
                  </div>
                  <div className="mb-2 col-md-6">
                    <div className='form-floating'>
                      <input type="password"
                      id='floatingConfirmPassword'
                        className="form-control"
                        placeholder='Confirm Password'
                        name='confirmpassword'
                        value={values.confirmpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="floatingConfirmPassword" className="form-label m-0">Confirm Password</label>
                    </div>
                    {errors.confirmpassword && touched.confirmpassword ? <span className='text-danger mt-2 d-block'>{errors.confirmpassword}</span> : null}
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ?
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        :
                        'Register'
                      }
                    </button>
                    <p className='m-0'>Already have an Account | <Link to='/login'>Login</Link></p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
