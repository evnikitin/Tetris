import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { selectCurrentUser } from '../store/slices/AuthSlice';
import { useSelector } from 'react-redux';


export function RequireAdminRole() {
  const user = useSelector(selectCurrentUser);
  const role = user?.role;

  return (
    role === "ADMIN" 
      ? <Outlet />
      : <Navigate to="/" />
  );
}