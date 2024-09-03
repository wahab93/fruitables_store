import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { accountServices } from '../../services/accountService';
import swal from 'sweetalert';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas';
import { addCart } from '../../redux/action';

export const Login = () => {
  const [loading, setLoading] = useState(false)
  const [passwordToggle, setPasswordToggle] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const initialValues = { email: '', password: '' };


  const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        let loginURL = '/login';

        // get local storage value
        const pendingProduct = JSON.parse(localStorage.getItem('pendingProduct'));

        // send requeset
        const payload = await accountServices.login(loginURL, values);

        // check response
        if (payload && payload.user.role == 'admin') {
          // if admin then goes to admin penel
          navigate('/admin/dashboard');
          setLoading(false)
        } else if (payload) {
          if (pendingProduct) {
            dispatch(addCart(pendingProduct))
          }
          // check if local storage have productId then goes to that product otherwise home page
          navigate(pendingProduct ? `/products/${pendingProduct._id}` : '/');
        }
        // reponse send to redux
        dispatch({ type: 'LOGIN', payload });
        swal("Success", "Login Successfull", "success");
        setLoading(false)
      } catch (error) {
        swal("Error!", 'Invalid Login', "error");
        setLoading(false)
      }
    }
  })

  return (
    <div className="container-fluid py-5 mt-5">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className='mb-3'>Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input type="email"
                  className={`form-control ${errors.email && values.email && touched.email ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="name@example.com"
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="floatingInput">Email address</label>
                {errors.email && touched.email ? <span className='text-danger mt-2 d-block'>{errors.email}</span> : null}
              </div>
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
                <label htmlFor="floatingPassword">Password</label>
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
              <div className='d-flex justify-content-between align-items-center mt-3'>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ?
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    :
                    'Login'
                  }
                </button>
                <p className='m-0'>Do'nt have an Account | <Link to='/register'>Register</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
