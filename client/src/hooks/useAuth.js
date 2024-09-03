import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuth = () => {
  const stateisAdmin = useSelector((state) => state.userHandler.isAdmin);
  const navigate = useNavigate();
  console.log('state in useAuth', stateisAdmin)

  useEffect(() => {
    if (!stateisAdmin) {
      navigate('/login');
    }
  }, [stateisAdmin, navigate]);
  
  return stateisAdmin;
};