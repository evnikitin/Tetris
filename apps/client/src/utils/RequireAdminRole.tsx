import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

enum Roles{
  admin= "ADMIN",
  user= "USER"
  
}

export function RequireAdminRole() {
  const token :string = Roles.admin // будет полчение роли админа

  return (
    token === "ADMIN" 
      ? <Outlet />
      : <Navigate to="/" />
  );
}