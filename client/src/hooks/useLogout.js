import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import swal from 'sweetalert';
import { accountServices } from '../services/accountService';

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = useCallback(async () => {
    let logoutURL = `${process.env.REACT_APP_BASE_URL}/logout`;
    try {
      await accountServices.logout(logoutURL);
      dispatch({ type: 'LOGOUT' });
      navigate('/login');
      swal('Success', 'Logged Out', 'success');
      localStorage.removeItem('pendingProduct');
    } catch (error) {
      swal('Error!', 'Logout Error', 'error');
      console.error('Logout Error:', error);
    }
  }, [dispatch, navigate]);

  return logOut;
};