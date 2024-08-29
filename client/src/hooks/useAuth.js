import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuth = () => {
  const isAdmin = useSelector((state) => state.userHandler.isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  return isAdmin;
};