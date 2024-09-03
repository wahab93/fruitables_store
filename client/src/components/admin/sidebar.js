import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';

export const Sidebar = () => {
  const logOut = useLogout();

  return (
    <div className="sidebar-content js-simplebar">
      <Link to="/admin/dashboard"><h1 className='ps-3 mb-3 text-dark'>Fruitables</h1></Link>
      <ul className="list-group">
        <li className="list-group-item">
          <NavLink to="/admin/dashboard"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <i className='fa fa-home'></i><span>Home</span>
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/admin/addproduct"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <i className='fa fa-add'></i><span>Add Products</span>
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/admin/orderlisting"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <i className='fa fa-chart-simple'></i><span>Orders List</span>
          </NavLink>
        </li>
        <li className="list-group-item">
          <a href="#" onClick={logOut}>
            <i className='fa fa-sign-out'></i><span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};